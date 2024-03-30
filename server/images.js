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

ImagesRouter.get("/:author", async (req, res, next) => {
    let conn;
    try {
        conn = await Pool.getConnection();
        const rows = await conn.query("SELECT images.*, users.name AS artist FROM `images` JOIN users ON images.artistId = users.id WHERE users.name = ?", [req.params.author]);
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
        const rows = await conn.query("DELETE FROM images WHERE id = ? returning name", [req.params.id]);
        res.sendStatus(204)
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    } finally {
        if (conn) return conn.end();
    }
});



module.exports = ImagesRouter;