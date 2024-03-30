require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const UserRouter = require("./user");
app.use("/api/user", UserRouter);

const uploadRouter = require("./upload");
app.use("/api/upload", uploadRouter)

const ImagesRouter = require("./images");
app.use("/api", ImagesRouter);

// get images
app.use("/images", express.static("images"));

PORT = 3000;
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));