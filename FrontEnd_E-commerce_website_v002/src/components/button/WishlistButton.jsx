import React, { useState } from 'react'
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList, removeWishList } from '../../redux/actions/wishListAction';
import { toast } from 'react-toastify';


const WishlistButton = ({productId, sx }) => {

    const dispatch = useDispatch();

      const { wishList, loading } = useSelector(
        (state)=> state.wishList
      )
    
      const isWishListed = wishList?.items?.some((item)=>{
          const itemPid =  item?.productId?._id ?? item?.productId;
          return itemPid?.toString() === productId?.toString();
        });
    
      const handleWishlist = async(e) => {
        e.stopPropagation();
        const token = localStorage.getItem("token");

        if(!token){
          toast.info("Please login to add product to your wishlist");
          return;
        }

        if(loading){
          return;
        }
    
        if(isWishListed){
          await dispatch(removeWishList(productId));
          
          toast.info(
            "Product removed from wishlist"
          );

        }else{
          await dispatch(addToWishList(productId));
          toast.success(
            "Product added from wishlist ❤️"
          )
          
        }
        
      };


      
    
    //   useEffect(()=>{
    //     dispatch(getWishlist());
    //   }, [dispatch]);
  return (
    <>
      <IconButton onClick={handleWishlist} sx={{
        position: "absolute",
        top: 10,
        right: 10,

        width: 35,
        height: 35,
        backgroundColor: "rgba(255, 255, 255, 0.45)",
        transition: "all 0.25s ease",

        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          transform: "scale(1.12)"
        },

        ...sx
        
        }}>

            {
                isWishListed ? (
                    <FavoriteIcon sx={{ color: "red" }}/>
                ):(
                    <FavoriteBorderIcon/>
                )
            }

      
      </IconButton>
    </>
    


    
  )
}

export default WishlistButton
