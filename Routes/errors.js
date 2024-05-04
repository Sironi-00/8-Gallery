const express = require("express");

const ErrorRouter = express.Router();

ErrorRouter.use((err, req, res, next) => {
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

module.exports = ErrorRouter;