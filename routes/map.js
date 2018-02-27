var express = require("express");
var router = express.Router();
var video = require("../models/video");

router.get("/map",function(req, res){

    
    video.find({},function(err, data){
       res.render("map",{videos:data});
    })

})

module.exports = router;