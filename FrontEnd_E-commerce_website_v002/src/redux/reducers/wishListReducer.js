import * as actionTypes from "../constants/wishListConstant";

export const wishListReducer = ( state = { wishList: null, loading: false, error: null}, action) => {
    switch (action.type){

        case actionTypes.WISH_LIST_GET_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case actionTypes.WISH_LIST_GET_ITEM:
                return {
                    ...state,
                    loading: false,
                    wishList: action.payload,
                    error: null
                };

        case actionTypes.WISH_LIST_GET_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case actionTypes.WISH_LIST_ADD_ITEM:
            return {
                ...state,
                loading: false,
                wishList: action.payload,
                error: null
            };
        
            

            case actionTypes.WISH_LIST_REMOVE_ITEM:
                return {
                    ...state,
                    loading: false,
                    
                    wishList: {
                        ...state.wishList,
                        items: state.wishList.items.filter((item)=>{
                            const itemPid = item?.productId?._id ?? item?.productId;
                            return (
                
                                itemPid.toString() !== action.payload.toString()
                            )
                        })
                    },
                    error: null
                };


            case actionTypes.WISH_LIST_RESET:
                return {
                    wishList: null,
                    loading: false,
                    error: null
                }
            
            default:
                return state;
    }
};