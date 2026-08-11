import { createStore, combineReducers, applyMiddleware } from "redux";

import {thunk} from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";

import { getProductsReducer, getProductDetailsReducer, getProductCategoryReduces } from "./reducers/productReducer";
import { getProductDetails, getProductCategory } from "./actions/productAction";

import { cartReducer } from './reducers/cartReducer';
import { userLoginReducer } from "./reducers/userReducer";


const reducer = combineReducers({
    userLogin: userLoginReducer,
    getProducts: getProductsReducer,
    getProductDetails: getProductDetailsReducer,
    getProductCategory: getProductCategoryReduces,
    cart: cartReducer
});

const tokenFromStorage = localStorage.getItem("token");

const nameFromStorage = localStorage.getItem("userName");


const initialState = {
   userLogin: {
      userInfo: tokenFromStorage
         ?{
         token: tokenFromStorage,
         name: nameFromStorage
      }
      : null
   }
}

const middleware = [thunk];


const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;