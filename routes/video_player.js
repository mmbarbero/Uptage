var express = require("express");
var router = express.Router();
var video = require("../models/video");
var transaction = require("../models/transactions");


router.get("/videos/:id", function(req, res){
    
    var videoUrl = req.params.id;
  
     video.find({_id:videoUrl}, function(err, data){

        transaction.find({videoID:videoUrl},"buyerID" ,function (err,docs) {
          
            var buyerIds = docs.map(function (doc) { return doc.buyerID })
                console.log(buyerIds)
             res.render("video_player", { video: data, transaction:buyerIds })

            })   
        })  
})

router.get("/videos/:id/buy",isLoggedIn, requireRole("buyer"), function (req, res) {

    var videoUrl = req.params.id;

        video.find({ _id: videoUrl }, function (err, data) {
           
            var date = new Date();

        var transactionData = {
        buyerID: req.user.username,
        sellerID: data[0].author,
        videoID: data[0]._id,
        videoPrice: data[0].price,
        priceAfterFee: data[0].price - (data[0].price*0.3),
        date: date.toISOString()
        }

transaction.create(transactionData, function(err,transaction){

    if(err){
        console.log(err)
    }
    else{
        console.log("Transaction complete!")
        req.flash("success", "Video bought with success. Click on downloads to see your bought videos");
        res.redirect("back");
    }
})
    })
})

router.post("/videos/:id/update", isLoggedIn, function (req,res) {
    
var videoUrl = req.params.id;

    video.findOne({_id: videoUrl}, function (err,data) {
    
        if(data.author === req.user.username){

            video.updateOne({ _id: videoUrl }, {
                $set: {
                    title: req.body.title,
                    description: req.body.description, tags: req.body.tags,
                    price: req.body.price
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
function requireRole(role) {
    return function (req, res, next) {
        if (req.user && req.user.type === role || req.user.type === "admin") {
            next();
        } else {
            res.render("index");
        }
    }
}


module.exports = router;