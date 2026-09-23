import React, { useEffect, useState } from 'react'

import { InputBase, Box, List, ListItem, Typography, IconButton, Chip } from '@mui/material';
import { styled, keyframes } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../redux/slices/productSlice';

import {Link, useNavigate} from 'react-router-dom';
import { Transform } from '@mui/icons-material';

// const SearchContainer = styled(Box)`
//     background: #F6F6F6;
//     width: 180px;
//     border-radius: 8px;
//     display: flex;
//     align-items: center;
//     height: 36px;
//     padding: 0 10px;
//     gap: 6px;
// `;


// 1. Clockwise Rotation Animation
const spin = keyframes`
    0% { transform: translate(-50%, -50%) rotate(0deg); opacity: 1 }
    15% { opacity: 1;}
    85% { opacity: 1; }
    100% { transform: translate(-50%, -50%) rotate(360deg); opacity: 0; }
`;

// 2. Main Wrapper
const SearchWrapper = styled(Box)`
    position: relative;
    width: 420px;
    border-radius: 10px;
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0px 4px 20px rgba(133, 57, 156, 0.25);
        transform: translateY(-1px);
    }
`;

// 3. Animated Border Box
const AnimatedBorderBox = styled(Box)(({ $isFocused }) => ({
    position: "relative",
    padding: "2px",
    borderRadius: "10px",
    background: "#F6F6F6",
    overflow: "hidden",
    zIndex: 1,

    "&::before": {
        content: '""',
        position: "absolute",
        top: "50%",
        // left: "50%",
        transform: "translate(-50%, -50%)",
        width: "300%",
        height: "300%",
        background: "conic-gradient(transparent, transparent, transparent, #85399c )",
        animation: $isFocused ? `${spin} 1s ease-out 1 forwards` : 'none',
        opacity:  0,
        zIndex: -1,
        // transition: 'opacity 0.3s'
    }
}));

// 4. Inner Search Input Box
const InnerSearchBox = styled(Box)`
    background: #ffffff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 4px 0 12px;
    gap: 8px;
    z-index: 2;
`;

const InputSearchBase = styled(InputBase)`
    flex: 1;
    .MuiInputBase-input {
        padding: 0;
        font-size: 13px;
        color: #333;
    }
    .MuiInputBase-input::placeholder {
        font-size: 13px; 
        // opacity: 0.5;
        opacity: 0.6;
    }
`;


// 5. Dropdown Wrapper
const ListWrapper = styled(Box)`
    position : absolute;
    background: #FFFFFF;
    // top: 40px;
    top: 55px;
    left: 0;
    width: 100%;
    // box-shadow: 0px 4px 10px rgba(0,0,0,0.2); 
    box-shadow: 0px 8px 24px rgba(0,0,0,0.12);
    border-radius: 10px;
    z-index: 20;
    border: 1px solid #eee;
    overflow-y: auto;

`

const Search = () => {

    const [text,setText] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const navigate = useNavigate();
    const {products} = useSelector(state => state.productsData);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getProducts())
    },[dispatch])

    // const getText = (text)=>{
    //     setText(text);
    // }


    

//   return (      
//     <SearchContainer>
        
//             <SearchIcon sx={{ fontSize: 18, opacity: 0.4 }}/>
        
//         <InputSearchBase 
//             placeholder='Search'
//             value={text}
//             onChange={(e) => getText(e.target.value)}
//         />
//         {
//             text && 
//                 <ListWrapper>
//                     {
//                         products ?.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product =>(
//                             <ListItem>
//                                 <Link 
//                                     to={`/product/${product.id}`}
//                                     onClick={()=> setText("")}
//                                     style={{ textDecoration: 'none', color: 'inherit'}}
//                                 >
//                                     {product.title.longTitle}
//                                 </Link>
//                             </ListItem>
//                         ))
//                     }
//                 </ListWrapper>
//         }
        
//     </SearchContainer>
   
//   )
// }


const handleHybridSearch = (queryText)=>{
    const finalQuery = queryText || text;
    if(finalQuery.trim()){
        navigate(`/search?q=${encodeURIComponent(finalQuery)}`);
        setText("");
        setIsFocused(false);
    }
}


