var mongoose = require("mongoose");

var transactionSchema = new mongoose.Schema({
    buyerID:{
        type:Number
    },
    sellerID:{
        type:Number
    },
    videoID:{
        type:Number
    },
    totalPrice:{
        type: Number
    },
    date:{
        type: Date
    }

});

var transaction = mongoose.model("Transactions", transactionSchema);
module.exports = transaction;