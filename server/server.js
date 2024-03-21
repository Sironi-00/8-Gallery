const express = require("express");

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const AuthorsRouter = require("./authors");
app.use("/api/authors", AuthorsRouter);

const ImagesRouter = require("./images");
app.use("/api", ImagesRouter);

const multer  = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploaded")   
    }, filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})

app.use("/test", upload.single("file"), (req, res, next) => {
    const {name, author, description} = req.body;
    const file = req.file;

    const imageObject = {
        name,
        author,
        description,
        file
    }
    console.log(imageObject)
    
    res.send({
        status: "Success",
        name
    })
})

PORT = 3000;
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));