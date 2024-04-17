const express = require("express");
const Pool = require("./Database");
const { v4: uuidv4 } = require('uuid');

const UserRouter = express.Router();

UserRouter.get("/", async (req, res, next) => {
    let conn;
    try {
        conn = await Pool.getConnection();
        const rows = await conn.query("SELECT users.id AS id, users.name AS name, COUNT(images.name) AS uploads FROM users JOIN images ON users.id = images.artistId GROUP By images.artistId HAVING COUNT(images.id) > 0;");
        
        res.send(rows);
    } catch (err) {
        console.error(err);
        next(err);
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
        
        if (rows.length < 1) {
            res.sendStatus(401);
            return;
        }
        const activeUser = {
            id: rows[0].id,
            name: rows[0].name,
            email: rows[0].email

        }
        if (rows[0].password === password) {
            res.json(activeUser);
        } else {
            res.sendStatus(401);
        }
        
    } catch (err) {
        console.error(err);
        next(err);
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
        res.json(activeUser);
        
    } catch (err) {
        console.error(err);
        next(err);
    } finally {
        if (conn) return conn.end();
    }
});

UserRouter.post("/email", async (req, res, next) => {
    const { name, artistId, email, message } = req.body;
    res.send({
        "from": name,
        "to": artistId,
        email,
        message
    })
});

UserRouter.get("/name", async (req, res, next) => {
    let conn;
    try {
        conn = await Pool.getConnection();
        const rows = await conn.query("SELECT id, name FROM users WHERE id = ?", [req.query.id]);
        
        res.send(rows[0]);
    } catch (err) {
        console.error(err);
        next(err);
    } finally {
        if (conn) return conn.end();
    }
});


module.exports = UserRouter;
