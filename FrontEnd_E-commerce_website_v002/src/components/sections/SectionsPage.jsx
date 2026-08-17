import React,{useEffect} from 'react'
import { Box,Card,CardMedia,CardContent,Typography,Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useParams,  useNavigate } from 'react-router-dom';
import {getProductSection} from '../../redux/actions/productAction'
import {addToCartAction} from '../../redux/actions/cartAction'
import WishlistButton from '../button/WishlistButton';


const SectionsPage = () => {
    const {section} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {section:sectionData, loading, error} = useSelector(
        (state)=> state.getProductSection
    );
    const products = sectionData[section] || []

    useEffect(()=>{
      if(section){
        dispatch(getProductSection(section))
      }
      
    },[dispatch,section])

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
    
          {loading && <Typography>Loading...</Typography>}
    
          {error && (
            <Typography color="error">
              {error}
            </Typography>
          )}
    
          {
            !loading && products.map((item)=>{
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
                        marginTop: "auto"
                      }}
                      onClick={(e)=> {
                        e.stopPropagation();
                        dispatch(addToCartAction(item._id, 1))
                      }}
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
