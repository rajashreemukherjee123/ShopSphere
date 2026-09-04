import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./slices/productSlice"; 
import cartReducer from "./slices/cartSlice";
import wishListReducer from "./slices/wishListSlice";
import userReducer from "./slices/userSlice";




const tokenFromStorage = localStorage.getItem("token");
const nameFromStorage = localStorage.getItem("userName");
const emailFromStorage = localStorage.getItem("userEmail");



const preloadedState = {
    userLogin : {
        userInfo : tokenFromStorage ? {
            token : tokenFromStorage,
            name : nameFromStorage,
            email : emailFromStorage
        } : null
    }
};


const store = configureStore({
    reducer: {
        userLogin: userReducer,

        productsData: productReducer,

        cart: cartReducer,

        wishList: wishListReducer
    },

    preloadedState
});

export default store;