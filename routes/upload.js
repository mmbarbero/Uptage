var express = require("express"),
    router = express.Router(),
    multer = require("multer"),
    crypto = require("crypto"),
    minio = require("minio"),
    video = require("../models/video"),
    path = require("path"),
    fs = require("fs");

var directory = "/videos"

var accKey = process.env.ACCKEY,
    secKey = process.env.SECKEY;

var minioClient = new minio.Client({
        endPoint: "192.168.5.100",
        port: 9000,
        secure: false,
        accessKey: accKey,
        secretKey: secKey
});

function deleteFs() {
    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
            });
        }
    });
}

var storage = multer.diskStorage({
    destination: directory,
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
})

var upload = multer({ storage: storage, fileFilter: function(req, file, callback){

    var ext = path.extname(file.originalname);
        if(ext !== ".mp4" && ext !== ".avi" && ext !== ".mpeg"){
            return callback(new Error("Only videos are allowed!"))
            
    }
        callback(null, true)
}
})


router.get("/upload", isLoggedIn, function(req, res){

    res.render("upload");

})

router.post("/upload",isLoggedIn, upload.single("videoUpload"), function(req, res){
    var date = new Date();
    var videoData = {
        title: req.body.videoTitle,
        description: req.body.videoDescription,
        tags: req.body.videoTags,
        category: req.body.videoCategory,
        author: req.user.username,
        uploadDate: date.toISOString(),
        date: req.body.videoDate,
        location: {
            type: "Point",
            coordinates: [req.body.videoYCoord, req.body.videoXCoord]
        },
        path: "http://192.168.5.100:9000/uptage/" + req.file.filename
    }
    video.create(videoData, function (err, video) {
        if (err) {
            console.log(err)
            req.flash("error", "Make sure you filled every field");
            res.redirect("/upload");
        } else {
            minioClient.fPutObject("uptage", req.file.filename, req.file.path, "application/octet-stream", function (error, etag) {
                if (error) {
                    return console.log(error);
                }

            })
            req.flash("success", "Video uploaded with success");
            res.redirect("/");
            console.log(video);
            console.log("Uploaded!");

        }
    })

    }
)


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        
        return next();
    } 
req.flash("error", "Please log in first") 
res.redirect("/")
}


module.exports = router;
