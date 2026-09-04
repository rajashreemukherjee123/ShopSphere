import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosInstance";


// -------------------- GET CART -------------------------
export const getCart = createAsyncThunk("cart/getCart", async(_, {rejectWithValue})=>{
    try{
        const {data} = await axios.get("/cart/get");
        return data.cart;

    }catch(err){
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});


// -------------------- ADD TO CART ----------------------
export const addToCart = createAsyncThunk("cart/addToCart", async({productId, quantity}, {rejectWithValue})=>{
    try{
        const {data} = await axios.post("/cart/add" , {productId, quantity});
        return data.cart;

    }catch(err){
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});


// ------------------- REMOVE FROM CART -----------------
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async(productId, {rejectWithValue})=>{
    try{
        const {data} = await axios.post("/cart/delete", {productId});
        return data.cart;

    }catch(err){
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});


// ------------------ UPDATE CART QUANTITY ----------------
export const updateCartQuantity = createAsyncThunk("cart/updateCartQuantity", async({productId, quantity}, {rejectWithValue})=>{
    try{
        const {data} = await axios.put("/cart/update", {productId, quantity});
        return data.cart;

    }catch(err){
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});


// --------------------- CLEAR CART -----------------------
export const clearCart = createAsyncThunk("cart/clearCart", async(_,{rejectWithValue})=>{
    try{
        const {data} = await axios.delete("/cart/clear");
        return data;

    }catch(err){
        return rejectWithValue(err.response?.data?.message || err.message);
    }
})





// ************* INITIAL STATE ***********************
const initialState = {
    cartItems: [],
    loading: false,
    updating: false,
    error: null
};



// ****************** CART SLICE **************************
const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {
    
        resetCart: (state)=>{
            state.cartItems = [];
            state.loading = false;
            state.error = null;
        }
    },



    extraReducers: (builder) =>{
        // get cart
        builder
            .addCase(getCart.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })

            .addCase(getCart.fulfilled, (state, action)=>{
                state.loading = false;
                state.cartItems = action.payload?.items || [];
                state.error = null;
            })

            .addCase(getCart.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            });


        // add to cart
        builder
            .addCase(addToCart.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })

            .addCase(addToCart.fulfilled, (state,action)=>{
                state.loading = false;
                state.cartItems = action.payload?.items || [];
                state.error = null;
            })

            .addCase(addToCart.rejected, (state,action)=>{
                state.loading = false;
                state.error = action.payload;
            });


        // remove cart
        builder
            .addCase(removeFromCart.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })

            .addCase(removeFromCart.fulfilled, (state, action)=>{
                state.loading = false;
                state.cartItems = action.payload?.items || [];
                state.error = null;
            })

            .addCase(removeFromCart.rejected, (state,action)=>{
                state.loading = false;
                state.error = action.payload;
            });


        // update quantity
        builder
            .addCase(updateCartQuantity.pending, (state)=>{
                state.updating = true;
                state.error = null;
            })

            .addCase(updateCartQuantity.fulfilled, (state, action)=>{
                state.updating = false;
                state.cartItems = action.payload?.items || [];
                state.error = null;
            })

            .addCase(updateCartQuantity.rejected, (state, action)=>{
                state.updating = false;
                state.error = action.payload;
            });


        // clear cart
        builder
            .addCase(clearCart.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })

            .addCase(clearCart.fulfilled, (state)=>{
                state.loading = false;
                state.cartItems = [];
                state.error = null;
            })

            .addCase(clearCart.rejected, (state,action)=>{
                state.loading = false;
                state.error = action.payload;
            })
    }
});


// ============ EXPORT ACTION ===================
export const { resetCart } = cartSlice.actions;


// ============ EXPORT REDUCER ===================
export default cartSlice.reducer;