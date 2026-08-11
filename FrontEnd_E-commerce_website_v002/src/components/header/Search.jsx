import React, { useEffect, useState } from 'react'

import { InputBase, Box, styled, List, ListItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions/productAction'

import {Link} from 'react-router-dom';

const SearchContainer = styled(Box)`
    // background: #F6F6F6;
    // width:100%;
    // border-radius: 8px;
    // margin-left: 0;
    // display: flex;
    // align-items: center;
    
    // height: 40px;

    background: #F6F6F6;
    width: 180px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    height: 36px;
    padding: 0 10px;
    gap: 6px;
`;

const InputSearchBase = styled(InputBase)`
    
    // .MuiInputBase-input {
    //     padding-left: 10px;
    // }
    // .MuiInputBase-input::placeholder {
    //     font-size: 12px; 
    //     opacity: 0.5;
    //     padding-right: 10px  
    // }

    flex: 1;
    .MuiInputBase-input {
        padding: 0;
        font-size: 13px;
    }
    .MuiInputBase-input::placeholder {
        font-size: 13px; 
        opacity: 0.5;
    }
`;



const ListWrapper = styled(List)`
    position : absolute;
    background: #FFFFFF;
    top: 40px;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.2); 
    max-height: 300px;
    overflow-y: auto;

`

const Search = () => {

    const [text,setText] = useState("");

    const {products} = useSelector(state => state.getProducts);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getProducts())
    },[dispatch])

    const getText = (text)=>{
        setText(text);
    }

  return (      
    <SearchContainer>
        
            <SearchIcon sx={{ fontSize: 18, opacity: 0.4 }}/>
        
        <InputSearchBase 
            placeholder='Search'
            value={text}
            onChange={(e) => getText(e.target.value)}
        />
        {
            text && 
                <ListWrapper>
                    {
                        products ?.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product =>(
                            <ListItem>
                                <Link 
                                    to={`/product/${product.id}`}
                                    onClick={()=> setText("")}
                                    style={{ textDecoration: 'none', color: 'inherit'}}
                                >
                                    {product.title.longTitle}
                                </Link>
                            </ListItem>
                        ))
                    }
                </ListWrapper>
        }
        
    </SearchContainer>
   
  )
}

export default Search
