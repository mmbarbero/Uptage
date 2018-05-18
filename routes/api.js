var express = require("express"),
    router = express.Router(),
    multer = require("multer"),
    crypto = require("crypto"),
    minio = require("minio"),
    video = require("../models/video"),
    path = require("path"),
    fs = require("fs") ,
    user = require("../models/user"),
    passport = require("passport");

    var directory = "/app/public/videos/"

    var minioClient = new minio.Client({
        endPoint: "mbarhomelab.ddns.net",
        port: 9000,
        secure: false,
    accessKey: "minio",
    secretKey: "password123"
});

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




router.post("/api/file-upload",upload.single("videoUpload"), function(req, res){
    var date = new Date();
     var videoData = {
         title: req.body.videoTitle,
        description: req.body.videoDescription,
        tags: req.body.videoTags,
        category: req.body.videoCategory,
        author: req.body.username,
         uploadDate: date.toISOString(),
         date: req.body.videoDate,
        location: {
            type: "Point",
             coordinates: [req.body.videoYCoord, req.body.videoXCoord]
         },
         path: "http://mbarhomelab.ddns.net:9000/uptage/" + req.file.filename
     } 
     video.create(videoData, function (err, video) {
            if (err) {
            console.log(err)
             
         } else {
            minioClient.fPutObject("uptage", req.file.filename, req.file.path, "application/octet-stream", function (error, etag) {
                if (error) {
                    return console.log(error);
                }console.log("Upload successful")

            })

             console.log(video);
             console.log("Uploaded!");

        }
     })

 }
)






router.get("api/videos/all/", function (req, res) {

    video.find({}, function (err, data) {

        res.json(data)
    })
})

router.get("/api/videos/user/:username", function (req, res) {

    var username = req.params.username;

    video.find({
        "author": username
    }, function (err, data) {

        res.json(data)
    })
})

router.post("/api/login/", function (req, res, next) {

    passport.authenticate('local', function (err, user) {

        if (err) {
            console.log("error 1")
            return res.json(err);
        }
        req.logIn(user, function (err) {
            if (err) {
                console.log("error 2")
                return res.status(403).send({
                    error: "Username or password are not correct"
                });
            }

            return res.json(user);

        });
    })(req, res, next);
});


module.exports = router;