
import React, { useState, useEffect } from 'react';
import { bannerData } from '../constants/data';
import { Box, styled, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const BannerContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '100vw', 
    overflow: 'hidden', 
    position: 'relative',
    height: '280px',
    
    [theme.breakpoints.up('sm')]: {
        height: '350px',
    },
    [theme.breakpoints.down('sm')]: {
        height: '180px',
    },
    
    
    '@media (max-height: 600px)': {
        height: '220px'
    }
}));

const BannerImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block' 
});

const ArrowButton = styled(IconButton)(({ theme, position }) => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    [position]: '5px', 
    color: "#fff",
    zIndex: 2, 
    backgroundColor: 'rgba(0,0,0,0.15)',
    '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '4px',
        '& svg': {
            fontSize: '1rem'
        }
    }
}));

const DotContainer = styled(Box)({
    textAlign: 'center',
    position: 'absolute',
    bottom: '8px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: '6px',
    zIndex: 2
});

const Dot = styled(Box)(({ active }) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: active ? '#fff' : 'rgba(255,255,255,0.4)',
    cursor: 'pointer',
    transition: '0.2s'
}));

const Banner = () => {
    const [current, setCurrent] = useState(0);

    // Auto scroll 
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % bannerData.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [current]);

    const prevSlide = () => setCurrent(prev => (prev === 0 ? bannerData.length - 1 : prev - 1));
    const nextSlide = () => setCurrent(prev => (prev + 1) % bannerData.length);

    return (
        <BannerContainer>
            <BannerImage src={bannerData[current].url} alt="banner" />

            <ArrowButton position="left" onClick={prevSlide}>
                <ArrowBackIosNewIcon />
            </ArrowButton>

            <ArrowButton position="right" onClick={nextSlide}>
                <ArrowForwardIosIcon />
            </ArrowButton>

            <DotContainer>
                {bannerData.map((_, i) => (
                    <Dot key={i} active={i === current} onClick={() => setCurrent(i)} />
                ))}
            </DotContainer>
        </BannerContainer>
    );
};

export default Banner;