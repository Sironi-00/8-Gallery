require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const AuthorsRouter = require("./authors");
app.use("/api/authors", AuthorsRouter);

const uploadRouter = require("./upload");
app.use("/api/upload", uploadRouter)

const ImagesRouter = require("./images");
app.use("/api", ImagesRouter);

// get images
app.use("/images", express.static("images"));

PORT = 3000;
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));