
import axios from '../axiosInstance';
import * as actionType from '../constants/cartConstant';


// const URL =import.meta.env.VITE_API_URL;

// const getAuthConfig = () => {
//     const token = localStorage.getItem('token');
//     return {
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`
//         }
//     };
// };


// Add to Cart
export const addToCartAction = (productId, quantity) => async (dispatch) => {
    try {
        dispatch({ type: actionType.CART_LOADING });
        console.log("Payload:", { productId, quantity });
        const { data } = await axios.post(`/cart/add`, { productId, quantity });
        dispatch({ type: actionType.CART_ADD_ITEM, payload: data.cart });
        return data.cart;
    } catch (error) {
        dispatch({ type: actionType.CART_ERROR, payload: error.response?.data.message || error.message });
        throw error;
    }
};

// Remove from Cart
export const removeFromCartAction = (productId) => async (dispatch) => {
    try {
        dispatch({ type: actionType.CART_LOADING });
        
        const { data } = await axios.post(`/cart/delete`, { productId });
        dispatch({ type: actionType.CART_REMOVE_ITEM, payload: data.cart });
        return data.cart;
    } catch (error) {
        dispatch({ type: actionType.CART_ERROR, payload: error.message });
        throw error;
    }
};

// Update Quantity 
export const updateCartQtyAction = (productId, quantity) => async (dispatch) => {
    try {
        dispatch({ type: actionType.CART_LOADING });
        
        const { data } = await axios.put(`/cart/update`, { productId, quantity });
        dispatch({ type: actionType.CART_UPDATE_QTY, payload: data.cart });
        return data.cart;
    } catch (error) {
        dispatch({ type: actionType.CART_ERROR, payload: error.message });
        throw error;
    }
};

// Get Cart Items from Database
export const getCartDetails = () => async (dispatch) => {
    try {
        dispatch({ type: actionType.CART_LOADING });
        const { data } = await axios.get(`/cart/get`);
        dispatch({ type: actionType.CART_ADD_ITEM, payload: data.cart });
        return data.cart;
    } catch (error) {
        dispatch({ type: actionType.CART_ERROR, payload: error.message });
         throw error;
    }
};