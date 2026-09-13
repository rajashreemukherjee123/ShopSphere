import React, {useState} from 'react'
import { ButtonGroup, Button, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { updateCartQuantity } from '../../redux/slices/cartSlice'

const Component = styled(ButtonGroup)`
    margin-top: 30px;
`

const StyledButton = styled(Button)`
    border-radius: 50%;
`;

const GroupButton = ({ item }) => {

    const dispatch = useDispatch();

    const {updating} = useSelector((state)=> state.cart);

    const handleIncrement = async() => {
        const newQty = item.quantity + 1;

        try{

            await dispatch(updateCartQuantity({productId:item.productId._id, 
                                                quantity:newQty})).unwrap();
        
        }catch(err){
            console.log(err);
        }
        
        
    };

    const handleDecrement = async() => {
        if (item.quantity > 1) {
            const newQty = item.quantity - 1;

            try{

                await dispatch(updateCartQuantity({productId:item.productId._id, 
                                                    quantity:newQty})).unwrap();

            }catch(err){
                console.log(err);
            }
        }
    };

    return (
        <Component>
            <StyledButton 
                onClick={(e)=>{
                    e.stopPropagation();
                    handleDecrement();
                }} 
                disabled={item.quantity <= 1 || updating}
            >-
            </StyledButton>
            
            <Button disabled style={{ color: '#000' }}>{item.quantity}</Button>
            
            <StyledButton 
                onClick={(e)=>{
                    e.stopPropagation();
                    handleIncrement()
                }}
                disabled={updating}
            >+
            </StyledButton>
        </Component>
    );
};

export default GroupButton;
