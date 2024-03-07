const express = require("express");

const app = express();

PORT = 3000;

app.get("/", (req, res, next) => {
    res.send([{
        id: "13qgA",
        name: "Test image",
        url: "lorem",
        author: "user",
        description: "[PH]image description",
    }, {
        id: "14dxE",
        name: "Test image 2",
        url: "lorem2",
        author: "user",
        description: "[PH]image description",
    }])
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));