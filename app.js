var express = require("express"),
    bodyParser = require('body-parser'),
    favicon = require("express-favicon"),
    app = express(),
    recursive = require("recursive-readdir"),
    mongoose = require("mongoose"),
    fileUpload = require("express-fileupload"),
    User = require("./models/user"),
    video = require("./models/video"),
    passport = require("passport"),
    passportLocalMongoose = require("passport-local-mongoose"),
    LocalStrategy = require("passport-local")

var videosRoutes = require("./routes/videos"),
    mapRoutes = require("./routes/map"),
    videoPlayerRoutes = require("./routes/video_player"),
    uploadRoutes = require("./routes/upload"),
    indexRoutes = require("./routes/index")


mongoose.connect("mongodb://localhost:3333/uptage");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

app.use(require("express-session")({
    secret:"Secret thingy here!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

app.use(indexRoutes);
app.use(videosRoutes);
app.use(videoPlayerRoutes);
app.use(uploadRoutes);
app.use(mapRoutes);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.listen(3000, function(){
    console.log("Server Started!");
})