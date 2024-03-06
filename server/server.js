const express = require("express");

const app = express();

PORT = 3000;

app.get("/", (req, res, next) => {
    res.send({"Response": "Success"})
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));