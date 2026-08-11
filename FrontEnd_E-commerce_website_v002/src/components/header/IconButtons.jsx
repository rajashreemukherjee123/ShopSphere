
import React, { useState, useContext } from 'react'
import { Badge, Box, IconButton, styled } from '@mui/material';
import { DataContext } from '../../context/DataProvider';
import { useLocation, useNavigate } from 'react-router-dom';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import LoginDialog from '../login/LoginDialog';
import Profile from './Profile';
import { useSelector } from 'react-redux';

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
    const [open, setOpen] = useState(false);
    const { account, setAccount } = useContext(DataContext);
    const { cartItems } = useSelector(state => state.cart);
    const navigate = useNavigate();
    const location = useLocation();
    const isCartActive = location.pathname === '/cart';

    
    const totalCartQty = cartItems?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

    const openDialog = () => setOpen(true);

    const handleCartClick = () => {
        if (account) {
            navigate('/cart');
        } else {
            setOpen(true);
        }
    };

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

            <IconButton size="small">
                <FavoriteBorderIcon fontSize="small" />
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
