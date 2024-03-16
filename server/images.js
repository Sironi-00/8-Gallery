const express = require("express");

const ImagesRouter = express.Router();

const imageArr = [
    {
        id: "13qgA",
        name: "Test image",
        url: "https://images3.alphacoders.com/133/1337500.png",
        author: "user-1",
        description: "[PH]image description",
    },
    {
        id: "14dxE",
        name: "Test image 2",
        url: "https://images7.alphacoders.com/133/1330715.png",
        author: "user-2",
        description: "[PH]image description",
    },
    {
        id: "15dxE",
        name: "Test image 3",
        url: "https://mfiles.alphacoders.com/979/979445.jpg",
        author: "user-3",
        description: "[PH]image description",
    },
    {
        id: "16dxE",
        name: "Test image 4",
        url: "https://mfiles.alphacoders.com/763/763794.png",
        author: "user-4",
        description: "[PH]image description",
    },
    {
        id: "17qgA",
        name: "Test image 5",
        url: "https://images3.alphacoders.com/134/1345266.png",
        author: "user-1",
        description: "[PH]image description",
    },
    {
        id: "18dxE",
        name: "Test image 6",
        url: "https://images2.alphacoders.com/521/521718.jpg",
        author: "user-2",
        description: "[PH]image description",
    },
    {
        id: "19dxE",
        name: "Test image 7",
        url: "https://images8.alphacoders.com/133/1330260.png",
        author: "user-3",
        description: "[PH]image description",
    },
    {
        id: "11dxC",
        name: "Test image 8",
        url: "https://images7.alphacoders.com/131/1312115.jpg",
        author: "user-4",
        description: "[PH]image description",
    },
    {
        id: "12qgC",
        name: "Test image 9",
        url: "https://images3.alphacoders.com/133/1337500.png",
        author: "user-1",
        description: "[PH]image description",
    },
    {
        id: "13dxC",
        name: "Test image 10",
        url: "https://images7.alphacoders.com/133/1330715.png",
        author: "user-2",
        description: "[PH]image description",
    },
    {
        id: "14dxC",
        name: "Test image 11",
        url: "https://mfiles.alphacoders.com/979/979445.jpg",
        author: "user-3",
        description: "[PH]image description",
    },
    {
        id: "15dxC",
        name: "Test image 12",
        url: "https://mfiles.alphacoders.com/763/763794.png",
        author: "user-4",
        description: "[PH]image description",
    },
    {
        id: "16qgC",
        name: "Test image 13",
        url: "https://images3.alphacoders.com/134/1345266.png",
        author: "user-1",
        description: "[PH]image description",
    },
    {
        id: "17dxE",
        name: "Test image 14",
        url: "https://images2.alphacoders.com/521/521718.jpg",
        author: "user-2",
        description: "[PH]image description",
    },
    {
        id: "18dxC",
        name: "Test image 15",
        url: "https://images8.alphacoders.com/133/1330260.png",
        author: "user-3",
        description: "[PH]image description",
    },
    {
        id: "19dxC",
        name: "Test image 16",
        url: "https://images7.alphacoders.com/131/1312115.jpg",
        author: "user-4",
        description: "[PH]image description",
    },
]

ImagesRouter.get("/", (req, res, next) => {
    res.send(imageArr);
});

ImagesRouter.get("/:author", (req, res, next) => {
    res.json(imageArr.filter(item => item.author === req.params.author))
});


module.exports = ImagesRouter;