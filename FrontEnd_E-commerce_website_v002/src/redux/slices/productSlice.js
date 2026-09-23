import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const URL = "http://localhost:3000";
const URL = import.meta.env.VITE_API_URL;


// --------- GET ALL PRODUCTS ---------------
export const getProducts = createAsyncThunk("products/getProducts", async(_, {rejectWithValue })=>{
    try{
        const {data} = await axios.get(`${URL}/products`);
        console.log("comming Data:", data);
        return data;

    }catch(err){
        console.log("Error:", err.message);
        return rejectWithValue(err.message);
    }
});


// ------------ GET PRODUCT DETAILS ---------------
export const getProductDetails = createAsyncThunk("products/getProductDetails", async(id, { rejectWithValue })=>{
    try{
        const { data } = await axios.get(`${URL}/product/${id}`);
        return data;

    }catch(err){
        console.log("Error:", err.message);
        return rejectWithValue(err.message);
    }
});


// -------------- GET PRODUCTS BY CATEGORY ------------
export const getProductCategory = createAsyncThunk("products/getProductCategory", async(category, { rejectWithValue })=>{
    try{
        const {data} = await axios.get(`${URL}/products/category/${category}`);
        return data;

    }catch(err){
        return rejectWithValue(err.message);
    }
})


// -------------- GET PRODUCTS BY SECTION ---------------
export const getProductSection =  createAsyncThunk("products/getProductSection", async(section, {rejectWithValue})=>{
    try{
        const {data} = await axios.get(`${URL}/products/sections/${section}`);
        return {section , data};

    }catch(err){
        return rejectWithValue(err.message);
    }
})


// ---------------- AI HYBRIDE SEARCH --------------------
export const aiSearchProducts = createAsyncThunk("products/aiSearchProducts", async(MediaQueryList, {rejectWithValue})=>{
    try{
        const {data} = await axios.post(`${URL}//products/ai-search`, {query});
        return data;
    }catch(err){
        return rejectWithValue(err.message);
    }
})




// ************** INITIAL STATE *****************
const initialState = {
    // all products
    products: [],
    productsLoading: false,
    productsError: null,

    // product details
    product: {},
    detailsLoading: false,
    detailsError: null,

    // category products
    categoryProducts: [],
    categoryLoading: false,
    categoryError: null,

    // section products
    section: {},
    sectionLoading: false,
    sectionError: null,

    // ai search state
    aiSearchResults: [],
    aiSearchLoading: false,
    aiSearchError: null
};



//  ******************* product slice **************
const productSlice = createSlice({
    name: "products",
    initialState,

    reducers: {
        resetProductDetails: (state)=>{
            state.product = {};
            state.detailsLoading = false;
            state.detailsError = null;
        },

        resetProductCategory: (state)=>{
            state.categoryProducts = [];
            state.categoryLoading = false;
            state.categoryError = null;
        },

        resetProductSection: (state)=>{
            state.section = {};
            state.sectionLoading = false;
            state.sectionError = null;
        }
    },


    extraReducers: (builder)=>{
        // get products
        builder
            .addCase(getProducts.pending, (state)=>{
                state.productsLoading = true;
                state.productsError = null;
                state.products = [];
            })

            .addCase(getProducts.fulfilled, (state, action)=>{
                state.productsLoading = false;
                state.products = action.payload;
                state.productsError = null;
            })

            .addCase(getProducts.rejected, (state, action)=>{
                state.productsLoading = false;
                state.products = [];
                state.productsError = action.payload;
            })



            // get product details
            .addCase(getProductDetails.pending, (state)=>{
                state.detailsLoading = true;
                state.detailsError = null;
                state.product = {};
            })

            .addCase(getProductDetails.fulfilled, (state,action)=>{
                state.detailsLoading = false;
                state.product = action.payload;
                state.detailsError = null;
            })

            .addCase(getProductDetails.rejected, (state, action)=>{
                state.detailsLoading = false;
                state.product = {};
                state.detailsError = action.payload;
            })



            // get product category
            .addCase(getProductCategory.pending, (state)=>{
                state.categoryLoading = true;
                state.categoryError = null;
                state.categoryProducts = [];
            })

            .addCase(getProductCategory.fulfilled, (state,action)=>{
                state.categoryLoading = false;
                state.categoryProducts = action.payload;
                state.categoryError = null;
            })

            .addCase(getProductCategory.rejected, (state, action)=>{
                state.categoryLoading = false;
                state.categoryProducts = [];
                state.categoryError = action.payload;
            })



            // get product section
            .addCase(getProductSection.pending, (state)=>{
                state.sectionLoading = true;
                state.sectionError = null;
            }) 

            .addCase(getProductSection.fulfilled, (state, action)=>{
                state.sectionLoading = false;
                state.section = {
                    ...state.section,
                    [action.payload.section]: action.payload.data
                };
                state.sectionError = null;
            })

            .addCase(getProductSection.rejected, (state, action)=>{
                state.sectionLoading = false;
                state.sectionError = action.payload;
            })


            // ai search products
            .addCase(aiSearchProducts.pending, (state)=>{
                state.aiSearchLoading = true;
                state.aiSearchError = null;
                state.aiSearchResults = [];
            })

            .addCase(aiSearchProducts.fulfilled, (state, action)=>{
                state.aiSearchLoading = false;
                state.aiSearchResults = action.payload;
                state.aiSearchError = null;
            })

            .addCase(aiSearchProducts.rejected, (state,action)=>{
                state.aiSearchLoading = false;
                state.aiSearchResults = [];
                state.aiSearchError = action.payload;
            })
    }
});



// export action
export const { resetProductDetails, resetProductCategory, resetProductSection} = productSlice.actions;

// export reducer
export default productSlice.reducer;
