import React, { useState } from 'react'
import { Typography, Box, styled, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';


import { addEllipsis } from '../../utils/common-utils'

import  ButtonGroup from './ButtonGroup';

import { removeFromCart } from '../../redux/slices/cartSlice';
import {addToWishList} from "../../redux/slices/wishListSlice";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Component = styled(Box)`
    border-top: 4px solid #f0f0f0;
    display: flex;
    background:#fff
`

const LeftComponent = styled(Box)`
    margin: 20px;
    display: flex;
    flex-direction: column
`
const SmallText = styled(Typography)`
    color: #878787;
    font-size: 14px;
    margin-top: 10px
`
const Remove = styled(Button)`
    margin-top: 20px;
    font-size: 16px;
    font-weight: 600;
    color: #8A33FD
`


const CartItem = ({item}) => {

    const dispatch = useDispatch();

    const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
    
    if (!item?.productId){
        return null;
    } 

    const product = item.productId; 

    

    // Open Dialog
    const handleRemoveClick = ()=>{
        setOpenRemoveDialog(true);
    }

    // Close Dialog
    const handleCloseDialog = ()=>{
        setOpenRemoveDialog(false);
    }

    

    
    // Remove Dialog
    const removeItemFromCart = async() =>{
        try{
            await dispatch(removeFromCart(product._id)).unwrap();

            setOpenRemoveDialog(false);

            toast.info("Product removed from cart");

        }catch(err){
            toast.error("Unable to remove product from cart");
        }
    }


    // Move product to wishlist
    const moveToWishlist = async()=>{
        try{
            await dispatch(addToWishList(product._id)).unwrap();

            await dispatch(removeFromCart(product._id)).unwrap();
        
            setOpenRemoveDialog(false);

            toast.success("Product moved to wishlist ❤️");
        
        }catch(err){
            toast.error("Unable to move product to wishlist");
        }
    }

  return (
<>
    
    <Component>
      <LeftComponent>
            <img src={product.url} alt="product" style={{ height: 110, width: 110, objectFit: 'contain' }}/>
            <ButtonGroup item={item} />
      </LeftComponent>
      <Box style={{margin: "20px"}}>
            <Typography sx={{fontSize: "14px"}}>{addEllipsis(product.title.longTitle)}</Typography>
            <SmallText>Seller: RetailNet</SmallText>
            <Typography style={{ margin: '20px, 0'}}>
                        <Box component="span" style={{ fontWeight: 600, fontSize: 18}}>₹{product.price.cost}</Box>&nbsp;&nbsp;&nbsp;
                        <Box component="span" style={{ color: "#878787" }}><strike>₹{product.price.mrp}</strike></Box>&nbsp;&nbsp;&nbsp;
                        <Box component="span" style={{ color: "#388E3C" }}>{product.price.discount} off</Box>
            </Typography>
            <Remove onClick={handleRemoveClick}>Remove</Remove>
      </Box>
    </Component>


    {/* ------------------ Remove Confirmation Dialog ------------ */}
    <Dialog 
        open={openRemoveDialog}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
    >
         <DialogTitle sx={{fontWeight: 600}}>
            Move item to wishlist?
         </DialogTitle>


         <DialogContent>
            <Typography color='text.secondary'>
                Find it easily and buy when you're ready 
                
        or, 
        remove it completely from your cart 
            </Typography>
         </DialogContent>


         <DialogActions>
            {/* Move to Wishlist */}
            <Button variant='outlined'
                onClick={moveToWishlist}
                sx={{
                    textTransform: "none",
                    borderColor: "#512886",
                    color: "#512886",

                    "&:hover": {
                        borderColor: "#85399c",
                        backgroundColor:
                            "rgba(109, 70, 161, 0.04)"
                    }
                }} 
            >
                Move to Wishlist
            </Button>

                {/* Remove */}
            <Button variant='contained'
                color='error'
                onClick={removeItemFromCart}
                sx={{ textTransform: "none" }}
            >
                Remove item
            </Button>

                {/* Cancle */}
            <Button onClick={handleCloseDialog}
                sx={{ textTransform: "none" }}
            >
                Cancel
            </Button>
         </DialogActions>
    </Dialog>
    
</>
  )
}

export default CartItem
