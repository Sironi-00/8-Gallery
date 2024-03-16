const express = require("express");

const app = express();

PORT = 3000;

const AuthorsRouter = require("./authors");
app.use("/api/authors", AuthorsRouter);

const ImagesRouter = require("./images");
app.use("/api", ImagesRouter);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));