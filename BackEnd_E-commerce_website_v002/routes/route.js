const express = require("express");
const env = require("dotenv").config();
const { userSignup, userLogin } = require('../controller/user-controller');
const { getProducts, getProductById, getCategoryProduct, getSectionsProduct} = require("../controller/product-controller");
const { addToCart, removeFromCart, updateQuantity, getCartDetails, clearCart } = require("../controller/cart-controller");

const { createOrder, verifyPayment } = require("../controller/payment-controller");

const checkAuth = require('../middleware/auth'); 
const {addToWishList, getWishList, removeWishList} = require("../controller/wishList-controller");


const router = express.Router();


//--------------------------------------------------------- Signup ----------------------------------------------------------
router.post("/signup", userSignup);

//--------------------------------------------------------- Login ----------------------------------------------------------
router.post("/login", userLogin);

//--------------------------------------------------------- All product list ----------------------------------------------------------
router.get("/products", getProducts);

//--------------------------------------------------------- Show product by Id ----------------------------------------------------------
router.get("/product/:id", getProductById);

//--------------------------------------------------------- Show product by category ----------------------------------------------------------
router.get("/products/category/:category", getCategoryProduct);

//--------------------------------------------------------- Show product by sections ----------------------------------------------------------
router.get("/products/sections/:section", getSectionsProduct);

//--------------------------------------------------------- Add to cart ----------------------------------------------------------
router.post("/cart/add",checkAuth, addToCart);

//--------------------------------------------------------- Remove from cart ----------------------------------------------------------
router.post("/cart/delete",checkAuth, removeFromCart);

//--------------------------------------------------------- updateQuantity in cart ----------------------------------------------------------
router.put("/cart/update",checkAuth, updateQuantity);

//--------------------------------------------------------- Get Cart items ------------------------------------------------
router.get("/cart/get", checkAuth, getCartDetails);


//---------------------------------------------------------- Cart clear ----------------------------------------------------------------
router.post("/cart/clear", checkAuth, clearCart);

//---------------------------------------------------------- add to wishList ----------------------------------------------------------------
router.post("/wishList/add", checkAuth, addToWishList);

//---------------------------------------------------------- Show wishList ----------------------------------------------------------------
router.get("/wishList/show", checkAuth, getWishList);

//---------------------------------------------------------- Remove product from wishList ----------------------------------------------------------------
router.delete("/wishList/remove/:pid", checkAuth, removeWishList);



// Razorpay Payment
router.post("/payment/create-order", checkAuth, createOrder);
router.post("/payment/verify", checkAuth, verifyPayment);


module.exports = router;
console.log("Router working");