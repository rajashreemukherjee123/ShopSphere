import React from 'react'
import { Typography, Box, styled, Button } from '@mui/material'

import { addEllipsis } from '../../utils/common-utils'

import  ButtonGroup from './ButtonGroup';

import { removeFromCartAction } from '../../redux/actions/cartAction';
import { useDispatch } from 'react-redux';

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
    if (!item.productId) return null;

    const product = item.productId; 

    if (!product) return null; // Safety check

    const dispatch = useDispatch();

    const removeItemFromCart = (id) =>{
        console.log("Removing product with ID:", id);
        dispatch(removeFromCartAction(id));
    }

  return (
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
            <Remove onClick={()=>removeItemFromCart(item.productId._id)}>Remove</Remove>
      </Box>
    </Component>
  )
}

export default CartItem
