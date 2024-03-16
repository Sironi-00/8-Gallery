const express = require("express");

const AuthorsRouter = express.Router();

AuthorsRouter.get("/", (req, res, next) => {
    res.json([
        {
            id: "a1",
            name: "user-1",
            likes: 100,
            uploads: 12
        }, {
            id: "a2",
            name: "user-2",
            likes: 100,
            uploads: 12
        }, {
            id: "a3",
            name: "user-3",
            likes: 100,
            uploads: 12
        }, {
            id: "a4",
            name: "user-4",
            likes: 100,
            uploads: 12
        }, {
            id: "a5",
            name: "user-5",
            likes: 100,
            uploads: 12
        }, 
    ])
});

module.exports = AuthorsRouter