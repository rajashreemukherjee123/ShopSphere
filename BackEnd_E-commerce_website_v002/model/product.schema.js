const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    category: String,
    url: String,
    detailUrl: String,
    title: Object,
    price: Object,
    quantity: Number,
    description: String,
    discount: String,
    tagline: String,
    sections: [String] 

},{versionKey:false});

module.exports = mongoose.model("product",productSchema);