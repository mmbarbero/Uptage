var express = require("express");
var router = express.Router();
var video = require("../models/video");
var user = require("../models/user");
var passport = require("passport");


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