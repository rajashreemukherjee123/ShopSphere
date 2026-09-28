import React, { useState } from 'react'

import { AppBar, Toolbar,IconButton, Box, Drawer, List,Divider, ListItem,  styled } from '@mui/material';
import OneStop_Logo from '../../assets/OneStop_Logo.png';


//conponents
import CastomButtons from './CastomButtons';
import Search from './Search';
import IconButtons from './IconButtons';

import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';


const StyledHeader = styled(AppBar)`
    background: #fdfbfb;
    color: #807D7E;
    // height: 180px;
    // justify-content: center;
`
const Coponent = styled(Box)`
    // margin-left: 2%;
`
const MenuButton = styled(IconButton)(({ theme }) => ({
    display: "none",
    [theme.breakpoints.down('md')]:{
        display: 'block',
    }
}))



const Header = () => {

    const [open,setOpen] = useState(false); //for Drawer open & close

    const navigate = useNavigate();

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
                <ListItem  sx={{ justifyContent: 'center', mb: 2}}>
                    <Box sx={{ display:'flex', gap: 2}}>
                        <IconButtons mobileIconView={true}/>
                    </Box>
                </ListItem> 

                <Divider />

                <ListItem sx={{ mt: 2 }}>   
                    <CastomButtons mobileView={true}
                        
                    />
                    
                </ListItem>
            </List>
        </Box>
    )



  return (
    
      <StyledHeader>
        
        <Toolbar sx={{ display: 'flex', 
                       flexDirection: 'row',
                       alignItems: 'center', 
                       justifyContent: 'space-between', 
                       px: {xs:1, md:3},
                       gap: {xs: 1, md:2},
                       minHeight: '64px !important' 
                    }}>
            
           

            <Drawer open={open} onClose={handleClose} >
                {list()}
            </Drawer>


            <Box
                sx={{
                    display: "flex",
                    alignItems: 'center',
                    // width: { xs: '100%', md: 'auto'},
                    // justifyContent: 'flex-start'
                    flexShrink:0
                }}
            >
                <MenuButton color='inherit' onClick={handleOpen} sx={{ml:-1, mr:0}}>
                    <MenuIcon/>
                </MenuButton>

                {/* Logo */}
                <Coponent sx={{ flexShrink: 0, ml:{xs:0, md:2} }} 
                    onClick={()=>navigate("/")}
                >
                    <Box
                        component='img'
                        src={OneStop_Logo}
                        alt="OneStop Logo"
                        sx={{ 
                                height: { xs: '35px', md: '50px' }, 
                                width: 'auto', 
                                cursor: 'pointer' 
                            }}
                    />
                    {/* <img src={OneStop_Logo} alt="OneStop Logo" style={{ height: '50px', width: 'auto', cursor:'pointer' }} /> */} 
                </Coponent>
            </Box>

            
            
            {/* Nav Buttons */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <CastomButtons mobileView={false} />
            </Box>
            

            {/* Search  */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow:1, justifyContent:'flex-end' }}>
                <Box sx={{width:'100%', maxWidth:'420px'}}>
                    <Search/>
                </Box>
                

                {/* Icons */}
                <Box sx={{ display:{ xs:'none', md:'block'}}}>
                    <IconButtons mobileIconView={false}/>
                </Box>
                
            </Box>
            
        </Toolbar>
      </StyledHeader>
      
    
  )
}

export default Header
