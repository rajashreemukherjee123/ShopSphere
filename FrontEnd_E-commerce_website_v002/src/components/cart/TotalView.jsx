
import { Typography, Box, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    border-bottom: 4px solid #f0f0f0
`;

const Heading = styled(Typography)`
    color: #878787;
`;

const Container = styled(Box)`
    padding: 24px;
    background: #fff;
    & > p {
        margin-bottom: 20px;
        font-size: 14px
    }
    & > h6 {
        margin-bottom: 20px;
    }
`;

const Price = styled(Box)`
    float: right;
`;

const Discount = styled(Typography)`
    color: green;
    font-weight: 500;
`;

const TotalView = ({ cartItems }) => {
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    //re-calculate
    useEffect(() => {
        totalAmount();
    }, [cartItems]);

    const totalAmount = () => {
        let totalPrice = 0, totalDiscount = 0;
        cartItems.forEach(item => {
            if (item.productId && item.productId.price) {
                totalPrice += item.productId.price.mrp * item.quantity;
                totalDiscount += (item.productId.price.mrp - item.productId.price.cost) * item.quantity;
            }
        });
        setPrice(totalPrice);
        setDiscount(totalDiscount);
    };

    
    const totalQty = cartItems?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

    return (
        <Box>
            <Header>
                <Heading>PRICE DETAILS</Heading>
            </Header>
            <Container>
                
                <Typography>Price ({totalQty} item{totalQty !== 1 ? 's' : ''})
                    <Price component="span">₹{price}</Price>
                </Typography>
                <Typography>Discount
                    <Price component="span">-₹{discount}</Price>
                </Typography>
                <Typography>Delivery Charges
                    <Price component="span">₹40</Price>
                </Typography>
                <Typography variant='h6'>Total Amount
                    <Price component="span">₹{price - discount + 40}</Price>
                </Typography>
                <Discount>You will save ₹{discount - 40} on this order</Discount>
            </Container>
        </Box>
    );
};

export default TotalView;
