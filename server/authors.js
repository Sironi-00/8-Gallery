const express = require("express");
const Pool = require("./Database");

const AuthorsRouter = express.Router();

AuthorsRouter.get("/", async (req, res, next) => {
    let conn;
    try {
        conn = await Pool.getConnection();
        const rows = await conn.query("SELECT * FROM users");
        res.json(rows);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
});

module.exports = AuthorsRouter;