const naturalSuggestions = [
    "Gaming laptop under 60k",
    "Best running shoes for daily use",
    "Show me some cool watches"
];



    return (
        <SearchWrapper onBlur={(e) => {
            if(!e.currentTarget.contains(e.relatedTarget)){
                setIsFocused(false);
            }
        }}>
            <AnimatedBorderBox $isFocused={isFocused}>
                <InnerSearchBox>
                    {/* left icon */}
                    <AutoAwesomeIcon sx={{fontSize:20, color: '#85399c'}} />

                    {/* input */}
                    <InputSearchBase 
                        placeholder='Search products or describe what you need...' 
                        value={text}
                        onFocus={()=> setIsFocused(true)}
                        onChange={(e)=> setText(e.target.value)}
                        onKeyDown={(e)=>{
                            if(e.key === 'Enter') handleHybridSearch();
                        }}
                    />


                    {/* search button */}
                    <IconButton
                        onClick={()=> handleHybridSearch()}
                        sx={{
                            backgroundColor: '#f3e8f8',
                            color: '#85399c',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            '&:hover': {backgroundColor: '#ebd4f4'}
                        }}
                    >
                        <SearchIcon sx={{ fontSize:20 }} />
                    </IconButton>
                </InnerSearchBox>
            </AnimatedBorderBox>


            {/* Dropdown */}
            {
                isFocused && (
                    <ListWrapper tabIndex={-1} onMouseDown={(e)=> e.preventDefault()}>
                        {/* before type */}
                        {!text && (
                            <Box sx={{ padding: '16px' }}>
                                <Typography sx={{ fontSize:'12px', fontWeight:600, color:'gray', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'12px'  }}>
                                    ✨ Try searching naturally
                                </Typography>
                                <Box sx={{display:'flex', flexDirection:"column", gap:'10px'}}>
                                    {naturalSuggestions.map((suggestion, index)=>(
                                        <Typography
                                            key={index}
                                            onClick={()=> handleHybridSearch(suggestion)}
                                            sx={{
                                                fontSize: '14px',
                                                color:'#555',
                                                padding:'6px 10px',
                                                borderRadius:'6px',
                                                cursor:'pointer',
                                                transition:'0.2s',
                                                '&:hover': {backgroundColor:'#f9f9f9', color:'#85399c'}
                                            }}
                                        >
                                            "{suggestion}"
                                        </Typography>
                                    ))}
                                </Box>
                            </Box>
                        )}

                        {/* after type */}
                        {text && (
                            <Box>
                                <ListItem
                                    sx={{
                                        padding:'12px 16px',
                                        borderBottom: '1px solid #f0f0f0', 
                                        cursor: 'pointer', 
                                        backgroundColor: '#faf5fc',
                                        '&:hover': { backgroundColor: '#f3e8f8' }
                                    }}
                                    onClick={()=> handleHybridSearch()}
                                >
                                    <SearchIcon sx={{ fontSize:18,color:'#85399c', mr: 1.5}} />
                                    <Typography sx={{ fontSize:'14px', color:'#85399c', fontWeight:600}}>
                                        Search for "{text}" ...
                                    </Typography>
                                </ListItem>

                                <Typography sx={{fontSize:'12px', fontWeight:600, color:'gray', textTransform:'uppercase', letterSpacing:'0.5px',padding:'12px 16px 4px 16px' }}>
                                    ⚡ Instant Matches
                                </Typography>


                                <List sx={{maxHeight:'280px', overflowY: 'auto'}}>
                                    {products?.filter(product => product.title.longTitle.toLowerCase().includes(text.toLocaleLowerCase())).map(product =>(
                                        <ListItem key={product.id} sx={{padding:'8px 16px', '&:hover':{backgroundColor:'#f9f9f9'}}}>
                                            <Link
                                                to={`/product/${product.id}`}
                                                onClick={()=> {
                                                    setText("");
                                                    setIsFocused(false);
                                                }}
                                                style={{textDecoration: 'none', color:'inherit', display:'flex', alignItems:'center', gap:'12px', width:'100%'}}
                                            >
                                                <img src={product.url} alt="product" style={{width: '40px', height: '40px', objectFit: 'contain', borderRadius: '4px'}} />
                                                <Box>
                                                    <Typography sx={{fontSize:'13px', color:"#222", fontWeight:500 }}>
                                                        {product.title.shortTitle}
                                                    </Typography>
                                                    <Typography sx={{fontSize: '11px', color: 'gray', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '280px'}}>
                                                        {product.title.longTitle}
                                                    </Typography>
                                                </Box>
                                            </Link>
                                        </ListItem>
                                    ))}


                                    {/* no direct match */}
                                    {products?.filter(product => product.title.longTitle.toLowerCase().includes(text.toLocaleLowerCase())).length === 0 && (
                                      <Box sx={{padding: "16px", textAlign: "center"}}>
                                        <Typography sx={{fontSize: "13px", color: "gray"}}>
                                            Press <strong style={{color: "#85399c"}}>Enter</strong> to deep search ✨
                                        </Typography>
                                      </Box>  
                                    )}
                                </List>
                            </Box>
                        )}


                    </ListWrapper>
                )
            }

        </SearchWrapper>
    )
}

export default Search
