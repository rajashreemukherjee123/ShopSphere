const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
                min: [1, 'Quentity cannot be less than 1']
            }
        }
    ]
},{ timestamps: true});

module.exports = mongoose.model("cart", cartSchema);
console.log("cartSchema is ready to use");