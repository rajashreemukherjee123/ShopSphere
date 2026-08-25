import React from 'react'

import {Box, Button, Typography} from '@mui/material'
import {styled} from '@mui/material/styles'

import { NavLink } from 'react-router-dom'



const ButtonCastom = styled(Box)(({ theme, mobileView }) => ({
    display: 'flex',
    gap: '32px',
    alignItems: 'center',

    
    '& > p': { 
        cursor: 'pointer', 
        fontWeight: '500',
        fontSize: '14px', 
        whiteSpace: 'nowrap',
        transition: 'all 0.2s ease-in-out',
    },

    '& > p:hover': {
        color: '#8f72f7', 
    },

    // Responsive Design
    
    [theme.breakpoints.down('md')]: {
        display: mobileView ?'flex':'none',
        flexDirection: mobileView ? 'column':'row',
        alignItems: 'flex-start',
        gap: '15px'
    },
}));



const CastomButtons = ({ mobileView}) => {

    


  return (
    <ButtonCastom mobileView={mobileView}>

{/* Home */}        
        <NavLink to='/' style={({ isActive }) => ({
          color: isActive ? '#124dee' : 'inherit', 
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: 'none',
          marginRight: '20px'

        })} >
            <Typography>Home</Typography>
        </NavLink>

{/* fashion */}
        <NavLink to='/category/fashion'  style={({ isActive }) => ({
          color: isActive ? '#124dee' : 'inherit', 
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: 'none',
          marginRight: '20px',
        })} >
            <Typography>Fashion</Typography>
        </NavLink>

{/* mobile */}
        <NavLink to='/category/mobile' style={({ isActive }) => ({
          color: isActive ? '#124dee' : 'inherit', 
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: 'none',
          marginRight: '20px'
        })}>
            <Typography>Mobile</Typography>
        </NavLink>

{/* Electronic */}
        <NavLink to='/category/electronics' style={({ isActive }) => ({
          color: isActive ? '#124dee' : 'inherit', 
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: 'none',
          marginRight: '20px'
        })}>
            <Typography>Electronic</Typography>
        </NavLink>

{/* Appliances */}
        <NavLink to='/category/appliance' style={({ isActive }) => ({
          color: isActive ? '#124dee' : 'inherit', 
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: 'none',
          marginRight: '20px'
        })}>
            <Typography>Appliances</Typography>
        </NavLink>
        

{/* Beauty */}
        <NavLink to='/category/beauty' style={({ isActive }) => ({
          color: isActive ? '#124dee' : 'inherit', 
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: 'none',
          marginRight: '20px'
        })}>
            <Typography>Beauty</Typography>
        </NavLink>
        
    
    </ButtonCastom>
  )
}

export default CastomButtons
