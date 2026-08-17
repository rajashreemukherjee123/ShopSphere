import * as actionTypes from "../constants/wishListConstant";

export const wishListReducer = ( state = { wishList: null, loading: false, error: null}, action) => {
    switch (action.type){

        case actionTypes.WISH_LIST_ADD_ITEM:
            return {
                ...state,
                wishList: action.payload,
                error: null
            };
        
            case actionTypes.WISH_LIST_GET_ITEM:
                return {
                    ...state,
                    wishList: action.payload,
                    error: null
                };

            case actionTypes.WISH_LIST_REMOVE_ITEM:
                return {
                    ...state,
                    wishList: {
                        ...state.wishList,
                        items: state.wishList.items.filter((item)=>{
                            return (
                                item.productId.toString() !== action.payload.toString()
                            )
                        })
                    },
                    error: null
                };
            
            default:
                return state;
    }
};