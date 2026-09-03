import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosInstance";


// --------------------- GET WISHLIST -----------------------
export const getWishlist = createAsyncThunk("wishList/getWishlist", async(_, {rejectWithValue})=>{
    try{
        const {data} = await axios.get("/wishList/show");
        return data.wishListObj
    
    }catch(err){
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});



// -------------------- ADD TO WISHLIST ---------------
export const addToWishList = createAsyncThunk("wishList/addToWishList", async(productId, {rejectWithValue})=>{
    try{
        const {data} = await axios.post("/wishList/add",{productId});
        return data.wishList;

    }catch(err){
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});



// ------------------- REMOVE FROM WISHLIST --------------
export const removeWishList = createAsyncThunk("wishList/removeWishList", async(productId, {rejectWithValue})=>{
    try{
        await axios.delete(`/wishList/remove/${productId}`);
        return productId;

    }catch(err){
        return rejectWithValue(err.response?.data?.message || err.message);
    }
})



// ********************* Initial State ********************
const initialState = {
    wishList: null,
    loading: false,
    error: null
};


// ********************* Slice ***************************
const wishListSlice = createSlice({
    name: "wishList",

    initialState,

    reducers: {
        resetWishList: (state)=>{
            state.wishList = null;
            state.loading = false;
            state.error = null;
        }
    },


    extraReducers: (builder) => {

        // get wishlist
        builder
            .addCase(getWishlist.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })

            .addCase(getWishlist.fulfilled, (state, action)=>{
                state.loading = false;
                state.wishList = action.payload;
                state.error = null;
            })

            .addCase(getWishlist.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            });


        // Add wishlist
        builder
            .addCase(addToWishList.pending, (state)=>{
                state.loading = true;
                state.error = null; 
            })

            .addCase(addToWishList.fulfilled, (state, action)=>{
                state.loading = false;
                state.wishList = action.payload;
                state.error = null;
            })

            .addCase(addToWishList.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            });


        // remove wishlist
        builder
            .addCase(removeWishList.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })

            .addCase(removeWishList.fulfilled, (state, action)=>{
                state.loading = false;

                if(state.wishList){
                    state.wishList={
                        ...state.wishList,

                        items : state.wishList.items.filter((item)=>{
                            const itemPid = item?.productId?._id ?? item?.productId;

                            return (
                                itemPid?.toString() !== action.payload.toString()
                            );
                        })
                    }
                }

                state.error = null;

            })

            .addCase(removeWishList.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            });
    }
});


export const {resetWishList} = wishListSlice.actions;

export default wishListSlice.reducer;