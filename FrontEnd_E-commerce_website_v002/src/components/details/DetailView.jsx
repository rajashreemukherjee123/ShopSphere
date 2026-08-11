
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../redux/actions/productAction';
import { Box, styled } from '@mui/material'

import ActionItem from './ActionItem';
import ProductDetail from './ProductDetail';

const Component = styled(Box)`
    background: #f2f2f2;
    margin-top: 55px;
    padding: 20px;
`;

const Container = styled(Box)`
    display: flex;
    background: #fff;

    @media (max-width: 900px) {
        flex-direction: column;
    }
`;

const LeftComponent = styled(Box)`
    width: 35%;
    padding: 15px;

    @media (max-width: 900px) {
        width: 100%;
    }
`;

const RightComponent = styled(Box)`
    width: 65%;
    margin-top: 50px;
    padding: 0 20px;
    box-sizing: border-box;

    @media (max-width: 900px) {
        width: 100%;
        margin-top: 20px;
        padding: 10px;
    }
`;

const DetailView = () => {

    const dispatch = useDispatch();
    const { id } = useParams();

    const { loading, product } = useSelector(
        state => state.getProductDetails
    );

    useEffect(() => {
        if (product && id !== product.id)
            dispatch(getProductDetails(id));

    }, [dispatch, id, product, loading]);

    return (
        <Component>

            {
                product && Object.keys(product).length > 0 &&

                <Container>

                    <LeftComponent>
                        <ActionItem product={product} />
                    </LeftComponent>

                    <RightComponent>
                        <ProductDetail product={product} />
                    </RightComponent>

                </Container>
            }

        </Component>
    )
}

export default DetailView