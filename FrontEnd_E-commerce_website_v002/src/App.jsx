import "./App.css";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

////////////////
import React, { useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { DataContext } from "./context/DataProvider";
import { useDispatch } from "react-redux";
import { USER_LOGIN_SUCCESS } from "./redux/constants/userConstant";

// component
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import DetailView from "./components/details/DetailView";
import Cart from "./components/cart/Cart";
import CategoryPage from "./components/category/CategoryPage";
import SectionsPage from "./components/sections/SectionsPage";
import WishListPage from "./components/wishlist/WishListPage";

import { USER_LOGOUT } from "./redux/constants/userConstant";
import { CART_RESET } from "./redux/constants/cartConstant";
import { WISH_LIST_RESET } from "./redux/constants/wishListConstant";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const { setAccount } = useContext(DataContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");

    if (!token && !userName) {
      setAccount("");
    }
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp && decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        setAccount("");

        dispatch({
          type: USER_LOGOUT,
        });

        dispatch({
          type: CART_RESET,
        });

        dispatch({
          type: WISH_LIST_RESET,
        });

        toast.info("Your session has expired. Please login again.");

        return;
      } else {
        setAccount(userName);
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: { token, name: userName },
        });
      }
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      setAccount("");

      dispatch({
        type: USER_LOGOUT,
      });

      dispatch({
        type: CART_RESET,
      });

      dispatch({
        type: WISH_LIST_RESET,
      });
    }
  }, [setAccount, dispatch]);


  // For handle token expiry while user is using the website
  useEffect(()=>{
    const handleTokenExpired = ()=>{

      console.log("TOKEN EXPIRED EVENT FIRED");

      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      setAccount("");

      dispatch({
        type: USER_LOGOUT,
      });

      dispatch({
        type: CART_RESET,
      });

      dispatch({
        type: WISH_LIST_RESET,
      });

      toast.info(
        "Your session has expired. Please login again."
      );


      window.addEventListener(
        "tokenExpired",
        handleTokenExpired
      );

    };
  },[setAccount, dispatch]);

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
