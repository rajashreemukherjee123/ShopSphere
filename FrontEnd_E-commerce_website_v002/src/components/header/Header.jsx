import React, { useState } from 'react'

import { AppBar, Toolbar,IconButton, Box, Drawer, List,Divider, ListItem, styled } from '@mui/material';
import OneStop_Logo from '../../assets/OneStop_Logo.png';


//conponents
import CastomButtons from './CastomButtons';
import Search from './Search';
import IconButtons from './IconButtons';

import MenuIcon from '@mui/icons-material/Menu';


const StyledHeader = styled(AppBar)`
    background: #fdfbfb;
    color: #807D7E;
    // height: 180px;
    // justify-content: center;
`
const Coponent = styled(Box)`
    margin-left: 2%;
`
const MenuButton = styled(IconButton)(({ theme }) => ({
    display: "none",
    [theme.breakpoints.down('md')]:{
        display: 'block',
    }
}))



const Header = () => {

    const [open,setOpen] = useState(false); //for Drawer open & close

    //Drawer open 
    const handleOpen = ()=>{
        setOpen(true);
    };
    //Drawer close 
    const handleClose = ()=>{
        setOpen(false);
    };

    const list = ()=>(
        <Box style={{width: 200 }}>
            <List>
                <ListItem button sx={{ justifyContent: 'center', mb: 2}}>
                    <Box sx={{ display:'flex', gap: 2}}>
                        <IconButtons mobileIconView={true}/>
                    </Box>
                </ListItem> 

                <Divider />

                <ListItem sx={{ mt: 2 }}>   
                    <CastomButtons mobileView={true}/>
                    
                </ListItem>
            </List>
        </Box>
    )



  return (
    
      <StyledHeader>
        
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3,minHeight: '64px !important' }}>
            
            <MenuButton color='inherit' onClick={handleOpen}>
                <MenuIcon/>
            </MenuButton>

            <Drawer open={open} onClose={handleClose} >
                {list()}
            </Drawer>

             {/* Logo */}
            <Coponent sx={{ flexShrink: 0 }}>
                <img src={OneStop_Logo} alt="OneStop Logo" style={{ height: '50px', width: 'auto' }} />
                
            </Coponent>
            
            {/* Nav Buttons */}
            <CastomButtons mobileView={false} />

            {/* Search  */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pr: 4 }}>
                <Search/>
                {/* Icons */}
                <IconButtons mobileIconView={false}/>
            </Box>
            
        </Toolbar>
      </StyledHeader>
      
    
  )
}

export default Header
