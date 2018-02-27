var mongoose = require("mongoose");

var videoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tags: {
        type: String,
        required:true,
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date, 
        required:true
    },
    location: {
        type: {type: String},
        coordinates:{type: [Number], default: [0, 0]}
    },
    path:{
        type: String,
        required: true     
    }    

});

var video = mongoose.model("Video", videoSchema);
module.exports = video;