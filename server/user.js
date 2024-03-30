const express = require("express");
const Pool = require("./Database");
const { v4: uuidv4 } = require('uuid');

const UserRouter = express.Router();

UserRouter.get("/", async (req, res, next) => {
    let conn;
    try {
        conn = await Pool.getConnection();
        const rows = await conn.query("SELECT users.id AS id, users.name AS name, cast(COUNT(images.name) as int) AS uploads FROM users JOIN images ON users.id = images.artistId GROUP By images.artistId");
        
        res.send(rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    } finally {
        if (conn) return conn.end();
    }
});

UserRouter.post("/login", async (req, res, next) => {
    let conn;
    const { name: username, password } = req.body;
    try {
        conn = await Pool.getConnection();
        const rows = await conn.query("SELECT id, name, password, email FROM users WHERE name = ?", [username]);
        
        const activeUser = {
            id: rows[0].id,
            name: rows[0].name,
            email: rows[0].email

        }
        if (rows[0].password === password) {
            res.json(activeUser);
        } else {
            res.sendStatus(404);
        }
        
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    } finally {
        if (conn) return conn.end();
    }
});

UserRouter.post("/register", async (req, res, next) => {
    let conn;
    const { name, password, email, } = req.body;
    try {
        conn = await Pool.getConnection();
        const rows = await conn.query("INSERT INTO users (id, name, password, email) VALUES (?, ?, ?, ?) RETURNING  id, name, email", [uuidv4(), name, password, email]);
        
        const activeUser = {
            id: rows[0].id,
            name: rows[0].name,
            email: rows[0].email

        }
        if (rows[0].password === password) {
            res.json(activeUser);
        } else {
            res.sendStatus(404);
        }
        
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    } finally {
        if (conn) return conn.end();
    }
});


module.exports = UserRouter;
