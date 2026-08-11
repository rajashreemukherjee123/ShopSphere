
import './App.css';
import {Box} from '@mui/material'
////////////////
import React, { useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { DataContext } from './context/DataProvider';
import { useDispatch } from 'react-redux';
import { USER_LOGIN_SUCCESS } from './redux/constants/userConstant';

// component
import Header from './components/header/Header'
import Home from './components/home/Home'
import DetailView from './components/details/DetailView';
import Cart from './components/cart/Cart';
import CategoryPage from './components/category/CategoryPage';


import { BrowserRouter, Routes, Route } from 'react-router-dom';




const App = () => {

  const { setAccount } = useContext(DataContext);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('userName');

        if (token && userName) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    
                    localStorage.removeItem('token');
                    localStorage.removeItem('userName');
                    setAccount('');
                } else {
                    
                    setAccount(userName);
                    dispatch({
                        type: USER_LOGIN_SUCCESS,
                        payload: { token, name: userName }
                    });
                }
            } catch (error) {
                localStorage.removeItem('token');
                localStorage.removeItem('userName');
                setAccount('');
            }
        }
    }, [setAccount, dispatch]);




  return (
    
      <BrowserRouter>
        <Header/>
        <Box style= {{marginTop:75}}>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/product/:id' element={<DetailView/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/category/:category' element={<CategoryPage/>}/>

            {/*  */}
            <Route path="/success" element={<h2>Payment Successful! </h2>} />
            <Route path="/failure" element={<h2>Payment Failed. Please try again.</h2>} />
          </Routes>
        </Box>
      </BrowserRouter>
    
  )
}

export default App
