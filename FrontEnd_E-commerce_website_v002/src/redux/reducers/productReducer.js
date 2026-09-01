
// import * as actionType from '../constants/productConstant';

// export const getProductsReducer = (state = { products: [], loading: false }, action) => {
//     switch(action.type) {
//         case actionType.GET_PRODUCTS_REQUEST:   
//             return { loading: true, products: [] }
//         case actionType.GET_PRODUCTS_SUCCESS:
//             return { loading: false, products: action.payload }
//         case actionType.GET_PRODUCTS_FAIL:
//             return { loading: false, error: action.payload }
//         default:
//             return state
//     }
// }


// export const getProductDetailsReducer = (state = { product: {} }, action)=>{
//     switch(action.type) {
//         case actionType.GET_PRODUCTS_DETAILS_REQUEST:
//             return { loading: true, product: {} }
//         case  actionType.GET_PRODUCTS_DETAILS_SUCCESS:
//             return { loading: false, product: action.payload}
//         case actionType.GET_PRODUCTS_DETAILS_FAIL:
//             return { loading: false,  product: {}, error: action.payload}
//         case actionType.GET_PRODUCTS_DETAILS_RESET:
//             return { product: {} }
//         default:
//             return state

//     }
// }



// export const getProductCategoryReduces = (state = {products:[], loading:false, error:null}, action)=>{
//     switch(action.type) {
//         case actionType.GET_PRODUCT_CATEGORY_REQUEST:
//             return { loading: true, products:[], error:null }
//         case actionType.GET_PRODUCT_CATEGORY_SUCCESS:
//             return { loading: false, products: action.payload, error:null }
//         case actionType.GET_PRODUCT_CATEGORY_FAIL:
//             return { loading: false, products:[], error: action.payload }
//         case actionType.GET_PRODUCT_CATEGORY_RESET:
//             return { products: [] }
//         default:
//             return state
//     }
// }


// export const getProductSectionReducer = (state = {section: {}, loading:false, error:null }, action)=>{
//     switch(action.type) {
//         case actionType.GET_PRODUCT_SECTION_REQUEST:
//             return { ...state, loading:true, error:null }

//         case actionType.GET_PRODUCT_SECTION_SUCCESS:
//             return { ...state, 
//                     loading:false, 
//                     section: {
//                         ...state.section,
//                         [action.section]: action.payload
//                     },
//                     error:null }

//         case actionType.GET_PRODUCT_SECTION_FAIL:
//             return { ...state, loading:false, error:action.payload}

//         case actionType.GET_PRODUCT_SECTION_RESET:
//             return { section: {}, loading: false, error: null }
//         default:
//             return state
//     }
// }