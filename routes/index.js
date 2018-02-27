var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

var video = require("../models/video");



router.get("/",function(req, res){

  video.find({}, function(err, data){
     
    res.render("index", {videos: data})
    })
       
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        
        return next();
    }  
res.redirect("/signup")
}


router.post("/login", passport.authenticate("local",
    {
        successRedirect:"/",
        failureRedirect:"/signup"
    }), function(req, res){
    
})


router.get("/signup",function(req, res){

    res.render("signup");

})
router.post("/signup", function(req, res){


   var newUser = new User({username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email});
    
    User.register(newUser, req.body.passwd, function(err, user){
        if(err){
            console.log(err);
            return res.render("signup");
        }
        passport.authenticate("local")(req,res,function(){
           return res.redirect("http://localhost:3000/signup/Success")
            
        });
        
    })    

})

router.get("/signup/Success",function(req, res){
    res.render("signupSuccess");
})


router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
})

module.exports = router;