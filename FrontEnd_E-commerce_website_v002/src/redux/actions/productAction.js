// import axios from "axios";

// import * as actionTypes from "../constants/productConstant";

// const URL ="http://localhost:3000";
// // const URL =import.meta.env.VITE_API_URL;


// ////////////////////////////////////////////////////////////////////////////////////////////////////
// export const getProducts = ()=> async(dispatch)=>{
//     try{
//         // /////// 
//          dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST })

//        const { data } = await axios.get(`${URL}/products`);
//        /////
//        console.log("coming DATA :", data); 
       
//        dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data})

//     }catch(err){
        
//         console.log(" ERROR:", err.message); //
//         dispatch({type: actionTypes.GET_PRODUCTS_FAIL, payload: err.message})
//     }
// }


// ///////////////////////////////////////////////////////////////////////////////////////////////
// export const getProductDetails = (id)=> async(dispatch)=>{
//     try{
//         dispatch ({ type: actionTypes.GET_PRODUCTS_DETAILS_REQUEST });

//         const { data } = await axios.get(`${URL}/product/${id}`);

//         dispatch({ type: actionTypes.GET_PRODUCTS_DETAILS_SUCCESS, payload: data})

//     }catch (err){
//         dispatch({type: actionTypes.GET_PRODUCTS_DETAILS_FAIL, payload: err.message})
//     }
// } 



// export const getProductCategory = (category)=> async(dispatch)=>{
//     try{
//         dispatch ({type: actionTypes.GET_PRODUCT_CATEGORY_REQUEST});

//         const { data } = await axios.get(`${URL}/products/category/${category}`);

//         dispatch ({type: actionTypes.GET_PRODUCT_CATEGORY_SUCCESS, payload: data});

//     }catch (err){
//         dispatch ({type: actionTypes.GET_PRODUCT_CATEGORY_FAIL, payload: err.message});
//     }
// }


// export const  getProductSection = (section)=> async(dispatch)=>{
//     try{
//         dispatch({ type: actionTypes.GET_PRODUCT_SECTION_REQUEST });

//         const { data } = await axios.get(`${URL}/products/sections/${section}`);

//         dispatch ({ type: actionTypes.GET_PRODUCT_SECTION_SUCCESS, 
//                     payload: data,
//                     section: section 
//                 });

//     }catch(err){
//         dispatch ({ type: actionTypes.GET_PRODUCT_SECTION_FAIL, payload: err.message });
//     }
// }