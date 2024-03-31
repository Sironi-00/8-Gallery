const express = require("express");
const Pool = require("./Database");

const ImagesRouter = express.Router();

ImagesRouter.get("/", async (req, res, next) => {
    let conn;
    try {
        conn = await Pool.getConnection();
        const rows = await conn.query("SELECT images.*, users.name AS artist FROM `images` JOIN users ON images.artistId = users.id;");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
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
        res.sendStatus(400);
    } finally {
        if (conn) return conn.end();
    }
});

ImagesRouter.get("/:artist", async (req, res, next) => {
    let conn;
    try {
        conn = await Pool.getConnection();
        const rows = await conn.query("SELECT images.*, users.name AS artist FROM `images` JOIN users ON images.artistId = users.id WHERE users.name = ?", [req.params.artist]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    } finally {
        if (conn) return conn.end();
    }
});

ImagesRouter.delete("/:id", async (req, res, next) => {
    let conn;
    try {
        conn = await Pool.getConnection();
        const rows = await conn.query("DELETE FROM images WHERE id = ? AND artistId = ? returning name", [req.params.id, req.query.artistId]);
        res.sendStatus(204)
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    } finally {
        if (conn) return conn.end();
    }
});



module.exports = ImagesRouter;