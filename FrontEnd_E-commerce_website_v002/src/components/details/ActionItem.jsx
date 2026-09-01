
import { Box, Button, styled } from '@mui/material'
import React, { useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import WishlistButton from '../button/WishlistButton';

import { addToCart } from '../../redux/slices/cartSlice';
import useRazorpay from '../../hooks/useRazorpay'; // centralized hook
import { toast } from 'react-toastify';

const LeftContainer = styled(Box)(({ theme }) => ({
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('md')]: { padding: '20px 40px' }
}));

const Image = styled('img')({
    padding: '15px',
    marginBottom: '10px'
});

const StyledButton = styled(Button)(({ theme }) => ({
    width: '48%',
    height: '50px',
    borderRadius: '2px',
    fontSize: '16px',
    fontWeight: 600,
    [theme.breakpoints.down('lg')]: { width: '48%', fontSize: '14px', minWidth: 'unset' },
    [theme.breakpoints.down('md')]: { fontSize: '13px', padding: '6px' },
    [theme.breakpoints.down('sm')]: { width: '100%', marginBottom: '10px', fontSize: '15px' }
}));

const ActionItem = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quantity] = useState(1);
    const { initiatePayment } = useRazorpay(); // use hook

    const addItemToCart = async () => {
        const token = localStorage.getItem("token");
        if(!token){
            toast.info("Please login to add product to your cart");
        }else if(token && product._id ){
            await dispatch(addToCart({productId: product._id, quantity})).unwrap();
            toast.success("Product successfully added from Cart");
        }
        
    };

    // Buy Now - useRazorpay hook use 
    const buyNow = () => {
        initiatePayment({
            amount: product.price.cost,
            productName: product.title.shortTitle,
            onSuccess: (paymentId) => {
                alert(`Payment Successful!  ID: ${paymentId}`);
                navigate('/');
            },
            onFailure: () => {
                console.log("Payment failed or cancelled");
            }
        });
    };

    return (
        <LeftContainer>
            <Box sx={{ padding: '15px 20px', border: '1px solid #f0f0f0', width: '90%', marginBottom: 10, position: 'relative' }}>
                <Image src={product.detailUrl} alt='product' style={{ width: '100%', padding: 0, border: 'none' }} />
                <WishlistButton productId={product._id} sx={{right: 30, top: 30}}/>
            </Box>

            <StyledButton
                variant='contained'
                onClick={addItemToCart}
                
                sx={{ bgcolor: '#8A33FD', '&:hover': { bgcolor: '#7226d4' }, textTransform: 'none' }}
            >
                <ShoppingCartIcon sx={{ mr: 1 }} />
                Add to Cart
            </StyledButton>

            <StyledButton
                variant='contained'
                onClick={buyNow}
                sx={{ marginRight: "4%", bgcolor: '#ff961f', '&:hover': { bgcolor: '#db7806' }, textTransform: 'none' }}
            >
                <FlashOnIcon sx={{ mr: 1 }} />
                Buy Now
            </StyledButton>
        </LeftContainer>
    );
};

export default ActionItem;