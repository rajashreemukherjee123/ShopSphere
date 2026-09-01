import React, { useEffect } from 'react'
import Banner from './Banner' 
import Slide from './Slide';
import MidSlide from './MidSlide';
import MidSection from './MidSection';


import {Box, styled} from '@mui/material'


import { getProducts} from '../../redux/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';




const Home = () => {

  const {products} = useSelector(state => state.productsData)
  
  console.log(products);


  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getProducts());
  },[dispatch]);

  return (
    <>
    
      <Banner/>
      {/* { !loading && products && products.length > 0 && <MidSlide 
                                                          title="Deal of the Day"
                                                          section="Deal-of-the-day" 
                                                          timer={true}
                                                       /> 
      } */}
      <MidSlide 
                                                          title="Deal of the Day"
                                                          section="deal-of-the-day" 
                                                          timer={true}
                                                       /> 
    
      <MidSection/>
       <Slide 
                                                          title="Trending Offers"
                                                          section="Trending-Offers" 
                                                          timer={false}
                                                        /> 
      

      <Slide 
                                                          title="Top Selection" 
                                                          section="Top Selection"
                                                          timer={false}
                                                        /> 
     

      
      
      
       <Slide  
                                                          title="Top's Deals on Accessories"
                                                          section="Top-Deals-On-Accessories" 
                                                          timer={false}
                                                        /> 
      
       <Slide 
                                                          title="Discounts for You" 
                                                          section="Discounts-for-you"
                                                          timer={false} 
                                                        /> 
      
      <Slide 
                                                          title="Recommended Items"
                                                          section="Recommended-items" 
                                                          timer={false}
                                                        /> 
       
       <Slide 
                                                          title="Suggested for You" 
                                                          section="Suggesting-items"
                                                          timer={false}/> 
      
      
       <Slide  
                                                          title="Season's top picks" 
                                                          section="Season's-top-picks"
                                                          timer={false}/> 
      
      

    </>
  )
}

export default Home
