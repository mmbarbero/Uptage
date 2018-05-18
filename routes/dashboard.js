

var mongo = require('mongodb');
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Video = require("../models/video");
var Transaction = require("../models/transactions");

router.get("/dashboard/:username/account_info", isLoggedIn, function (req, res) {

    var username = req.params.username 

    User.find({ "username": username }, function (err, data) {

        res.render("account_info", { user: data })
    })
})

router.get("/dashboard/:username/my_videos", isLoggedIn, function (req, res){
    
    var type = req.user.type
    var username = req.params.username
    var videos = []
    var ObjectId = require("mongoose").Types.ObjectId;

   

console.log(username)

    if(type == "buyer"){
        
        Transaction.find({"buyerID": "buyer"}, "videoID", function(err, docs){  

            var ids = docs.map(function(doc){return doc.videoID})
            console.log(ids)

            Video.find({ _id: {$in: ids}}, function(err, videos){
                console.log(videos)

                res.render("user_videos", { videos: videos })

            })

        })


    }else{
        console.log("not buyer")
        Video.find({ "author": username }, function (err, data) {

            res.render("user_videos", { videos: data })
        })
    }    
})

router.get("/dashboard/:username/statistics", isLoggedIn, function (req, res) {

        res.render("statistics")
    })

router.get("/dashboard/:username/transactions", isLoggedIn, function (req, res) {

    res.render("transactions")
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {

        return next();
    }
    req.flash("error", "Please log in first")
    res.redirect("/")
}

module.exports = router;