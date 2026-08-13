import axios from "axios";
import * as actionTypes from "../constants/wishListConstant";

const URL = "http://localhost:3000";

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