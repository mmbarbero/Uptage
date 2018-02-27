var express = require("express");
var router = express.Router();
var video = require("../models/video");

router.get("/videos/:id", function(req, res){
    
    var videoUrl = req.params.id;
  
     video.find({_id:videoUrl}, function(err, data){
     

     /*   data.geoNear([38,-9],
              { maxDistance : 9999999999999999999, spherical : true }, 
              function(err, results, stats) {
                   console.log(results);
                });
         
         */
             
             res.render("video_player",{video:data})
       
})
    
   
    
    
})
module.exports = router;