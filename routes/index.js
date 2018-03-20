var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

var video = require("../models/video");



router.get("/",function(req, res){

  video.find({}, function(err, data){
     
    res.render("index", {videos: data, message1: req.flash("error"), message2: req.flash("success")})
    })
       
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        
        return next();
    }
    req.flash("success", "Please login first")   
res.redirect("/")
}

router.get('/flash', function (req, res) {
    // Set a flash message by passing the key, followed by the value, to req.flash().
  
    res.redirect('/');
});


router.post("/login", passport.authenticate("local",
    {
        successRedirect:"/",
        failureFlash: "Invalid username or password",
        failureRedirect:"/signup"
        
    }), function(req, res){
    
})

router.get("/signup",function(req, res){

    res.render("signup", {message:req.flash("error")});

})
router.post("/signup", function(req, res){

if(req.body.password === req.body.confPassword ){

   var newUser = new User({username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email});
    
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
           // return res.render("signup");
            req.flash("error", "Make sure you fill every field");
            res.redirect("/signup")
        }
   
        passport.authenticate("local")(req,res,function(){
            req.flash("success", "Account created successfully");
            res.redirect("/")
            
        });
        
    });    
    }else{
    req.flash("error", "Make sure your passwords match");
    res.redirect("/signup")
    }
})

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
})

module.exports = router;