import React, {useEffect} from 'react';
import { Box,Card,CardMedia,CardContent,Typography,Button } from '@mui/material'; 
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import {getWishlist} from "../../redux/actions/wishListAction";


const WishListPage = () => {

  const dispatch = useDispatch();
  const { wishList,loading, error } = useSelector((state)=> state.wishList)

  useEffect(()=>{
    dispatch(getWishlist());
  },[dispatch]);

  return (
    <Box sx={{
      display:"grid",
      gridTemplateColumns:{
        xs: "1fr 1fr",
        md: "1fr 1fr 1fr",
        lg: "1fr 1fr 1fr 1fr"
      }
    }}>

      {loading && <Typography>Loading...</Typography>}

      {error && <Typography sx={{color:"error"}}>{error}</Typography>}

      {!loading && wishList?.items?.map((item)=>{
        return (
          <Card sx={{
            display: 'flex',
            flexDirection: "column",
            borderRadius: 2
          }}>

            <CardMedia component="img" image={item.productId?.url} alt={item.productId?.title?.shortTitle} sx={{
              height: "200px",
              width: '100%',
              objectFit: "cover",
              backgroundColor: "#fff"
            }} />

          </Card>
        )
      })}

    </Box>
  )
}

export default WishListPage
