const express = require("express");
const Pool = require("./Database");
const { v4: uuidv4 } = require('uuid');

const uploadRouter = express.Router();

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")   
    }, filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const upload = multer({storage: storage});

uploadRouter.post("/", upload.single("file"), async (req, res, next) => {
    const file = req.file;

    if (!file) {
        res.status(400).send({message: "invalid file"})
        return;
    }
    
    const payload = {
        id: uuidv4(),
        artistId: req.body.author,
        name: req.body.name,
        description: req.body.description,
        url: "http://localhost:3000/images/" + file.originalname
    }
    
    let conn;
    try {
        conn = await Pool.getConnection();
        const rows = await conn.query("INSERT INTO images (id, artistId, name, description, url) VALUES (?, ?, ?, ?, ?) RETURNING id", [payload.id, payload.artistId, payload.name, payload.description, payload.url]);
        res.send(rows[0]);
    } catch (err) {
        console.error(err);
        res.send(err)
    } finally {
        if (conn) return conn.end();
    }
});

module.exports = uploadRouter;