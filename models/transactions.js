var mongoose = require("mongoose");

var transactionSchema = new mongoose.Schema({
    buyerID:{
        type:String
    },
    sellerID:{
        type:String
    },
    videoID:{
        type:String
    },
    videoPrice:{
        type: Number
    },
    videoTitle:{
        type: String
    },
    priceAfterFee:{
        type: Number
    },
    date:{
        type: Date
    }

});

var transaction = mongoose.model("Transactions", transactionSchema);
module.exports = transaction;