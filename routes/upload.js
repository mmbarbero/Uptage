var express = require("express");
var router = express.Router();
var video = require("../models/video");
var fileUpload = require("express-fileupload");

router.get("/upload", isLoggedIn, function(req, res){

    res.render("upload");

})

router.post("/upload",isLoggedIn, function(req, res){

    var videoFile = req.files.videoUpload;
    if(videoFile.mimetype != "video/mp4"){
        res.send("No files were uploaded. Wrong filetype / no file chosen")
       
    }else{
    
    
    if(req.body.videoTitle &&
       req.body.videoDescription &&
        req.body.videoTags &&
       req.body.videoCategory &&
       req.body.videoDate &&
       req.body.videoXCoord &&
       req.body.videoYCoord){

        
        var title = req.body.videoTitle;

        var uploadPath = "/videos/"+title+".mp4";              
       
        videoFile.mv("public/"+uploadPath,function(err){
            if(err){console.log(err)
                   res.send("No video Uploaded!")}})


        var videoData = {
            title: req.body.videoTitle,
            description: req.body.videoDescription,
            tags: req.body.videoTags,
            category: req.body.videoCategory,
            date: req.body.videoDate,
            location: {
                type: "Point",
                coordinates:[req.body.videoYCoord,req.body.videoXCoord]
            },
            path:uploadPath  
        }
        video.create(videoData, function(err, video){
            if(err){console.log(err)
                    res.send(JSON.stringify(err))
                   }else{

                       res.redirect("/upload/Success");        
                       console.log(video);
                       console.log("Uploaded!");
                    
                   }
        })}
}
})
router.get("/upload/Success",function(req, res){
    res.render("uploadSuccess");
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        
        return next();
    }  
res.redirect("/signup")
}


module.exports = router;
