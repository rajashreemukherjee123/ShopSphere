import React, { useState } from 'react'
import {Box,Typography,Menu,MenuItem,Divider} from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useDispatch } from 'react-redux';
import { resetWishList } from '../../redux/slices/wishListSlice';
import { resetCart } from '../../redux/slices/cartSlice';
import { USER_LOGOUT } from '../../redux/constants/userConstant';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';




const Profile = ({account, setAccount, mobileIconView }) => {

  const dispatch = useDispatch();

    
    const [anchorEl, setAnchorE1 ] = useState(null);

    const userEmail = localStorage.getItem("userEmail") || "";

    const handleClick = (e)=>{
        setAnchorE1(e.currentTarget);
    };

    const handleClose = ()=>{
        setAnchorE1(null);
    }

    const handlelogout = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        setAccount("");

        dispatch({type: USER_LOGOUT});
        dispatch(resetWishList());
        dispatch(resetCart());

        handleClose();
    };

  return (
    <>
    {/* --------------------------- Desktop ---------------- */}
      
      {!mobileIconView && (
        <Box 
          onClick = {handleClick}
          sx={{
            cursor: "pointer",
            minWidth: 0,
            maxWidth: 160
          }}
        >
          <Typography
            sx={{
              maxWidth: 160,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: "14px",
              lineHeight: "36px",
              px: 1
            }}
          >
            {account}
          </Typography>
        </Box>
      )}


      {/* -------------------- Mobile-------------------- */}
            {mobileIconView && (
              <Box
                onClick={handleClick}
                sx={{
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#F6F6F6",
                  borderRadius: "8px",
                  cursor: "pointer",

                  "&:hover": {
                    backgroundColor: "#EDEDED"
                  }
                }}
              >
                <PermIdentityIcon />
              </Box>
            )}

            {/* -------------------- Profile Menu -------------------- */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              sx={{
                marginTop: "6px"
              }}
            >
              {/* user information */}
              <Box 
                sx={{ padding: "10px 20px", minWidth: 220 }}
              >
                <Typography 
                  sx={{
                    fontWeight: 600,
                    fontSize: 15,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}
                >
                  {account}
                </Typography>


                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: 13,
                    marginTop: "3px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}
                >
                  {userEmail}
                </Typography>
              </Box>

              <Divider/>

              {/* Logout  */}
              <MenuItem
                onClick={handlelogout}
                sx={{padding: "10px 20px"}}
              >
                <PowerSettingsNewIcon color='error' fontSize='small'/>

                <Typography
                  sx={{
                    marginLeft: 1,
                    fontSize: 14
                  }}
                >
                  Logout
                </Typography>
              </MenuItem>

            </Menu>
            
    </>
  )
}

export default Profile
