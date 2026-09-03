// import axios from "../axiosInstance";
// import * as actionTypes from "../constants/wishListConstant";

// // const URL = "http://localhost:3000";


// // ---------------- Add wishlist ------------------------
// export const addToWishList = (productId)=> async(dispatch)=>{
//     try{
//         const token = localStorage.getItem("token");

//         const { data } = await axios.post(`/wishList/add`,{
//             productId:productId
//         });
        
//         dispatch({type: actionTypes.WISH_LIST_ADD_ITEM,
//                 payload: data.wishList
//         })

//         return data.wishList;

//     }catch(err){
//         console.log("Wishlist Error:", err.message);
//         throw err;
//     }
// }

// // ---------------- Get wishlist ------------------------
// export const getWishlist = ()=> async(dispatch)=>{
//     try{
//         const token = localStorage.getItem("token");

//         dispatch({
//             type: actionTypes.WISH_LIST_GET_REQUEST
//         });
        
//         const {data} = await axios.get(`/wishList/show`);

//         dispatch({type: actionTypes.WISH_LIST_GET_ITEM,
//             payload: data.wishListObj
//         });

//         return data.wishListObj;

//     }catch(err){
        
//          dispatch({
//             type: actionTypes.WISH_LIST_GET_FAIL,
//             payload: err.response?.data?.message || err.message
//          });
//          throw err;
//     }
// }


// // ---------------- Remove wishlist ------------------------
// export const removeWishList = (productId)=> async(dispatch)=>{
//     try{
//         const token = localStorage.getItem("token");
//         await axios.delete(`/wishList/remove/${productId}`);

//         dispatch({type: actionTypes.WISH_LIST_REMOVE_ITEM,
//             payload: productId
//         })
//         return productId;
//     }catch(err){
//         console.log("Wishlist Error:", err.message);
//         throw err;
//     }
// }