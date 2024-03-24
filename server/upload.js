const express = require("express");
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

uploadRouter.post("/", upload.single("file"), (req, res, next) => {
    const {name, author, description} = req.body;
    const file = req.file;

    const imageObject = {
        id: `${name}+${file.filename}`,
        name,
        author,
        description,
        url: "http://localhost:3000/images/" + file.originalname
    }
    console.log(imageObject)
    
    require("./Database").push(imageObject);
    
    res.send({
        status: "Success",
        data: imageObject
    })
});

module.exports = uploadRouter;