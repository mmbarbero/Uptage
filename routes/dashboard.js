var mongo = require('mongodb');
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Video = require("../models/video");
var Transaction = require("../models/transactions");

router.get("/dashboard/:username/account_info", isLoggedIn, function (req, res) {

    var username = req.params.username

    User.find({
        "username": username
    }, function (err, data) {

        res.render("account_info", {
            user: data
        })
    })
})

router.get("/dashboard/:username/my_videos", isLoggedIn, function (req, res) {

    var type = req.user.type
    var username = req.params.username
    var videos = []
    var ObjectId = require("mongoose").Types.ObjectId;

    if (type == "buyer") {

        Transaction.find({
            "buyerID": "buyer"
        }, "videoID", function (err, docs) {

            var ids = docs.map(function (doc) {
                return doc.videoID
            })


            Video.find({
                _id: {
                    $in: ids
                }
            }, function (err, videos) {


                res.render("user_videos", {
                    videos: videos
                })

            })
        })

    } else {
        console.log("not buyer")
        Video.find({
            "author": username
        }, function (err, data) {

            res.render("user_videos", {
                videos: data
            })
        })
    }
})

router.get("/dashboard/:username/:userType/transactions", isLoggedIn, function (req, res) {
    var username = req.params.username
    var userType = req.params.userType

    if (userType == "seller") {

        Transaction.find({
            "sellerID": username
        }, function (err, data) {
            
            res.render("transactions", {
                trans: data
            })
        })
    } else if (userType == "buyer") {

        console.log(userType)

        Transaction.find({
            "buyerID": username
        }, function (err, data) {
            console.log(data)
            res.render("transactions", {
                trans: data
            })
        })
    } else if(userType == "admin"){
        Transaction.find({}, function (err, data) {

            res.render("transactions", {
                trans: data
            })
        })
    }
})


router.get("/dashboard/:username/statistics", isLoggedIn, function (req, res) {



    res.render("statistics")
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {

        return next();
    }
    req.flash("error", "Please log in first")
    res.redirect("/")
}

module.exports = router;