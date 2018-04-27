var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Video = require("../models/video");

router.get("/dashboard/:username/account_info", isLoggedIn, function (req, res) {

    var username = req.params.username 

    User.find({ "username": username }, function (err, data) {

        res.render("account_info", { user: data })
    })
})

router.get("/dashboard/:username/my_videos", isLoggedIn, function (req, res){

    var username = req.params.username


        Video.find({"author": username}, function(err, data){


            res.render("user_videos", { videos: data })
        })

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