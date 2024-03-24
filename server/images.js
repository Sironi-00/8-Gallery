const express = require("express");
const ImagesRouter = express.Router();

ImagesRouter.get("/", (req, res, next) => {
    const data = require("./Database");
    res.send(data);
});

ImagesRouter.get("/:author", (req, res, next) => {
    const data = require("./Database");
    res.json(data.filter(item => item.author === req.params.author))
});


module.exports = ImagesRouter;