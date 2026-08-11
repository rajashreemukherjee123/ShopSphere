
import { Typography, Box, styled, Button } from '@mui/material';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCartDetails } from '../../redux/actions/cartAction';
import { useNavigate } from 'react-router-dom';

import CartItem from './CartItem';
import TotalView from './TotalView';
import useRazorpay from '../../hooks/useRazorpay'; // centralized hook

import * as actionType from '../../redux/constants/cartConstant';

const Container = styled(Box)(({ theme }) => ({
    padding: '30px 135px',
    display: 'flex',
    [theme.breakpoints.down('md')]: { flexDirection: 'column', padding: '15px 0' }
}));

const Header = styled(Box)`
   padding: 15px 24px;
   background: #fff
`;

const LeftComponent = styled(Box)(({ theme }) => ({
    paddingRight: '15px',
    width: '75%',
    [theme.breakpoints.down('md')]: { width: '100%', paddingRight: 0, marginBottom: '20px' }
}));

const RightComponent = styled(Box)(({ theme }) => ({
    width: '25%',
    [theme.breakpoints.down('md')]: { width: '100%' }
}));

const ButtonWrapper = styled(Box)`
  padding: 16px 22px;
  background: #fff;
  box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
  border-top: 1px solid #f0f0f0
`;

const StyledButton = styled(Button)`
  display: flex;
  margin-left: auto;
  background: #fb641b;
  color: #fff;
  width: 250px;
  height: 51px;
  border-radius: 5px
`;

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems, loading } = useSelector(state => state.cart);
    const { initiatePayment } = useRazorpay(); 
    

    useEffect(() => {
        dispatch(getCartDetails());
    }, [dispatch]);

    // Cart total amount calculate 
    const getTotalAmount = () => {
        return cartItems.reduce((total, item) => {
            if (item.productId && item.productId.price) {
                return total + (item.productId.price.cost * item.quantity);
            }
            return total;
        }, 0) + 40; // delivery charge
    };

    // handlePlaceOrder function update
    const handlePlaceOrder = () => {
        initiatePayment({
            amount: getTotalAmount(),
            productName: `Cart Order (${cartItems.filter(i => i.productId).length} items)`,
            onSuccess: (paymentId) => {
                // Redux state cart clear
                dispatch({ type: actionType.CART_CLEAR });
                alert(`Order Placed Successfully! 🎉`);
                navigate('/');
            },
            onFailure: () => {
                console.log("Payment failed");
            }
        });
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>Loading...</Box>;
    }

    return (
        <>
            {cartItems && cartItems.length > 0 ?
                <Container>
                    <LeftComponent>
                        <Header>
                            <Typography>My Cart ({cartItems.filter(i => i.productId).length})</Typography>
                        </Header>
                        {cartItems.map(item => (
                            <CartItem key={item._id} item={item} />
                        ))}
                        <ButtonWrapper>
                            {/* onClick add */}
                            <StyledButton onClick={handlePlaceOrder}>Place Order</StyledButton>
                        </ButtonWrapper>
                    </LeftComponent>

                    <RightComponent>
                        <TotalView cartItems={cartItems} />
                    </RightComponent>
                </Container>

                : // EMPTY CART
                <Box sx={{ width: '80%', height: '65vh', background: '#fff', margin: '80px auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="empty" style={{ width: '15%' }} />
                    <Typography sx={{ marginTop: '20px', fontSize: 18, fontWeight: 600 }}>Your cart is empty!</Typography>
                    <Typography sx={{ fontSize: 12 }}>Add items to it now.</Typography>
                    <Button variant="contained" sx={{ marginTop: '20px', background: '#2874f0', textTransform: 'none', borderRadius: 2, padding: '12px 70px' }} onClick={() => navigate('/')}>
                        Shop Now
                    </Button>
                </Box>
            }
        </>
    );
};

export default Cart;