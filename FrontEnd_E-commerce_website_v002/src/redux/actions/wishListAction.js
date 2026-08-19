import axios from "axios";
import * as actionTypes from "../constants/wishListConstant";

const URL = "http://localhost:3000";


// ---------------- Add wishlist ------------------------
export const addToWishList = (productId)=> async(dispatch)=>{
    try{
        const token = localStorage.getItem("token");

        const { data } = await axios.post(`${URL}/wishList/add`,{
            productId:productId
        },{
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        
        dispatch({type: actionTypes.WISH_LIST_ADD_ITEM,
                payload: data.wishList
        })

    }catch(err){
        console.log("Wishlist Error:", err.message);
    }
}

// ---------------- Get wishlist ------------------------
export const getWishlist = ()=> async(dispatch)=>{
    try{
        const token = localStorage.getItem("token");

        dispatch({
            type: actionTypes.WISH_LIST_GET_REQUEST
        });

        const {data} = await axios.get(`${URL}/wishList/show`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        dispatch({type: actionTypes.WISH_LIST_GET_ITEM,
            payload: data.wishListObj
        })

    }catch(err){
        
         dispatch({
            type: actionTypes.WISH_LIST_GET_FAIL,
            payload: err.message
         })
    }
}


// ---------------- Remove wishlist ------------------------
export const removeWishList = (productId)=> async(dispatch)=>{
    try{
        const token = localStorage.getItem("token");
        await axios.delete(`${URL}/wishList/remove/${productId}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        dispatch({type: actionTypes.WISH_LIST_REMOVE_ITEM,
            payload: productId
        })
    }catch(err){
        console.log("Wishlist Error:", err.message);
    }
}