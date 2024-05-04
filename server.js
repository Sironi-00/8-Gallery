const fs = require("fs");
const path = require("path");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const app = express();

// app.use(cors({origin: `*`}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const UserRouter = require("./Routes/user");
app.use("/api/user", UserRouter);

const ImagesRouter = require("./Routes/images");
app.use("/api/images", ImagesRouter);

// get images
app.use("/images", express.static("images"));

app.use(express.static('public'));

app.use("/*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

// Error 
const ErrorRouter = require("./Routes/errors");
app.use(ErrorRouter);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));