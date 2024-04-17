const express = require("express");
const Pool = require("./Database");
const fs = require("fs");
const path = require("path");

const ImagesRouter = express.Router();

ImagesRouter.get("/", async (req, res, next) => {
    let conn;
    try {
        conn = await Pool.getConnection();
        const rows = await conn.query("SELECT images.*, users.name AS artist FROM `images` JOIN users ON images.artistId = users.id ORDER BY likes, upload_date, name;");
        res.json(rows);
    } catch (err) {
        console.error(err);
        next(err);
    } finally {
        if (conn) return conn.end();
    }
});

ImagesRouter.get("/id/:id", async (req, res, next) => {
    let conn;
    try {
        conn = await Pool.getConnection();
        const rows = await conn.query("SELECT images.*, users.name AS artist FROM `images` JOIN users ON images.artistId = users.id WHERE images.id = ?", [req.params.id]);
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        next(err);
    } finally {
        if (conn) return conn.end();
    }
});

ImagesRouter.get("/search", async (req, res, next) => {
    const { q } = req.query;
    
    if (!q || q.length < 3) {
        res.sendStatus(404);
        return;
    }

    let conn;
    try {
        conn = await Pool.getConnection();
        const rows = await conn.query("SELECT images.*, users.name AS artist FROM `images` JOIN users ON images.artistId = users.id WHERE users.name LIKE ? OR images.id LIKE ? OR images.name LIKE ? OR images.description LIKE ? OR images.url LIKE ?", [`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`,]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        next(err);
    } finally {
        if (conn) return conn.end();
    }
});

ImagesRouter.get("/by/:artist", async (req, res, next) => {
    let conn;
    try {
        conn = await Pool.getConnection();
        const rows = await conn.query("SELECT images.*, users.name AS artist FROM `images` JOIN users ON images.artistId = users.id WHERE users.name = ?", [req.params.artist]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        next(err);
    } finally {
        if (conn) return conn.end();
    }
});

ImagesRouter.delete("/:id", async (req, res, next) => {
    let conn;
    try {
        conn = await Pool.getConnection();
        const rows = await conn.query("DELETE FROM images WHERE id = ? AND artistId = ? RETURNING name, url", [req.params.id, req.query.artistId]);
        
        if (rows.length < 1) {
            res.sendStatus(404);
            return;
        }
        const urlToName = ({url}) => {
            const urlArr = url.split("/");
            return urlArr[urlArr.length - 1];
        }
        const deleteFileName = urlToName(rows[0]);
        let deleteErr = null; 
        fs.unlink(path.join("./images/", deleteFileName), (err) => deleteErr = err);

        if (deleteErr) next(deleteErr);
        else res.sendStatus(204)
    } catch (err) {
        console.error(err);
        next(err);
    } finally {
        if (conn) return conn.end();
    }
});

ImagesRouter.patch("/:id", async (req, res, next) => {
    const {name, description, id} = req.body;

    let conn;
    try {
        conn = await Pool.getConnection();
        await conn.query("UPDATE images SET name = ?, description = ? WHERE (id = ?);", [name, description, id]);
        const rows = await conn.query("SELECT * FROM images WHERE (id = ?);", [id]);
        res.send(rows[0])
    } catch (err) {
        console.error(err);
        next(err);
    } finally {
        if (conn) return conn.end();
    }
});


module.exports = ImagesRouter;