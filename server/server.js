const express = require("express");

const app = express();

PORT = 3000;

app.get("/", (req, res, next) => {
    res.send([{
        id: "13qgA",
        name: "Test image",
        url: "https://images3.alphacoders.com/133/1337500.png",
        author: "user",
        description: "[PH]image description",
    }, {
        id: "14dxE",
        name: "Test image 2",
        url: "https://images7.alphacoders.com/133/1330715.png",
        author: "user",
        description: "[PH]image description",
    }, {
        id: "15dxE",
        name: "Test image 3",
        url: "https://mfiles.alphacoders.com/979/979445.jpg",
        author: "user",
        description: "[PH]image description",
    }, {
        id: "15dxE",
        name: "Test image 4",
        url: "https://mfiles.alphacoders.com/763/763794.png",
        author: "user",
        description: "[PH]image description",
    },{
        id: "13qgA",
        name: "Test image 5",
        url: "https://images3.alphacoders.com/133/1337500.png",
        author: "user",
        description: "[PH]image description",
    }, {
        id: "14dxE",
        name: "Test image 6",
        url: "https://images7.alphacoders.com/133/1330715.png",
        author: "user",
        description: "[PH]image description",
    }, {
        id: "15dxE",
        name: "Test image 7",
        url: "https://mfiles.alphacoders.com/979/979445.jpg",
        author: "user",
        description: "[PH]image description",
    }, {
        id: "15dxE",
        name: "Test image 8",
        url: "https://mfiles.alphacoders.com/763/763794.png",
        author: "user",
        description: "[PH]image description",
    }])
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));