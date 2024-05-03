const express = require("express");
const Pool = require("./Database");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const ImagesRouter = express.Router();

ImagesRouter.get("/", async (req, res, next) => {
    let conn;
    try {
        conn = await Pool.getConnection();
        const rows = await conn.query("SELECT images.*, users.name AS artist FROM `images` JOIN users ON images.artistId = users.id ORDER BY upload_date DESC, views DESC, likes DESC;");
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
    const { id } = req.params
    const { artistId } = req.query
    
    let conn;
    try {
        conn = await Pool.getConnection();
        const rows = await conn.query("DELETE FROM images WHERE id = ? AND artistId = ? RETURNING name, url", [id, artistId]);

        // Delete from server using FS
        const urlToName = ({url}) => {
            const urlArr = url.split("/");
            return urlArr[urlArr.length - 1];
        }
        const deleteFileName = urlToName(rows[0]);
        let deleteErr = null; 
        fs.unlink(path.join("./images/", deleteFileName), (err) => deleteErr = err);

        if (deleteErr) {
            next(deleteErr);
        } else res.sendStatus(204)
    } catch (err) {
        console.error(err);
        next(err);
    } finally {
        if (conn) return conn.end();
    }
});

ImagesRouter.patch("/views/:id", async (req, res, next) => {
    const { id } = req.params;

    let conn;
    try {
        conn = await Pool.getConnection();
        await conn.query("UPDATE images SET views = views + 1 WHERE id = ?", [id]);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        next(err);
    } finally {
        if (conn) return conn.end();
    }
});

ImagesRouter.patch("/vote/:id", async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.query;

    let conn;
    try {
        conn = await Pool.getConnection();
        const dbLikes = await conn.query("SELECT imageId, userId FROM likedimages WHERE imageId = ? AND userId = ?", [id, userId]);
        
        let action;
        if (dbLikes.length > 0) {
            await conn.query("UPDATE images SET likes = likes - 1 WHERE (id = ?)", [id]);
            await conn.query("DELETE FROM likedimages WHERE imageId = ? AND userId = ?", [id, userId]);
            action = "removed";
        } else {
            await conn.query("UPDATE images SET likes = likes + 1 WHERE (id = ?)", [id]);
            await conn.query("INSERT into likedimages (imageId, userId) VALUES (?, ?)", [id, userId]);
            action = "added";
        }
        const rows = await conn.query("SELECT id, likes FROM images WHERE id = ?", [id])
        res.json({...rows[0], action});
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
        res.json(rows[0])
    } catch (err) {
        console.error(err);
        next(err);
    } finally {
        if (conn) return conn.end();
    }
});

ImagesRouter.post("/", async (req, res, next) => {
    const id = uuidv4();
    const { artistId, name, description, url } = req.body;

    let conn;
    try {
        conn = await Pool.getConnection();
        const curDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const rows = await conn.query("INSERT INTO images (id, artistId, name, description, url, upload_date) VALUES (?, ?, ?, ?, ?, ?) RETURNING id", [id, artistId, name, description, url, curDateTime]);
        res.send(rows[0]);
    } catch (err) {
        console.error(err);
        next(err);
    } finally {
        if (conn) return conn.end();
    }
})

module.exports = ImagesRouter;