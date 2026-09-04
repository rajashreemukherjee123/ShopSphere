import { createSlice } from "@reduxjs/toolkit";


const tokenFromStorage = localStorage.getItem("token");
const nameFromStorage = localStorage.getItem("userName");
const emailFromStorage = localStorage.getItem("urerEmail");

const initialState = {
    userInfo: tokenFromStorage ? {
        token: tokenFromStorage,
        name: nameFromStorage,
        email: emailFromStorage
    } : null,

    loading: false,
    error: null
};


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginSuccess: (state, action) =>{
            state.userInfo = action.payload;
            state.loading = false;
            state.error = null;
        },

        logout: (state)=>{
            state.userInfo = null;
            state.loading = false;
            state.error = null;
        }
    }
});


export const {loginSuccess,logout} = userSlice.actions;

export default userSlice.reducer;