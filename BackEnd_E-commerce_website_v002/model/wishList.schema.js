const mongoose = require("mongoose");

const wishListSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: [{
        productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
        }
    }]
        
    
    
},{versionKey:false});

module.exports = mongoose.model("wishList",wishListSchema)