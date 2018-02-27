var express = require("express");
var router = express.Router();
var video = require("../models/video");


router.get("/videos", function(req, res){

    
    
    video.find({}, function(err, data){
     
    res.render("videos", {videos: data})
    })

})

module.exports = router;