import "./App.css";
import { Box } from "@mui/material";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

////////////////
import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";

import { loginSuccess, logout } from "./redux/slices/userSlice";

// component
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import DetailView from "./components/details/DetailView";
import Cart from "./components/cart/Cart";
import CategoryPage from "./components/category/CategoryPage";
import SectionsPage from "./components/sections/SectionsPage";
import WishListPage from "./components/wishlist/WishListPage";


import { resetCart } from "./redux/slices/cartSlice";
import { resetWishList } from "./redux/slices/wishListSlice";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");

    if (!token) {
      dispatch(logout());
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp && decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        

        dispatch(logout());

        dispatch(resetCart());

        dispatch(resetWishList());

        toast.info("Your session has expired. Please login again.");

        return;
      } 

      dispatch(loginSuccess({
        token,
        name: userName,
        email: userEmail
      }));

    } catch (error) {

      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      

      dispatch(logout());

      dispatch(resetCart());

      dispatch(resetWishList());
    }
  }, [dispatch]);


  // For handle token expiry while user is using the website
  useEffect(()=>{
    const handleTokenExpired = ()=>{

      console.log("TOKEN EXPIRED EVENT FIRED");

      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem("userEmail");
      

      dispatch(logout());

      dispatch(resetCart());

      dispatch(resetWishList());

      toast.info(
        "Your session has expired. Please login again."
      );
    };

    window.addEventListener(
        "tokenExpired",
        handleTokenExpired
      );

    return ()=>{
      window.removeEventListener("tokenExpired", handleTokenExpired);
    }
  },[dispatch]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Box style={{ marginTop: 75 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<DetailView />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/sections/:section" element={<SectionsPage />} />
            <Route path="/wishlist" element={<WishListPage />} />

            {/*  */}
            <Route path="/success" element={<h2>Payment Successful! </h2>} />
            <Route
              path="/failure"
              element={<h2>Payment Failed. Please try again.</h2>}
            />
          </Routes>
        </Box>
      </BrowserRouter>

      <ToastContainer position="bottom-center" autoClose={2000} theme="light" closeOnClick
        pauseOnHover/>
    </>
  );
};

export default App;
