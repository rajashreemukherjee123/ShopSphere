import React from 'react'


import {imageURL} from '../constants/data'
import { Grid, styled,Box } from "@mui/material"


const ImageWrapper = styled(Box)`
    display: flex;
    margin-top: 10px;
    width: 100%;
    justify-content: space-between;
    box-sizing: border-box;

    
    flex-direction: column; 
    
    & > img {
        width: 100%;
        height: auto;
        margin-bottom: 10px; 
    }

    
       
    @media (min-width: 960px) {
        flex-direction: row; 
        & > img {
            width: 32.5%; 
            margin-bottom: 0; 
        }
    }
`

const MidSection = () => {
  return (
    
    <ImageWrapper > 
      {
        imageURL.map((image,index) => (
            
                <img src={image} alt='promo' key={index}  />
            
        ))
      }
    </ImageWrapper>
  )
}

export default MidSection
