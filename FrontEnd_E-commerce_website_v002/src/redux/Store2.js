import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./slices/productSlice"; 
import cartReducer from "./slices/cartSlice";

import { userLoginReducer } from "./reducers/userReducer";
import { wishListReducer } from "./reducers/wishListReducer";



const tokenFromStorage = localStorage.getItem("token");
const nameFromStorage = localStorage.getItem("userName");



const preloadedState = {
    userLogin : {
        userInfo : tokenFromStorage ? {
            token : tokenFromStorage,
            name : nameFromStorage
        } : null
    }
};


const store = configureStore({
    reducer: {
        userLogin: userLoginReducer,

        productsData: productReducer,

        cart: cartReducer,

        wishList: wishListReducer
    },

    preloadedState
});

export default store;