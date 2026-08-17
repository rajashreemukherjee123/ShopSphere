
import React, { useState, useContext, useEffect } from 'react'
import { Badge, Box, IconButton, styled } from '@mui/material';
import { DataContext } from '../../context/DataProvider';
import { useLocation, useNavigate } from 'react-router-dom';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import LoginDialog from '../login/LoginDialog';
import Profile from './Profile';
import { useSelector, useDispatch } from 'react-redux';

import WishList from '../wishlist/WishListPage';
import { getWishlist } from '../../redux/actions/wishListAction';
import { getCartDetails } from '../../redux/actions/cartAction';

const IconContainer = styled(Box)(({ theme, mobileIconView }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '& .MuiIconButton-root': {
        backgroundColor: '#F6F6F6',
        borderRadius: '8px',
        color: 'inherit',
        height: '36px',
        width: '36px',
        padding: '0px',
        transition: 'background 0.3s ease',
    },
    '& .MuiIconButton-root:hover': {
        background: '#EDEDED',
    },
    [theme.breakpoints.down('md')]: {
        display: mobileIconView ? 'flex' : 'none',
        flexDirection: mobileIconView ? 'flex' : 'row',
        alignItems: 'flex-start',
        gap: '15px'
    },
}));

const IconButtons = ({ mobileIconView }) => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { account, setAccount } = useContext(DataContext);
    const { cartItems } = useSelector(state => state.cart);
    const navigate = useNavigate();
    const location = useLocation();
    const isCartActive = location.pathname === '/cart';

    // cart count
    const totalCartQty = cartItems?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

    const openDialog = () => setOpen(true);

    const handleCartClick = () => {
        if (account) {
            navigate('/cart');
        } else {
            setOpen(true);
        }
    };



    // wishlist
    const {wishList} = useSelector((state)=> state.wishList);
    const wishListCount = wishList?.items?.length || 0;

    useEffect(()=>{
        if(account){
            dispatch(getCartDetails())
            dispatch(getWishlist())
        }
    },[account,dispatch])


    return (
        <IconContainer mobileIconView={mobileIconView}>
            {account ? (
                <Profile account={account} setAccount={setAccount} />
            ) : (
                <IconButton
                    onClick={openDialog}
                    sx={{
                        color: isCartActive ? '#8A33FD' : 'inherit',
                        backgroundColor: isCartActive ? '#f0e6ff' : '#F6F6F6',
                        '&:hover': {
                            backgroundColor: isCartActive ? '#e5d5ff' : '#EDEDED'
                        }
                    }}
                >
                    <PermIdentityIcon />
                </IconButton>
            )}




            <IconButton size="small" onClick={()=> navigate("/wishlist")}>
                <Badge badgeContent={wishListCount} color='error'>
                    <FavoriteBorderIcon  fontSize="small" />
                </Badge>
                
            </IconButton>




            <IconButton onClick={handleCartClick}>
                
                <Badge badgeContent={totalCartQty} color='secondary'>
                    <ShoppingCartOutlinedIcon />
                </Badge>
            </IconButton>

            <LoginDialog open={open} setOpen={setOpen} />
        </IconContainer>
    );
};

export default IconButtons;
