const fs = require("fs");
const path = require("path");
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
app.use("/api/images", ImagesRouter);

app.use((err, req, res, next) => {
    // Error handle
    /* Write Errors to ./Logs/ErrorLogs.txt with time */
    const curTime = new Date();
    let txtErr = `${curTime.toUTCString()}`
    txtErr += "\n"+ JSON.stringify(err) + "\n\n";
    
    // File name + daily date
    const errorFilePath = path.join("./Logs/", `ErrorLogs (${curTime.toDateString()}).log`)
    fs.appendFile(errorFilePath, txtErr, (err) => err && console.error(err));

    res.sendStatus(400);
});

// get images
app.use("/images", express.static("images"));

PORT = 3000;
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));