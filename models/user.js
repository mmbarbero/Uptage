var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    username: {
        type: String,
        unique:true,
        required:true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String
      
    },
    type: {
        type: String,
        required:true
    }
});

userSchema.plugin(passportLocalMongoose);

var user = mongoose.model("User", userSchema);
module.exports = user;