var express = require("express");
var router = express.Router();
var video = require("../models/video");
var transactions = require("../models/transactions");
router.get("/videos/:id", function(req, res){
    
    var videoUrl = req.params.id;
  
     video.find({_id:videoUrl}, function(err, data){
             
             res.render("video_player",{video:data})
       
})  
})

router.post("/buy", function (err, data) {



})

router.post("/videos/:id/update", isLoggedIn, function (req,res) {
    
var videoUrl = req.params.id;

    video.findOne({_id: videoUrl}, function (err,data) {
    
        console.log(data.author)

        if(data.author === req.user.username){

            console.log(req.body.title + " "+
                req.body.description+" "+
                req.body.tags)

            video.updateOne({ _id: videoUrl }, {
                $set: {
                    title: req.body.title,
                    description: req.body.description, tags: req.body.tags
                }
            }, function (err) {
                if(err){
                    console.log(err)
                }
            });

            res.redirect("/videos/"+ videoUrl);

        }else{
            res.redirect("/videos/"+ videoUrl);
            console.log("You cant do that")
        }
    } )
})


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {

        return next();
    }
    req.flash("success", "Please login first")
    res.redirect("/")
}

module.exports = router;