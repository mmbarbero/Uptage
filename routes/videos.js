var express = require("express");
var router = express.Router();
var video = require("../models/video");


router.get("/videos", function (req, res) {
    
    video.find({}, function (err, data) {

        res.render("videos", {
            videos: data
        })
    })

})

router.get("/search", function (req, res) {

    if (req.query.searchTerm) {
        const regex = new RegExp(escapeRegex(req.query.searchTerm), "gi");
        console.log(regex);
        video.find({
            '$or': [{
                    'title': {
                        '$regex': regex,
                        '$options': 'i'
                    }
                },
                {
                    'category': {
                        '$regex': regex,
                        '$options': 'i'
                    }
                },
                {
                    'tags': {
                        '$regex': regex,
                        '$options': 'i'
                    }
                }
            ]
        }, function (err, data) {

            console.log(data)
            res.render("videos", {
                videos: data
            })

        })
    } else {
        video.find({}, function (err, data) {

            res.render("videos", {
                videos: data
            })
        })
    }

});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;