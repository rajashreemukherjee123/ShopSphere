import * as actionType from "../constants/userConstant";

const initialState = {
    userInfo: null
};

export const userLoginReducer = (state = initialState, action) => {

    switch(action.type){

        case actionType.USER_LOGIN_SUCCESS:
            return {
                ...state,
                userInfo: action.payload
            }

        case actionType.USER_LOGOUT:
            return {
                ...state,
                userInfo: null
            }

        default:
            return state;
    }
}