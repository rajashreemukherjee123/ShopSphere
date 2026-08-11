import React from 'react'
import { Typography, Box, styled, Table, TableBody, TableRow, TableCell } from '@mui/material'

import LocalOfferIcon from '@mui/icons-material/LocalOffer';



const SmallText = styled(Box)`
    font-size: 14px;
    vertical-align: baseline;
    & > p {
        font-size: 14px;
        margin-top: 10px;
    }
`;

const StyledBadge = styled(LocalOfferIcon)`
    margin-right: 10px;
    color: #00CC00;
    font-size: 15px
`;
//////
const StyledTable = styled(Table)`
    margin-top: 20px;
    width: 100%;
    
    table-layout: fixed; 
`;


const ColumnText = styled(TableRow)`
    
    font-size: 14px;
    vertical-align: baseline;
    & > td {
        font-size: 14px;
        margin-top: 10px;
        border: none;
    }
`


//////
const DescriptionCell = styled(TableCell)`
    word-break: break-word;
    white-space: normal;
    overflow-wrap: break-word;
    line-height: 22px;
    max-width: 0;        
    width: auto;
`;
const LabelCell = styled(TableCell)`
    color: #878787;
    width: 120px;        
    vertical-align: top;
`;



const ProductDetail = ({ product }) => {

    const date = new Date(new Date().getTime()+(5 * 24 * 60 * 60 * 1000));

  return (
    <>
        <Typography>{product.title.longTitle}</Typography>
        <Typography style={{marginTop: 5, color: "#878787", fontSize: 14 }}>8 Ratings & 1 Reviews</Typography>
        <Typography>
            <Box component="span" style={{ fontSize: 28}}>₹{product.price.cost}</Box>&nbsp;&nbsp;&nbsp;
            <Box component="span" style={{ color: "#878787" }}><strike>₹{product.price.mrp}</strike></Box>&nbsp;&nbsp;&nbsp;
            <Box component="span" style={{ color: "#388E3C" }}>{product.price.discount} off</Box>
        </Typography>
        <Typography>Available offers</Typography>
        <SmallText>
            <Typography><StyledBadge/>Get extra 20% off upto ₹50 on 1 item(s) T&C</Typography>
            <Typography><StyledBadge/>Get extra 13% off (price inclusive of discount) T&C</Typography>
            <Typography><StyledBadge/>Sign up for One Stop Pay later and get One Stop Gift Card worth ₹100* Know More</Typography>
            <Typography><StyledBadge/>Buy 2 items save 5%; Buy 3 or more save 100% T&C</Typography>
            <Typography><StyledBadge/>5% Cashback on Axis Bank Card</Typography>
            <Typography><StyledBadge/>No Cost EMI on Bajaj Finserv EMI Card on cart value above ₹2999 T&C</Typography>
        </SmallText>

        <StyledTable>
            <TableBody>
                <ColumnText>
                    <LabelCell style={{ color: '#878787' }}>Delivery</LabelCell>
                    <TableCell style={{ fontWeight: "550", border: 'none' }}>Delivery by {date.toDateString()} | ₹40</TableCell>
                </ColumnText>
                <ColumnText>
                    <LabelCell style={{ color: '#878787' }}>Warranty</LabelCell>
                    <TableCell style={{ border: 'none' }}>No Warranty </TableCell>
                </ColumnText>
                <ColumnText>
                    <LabelCell style={{ color: '#878787' }}>Seller</LabelCell>
                    <TableCell style={{ border: 'none' }}>
                        <Box component="span" style={{ color: '#2874f0' }}>SuperComNet</Box>
                        <Typography>GST invoice available</Typography>
                        <Typography>View more sellers starting from ₹{product.price.cost}</Typography>
                    </TableCell>
                </ColumnText>
                <ColumnText>
                    <LabelCell style={{color: '#878787',verticalAlign: 'top', paddingTop: '16px'  }}>Description</LabelCell>
                    <DescriptionCell style={{ 
                            wordBreak: 'break-word',
                            whiteSpace: 'normal',
                            lineHeight: '20px',
                            width: '80%'        
                        }}>{product.description}</DescriptionCell>
                </ColumnText>
            </TableBody>
        </StyledTable>
    </>
  )
}

export default ProductDetail
