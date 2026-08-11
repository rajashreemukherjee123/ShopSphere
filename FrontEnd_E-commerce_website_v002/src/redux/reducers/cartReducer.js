import * as actionType from '../constants/cartConstant'


const initialState = {
    cartItems: [],
    loading: false,
    error: null
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.CART_LOADING:
            return {
                ...state,
                loading: true
            };

        case actionType.CART_ADD_ITEM:
        case actionType.CART_REMOVE_ITEM:
        case actionType.CART_UPDATE_QTY:
            return {
                ...state,
                loading: false,
                cartItems: action.payload && action.payload.items ? [...action.payload.items] : [],
                error: null
            };

        case actionType.CART_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };


        case actionType.CART_CLEAR:
            return {
                ...initialState  
            };    

        default:
            return state;
    }
};