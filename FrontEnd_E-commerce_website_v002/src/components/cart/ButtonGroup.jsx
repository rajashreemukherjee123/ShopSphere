import React from 'react'
import { ButtonGroup, Button, styled } from '@mui/material'
import { useDispatch } from 'react-redux';
import { updateCartQtyAction } from '../../redux/actions/cartAction'

const Component = styled(ButtonGroup)`
    margin-top: 30px;
`

const StyledButton = styled(Button)`
    border-radius: 50%;
`;

const GroupButton = ({ item }) => {
    const dispatch = useDispatch();

    const handleIncrement = () => {
        const newQty = item.quantity + 1;
        
        dispatch(updateCartQtyAction(item.productId._id, newQty));
    };

    const handleDecrement = () => {
        if (item.quantity > 1) {
            const newQty = item.quantity - 1;
            dispatch(updateCartQtyAction(item.productId._id, newQty));
        }
    };

    return (
        <Component>
            <StyledButton onClick={handleDecrement} disabled={item.quantity <= 1}>-</StyledButton>
            
            <Button disabled style={{ color: '#000' }}>{item.quantity}</Button>
            <StyledButton onClick={handleIncrement}>+</StyledButton>
        </Component>
    );
};

export default GroupButton;
