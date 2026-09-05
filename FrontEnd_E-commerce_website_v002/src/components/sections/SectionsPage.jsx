import React,{useEffect} from 'react'
import { Box,Card,CardMedia,CardContent,Typography,Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useParams,  useNavigate } from 'react-router-dom';
import {getProductSection} from '../../redux/slices/productSlice'
import {addToCart} from '../../redux/slices/cartSlice';
import WishlistButton from '../button/WishlistButton';
import { toast } from "react-toastify";
import ProductCardSkeleton from "../loading/ProductCardSkeleton";


const SectionsPage = () => {
    const {section} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {section:sectionData, sectionLoading, sectionError} = useSelector(
        (state)=> state.productsData
    );
    const products = sectionData[section] || [];

    useEffect(()=>{
      if(section){
        dispatch(getProductSection(section))
      }
      
    },[dispatch,section])


    // ---------- Add to cart button ----------
    const handleAddtoCart = (e,productId)=>{
      e.stopPropagation();
      const token = localStorage.getItem("token");
      if(!token){
        toast.info("Please login to add product to your cart")
      }else{
        dispatch(addToCart({productId, quantity: 1}));
        toast.success("Product successfully added from Cart");
      }
    }

  return (
    <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr 1fr",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)"
            },
            gap: 3,
            padding: 3
          }}
        >
    
          {/* {sectionLoading && <Typography>Loading...</Typography>} */}
    
          {sectionError && (
            <Typography color="error">
              {sectionError}
            </Typography>
          )}
    
          {sectionLoading ? 
            Array.from({ length: 8 }).map((_, index)=>(
              <ProductCardSkeleton key={index}/>
            ))

            : products.map((item)=>{
              return (
                <Card key={item._id}
                  onClick={()=> navigate(`/product/${item.id}`)}
                  sx={{
                    position: "relative",
                    height: "100%",
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRedius: 2,
                    transition: "0.3s",
    
                    "&:hover": {
                      boxShadow: 6,
                      transform: "translateY(-4px)"
                    }
                }}>
                  <WishlistButton productId={item._id}/>


                  <CardMedia component="img" image={item.url} alt={item.title?.shortTitle} sx={{
                    height: "200px",
                    width: '100%',
                    objectFit: "cover",
                    backgroundColor: "#fff"
                    // padding: 1
                  }} />

                  
    
    
                  <CardContent sx={{ 
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column"
                  }}>
                    <Typography variant='h6' sx={{
                      fontSize: 16,
                      fontWeight: "bold"
                    }}>
                      {item.title?.shortTitle}
                    </Typography >
                    
                    <Typography variant='body2' color='text.secondary' sx={{
                      marginTop: 1
                    }}>
                      {item.title?.longTitle}
                    </Typography >
    
                    <Typography sx={{
                      marginTop: 1,
                      fontSize: "18px",
                      fontWeight: "bold"
                    }}>
                      ₹{item.price?.cost}
                    </Typography>
    
                    <Typography sx={{
                      fontSize: "14px",
                      color: "gray",
                      textDecoration: "line-through"
                    }}>
                      ₹{item.price?.mrp}
                    </Typography>
    
                    <Typography sx={{
                      fontSize: "14px",
                      color: "green",
                      fontWeight: "bold"
                    }}>
                      ₹{item.price?.discount}
                    </Typography>
    
                    <Button
                      variant='contained'
                      fullWidth
                      sx={{
                        marginTop: "auto",
                        backgroundColor:"#512886",
                        "&:hover": {
                              backgroundColor: "#85399c",
                              boxShadow: 2
                      }}}
                      onClick={(e)=> handleAddtoCart(e, item._id)}
                    >
                      Add to Cart
                    </Button>
    
                  </CardContent>
                  
                </Card>
              )
            })
          }
          
        </Box>
  )
}

export default SectionsPage
