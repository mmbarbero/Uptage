var express = require("express"),
    bodyParser = require('body-parser'),
    favicon = require("express-favicon"),
    app = express(),
    recursive = require("recursive-readdir"),
    mongoose = require("mongoose"),
    User = require("./models/user"),
    video = require("./models/video"),
    crypto = require("crypto"),
    minio = require("minio"),
    flash = require("connect-flash"),
    multer = require("multer"),
    passport = require("passport"),
    passportLocalMongoose = require("passport-local-mongoose"),
    LocalStrategy = require("passport-local")

var videosRoutes = require("./routes/videos"),
    mapRoutes = require("./routes/map"),
    videoPlayerRoutes = require("./routes/video_player"),
    uploadRoutes = require("./routes/upload"),
    indexRoutes = require("./routes/index"),
    dashboardRoutes = require("./routes/dashboard"),
    apiRoutes = require("./routes/api")
    


mongoose.connect("mongodb://admin:password@ds157528.mlab.com:57528/uptage");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());


app.use(require("express-session")({
    secret:"Secret thingy here!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error= req.flash("error");
    res.locals.success= req.flash("success");
    next();
})

app.use(indexRoutes);
app.use(videosRoutes);
app.use(videoPlayerRoutes);
app.use(uploadRoutes);
app.use(mapRoutes);
app.use(dashboardRoutes);
app.use(apiRoutes);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


var port = process.env.PORT || 8000


app.listen(port, function(){
    console.log("Server Started! Running on port "+ port);
})