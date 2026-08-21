import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "http://localhost:3000"
});


axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {
        if( 
            error.response?.status === 401 || 
            error.response?.status === 403  
            
        ){
            localStorage.removeItem("token");
            localStorage.removeItem("userName");

            window.dispatchEvent(
                new Event("tokenExpired")
            );
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;