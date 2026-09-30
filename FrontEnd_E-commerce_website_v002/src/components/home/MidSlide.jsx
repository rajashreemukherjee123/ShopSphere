import { Box, styled } from '@mui/material'
import React from 'react'
import Slide from './Slide'
import furnitureBanner1 from '../../assets/furnture_banner1.jpg'


const Component = styled(Box)`
    display: flex;
`;

const LeftComponent = styled(Box)(({ theme }) => ({
 width: '83%',
 [theme.breakpoints.down("md")]:{
        width: '100%'
    }
}));

const RightComponent = styled(Box)(({ theme })=> ({
    background: '#FFFFFF',
    padding: 5,
    marginTop: 10,
    marginLeft: 10,
    width: '17%',
    textAlign: "center",
    [theme.breakpoints.down('md')]:{
        display: 'none'
    }
}));

const MidSlide = ({title, section, timer}) => {
    
  return (
    <Component>
        <LeftComponent>
            <Slide title={title} section={section} timer={timer}/>
        </LeftComponent>
        
        <RightComponent>
            <img src={furnitureBanner1} alt='ad' style={{width: 217}} />
        </RightComponent>
    </Component>
  )
}

export default MidSlide
