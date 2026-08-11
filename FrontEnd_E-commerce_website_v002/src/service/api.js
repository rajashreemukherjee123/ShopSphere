import axios from 'axios';

// const URL = 'http://localhost:3000';
const URL=import.meta.env.VITE_API_URL;

// Auth header helper
const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
};

//--------------------- SignUp ------------------------------
export const authenticatesSignup = async(data)=>{
    try{
        return  await axios.post(`${URL}/signup`,data)
    }catch(err){
        console.log("Error while calling signup api",err);
        return err.response;
    }
}


//--------------------- Login ------------------------------
export const authenticatesLogin = async(data)=>{
    try{
        return  await axios.post(`${URL}/login`,data);
    }catch(err){
        console.log("Error while calling login api",err);
        return err.response;
    }
}



//--------------------- Razorpay: Order Create --------------
export const createRazorpayOrder = async (amount) => {
    try {
        const response = await axios.post(
            `${URL}/payment/create-order`,
            { amount },
            getAuthConfig()
        );
        return response.data;
    } catch (err) {
        console.log('Error creating Razorpay order:', err);
        return null;
    }
};
 
//--------------------- Razorpay: Payment Verify --------------
export const verifyRazorpayPayment = async (paymentData) => {
    try {
        const response = await axios.post(
            `${URL}/payment/verify`,
            paymentData,
            getAuthConfig()
        );
        return response.data;
    } catch (err) {
        console.log('Error verifying payment:', err);
        return null;
    }
};


//-------------------- clear cart-------------
export const clearCartApi = async () => {
    try {
        const response = await axios.post(`${URL}/cart/clear`, {}, getAuthConfig());
        return response.data;
    } catch (err) {
        console.log('Error clearing cart:', err);
        return null;
    }
};