import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { aiSearchProducts} from "../../redux/slices/productSlice"
import { Box, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import AutoAwesomeIcon from  '@mui/icons-material/AutoAwesome';
import SearchResultLoading from '../loading/SearchResultLoading';


const SearchResult = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q");

  const {aiSearchResults, aiSearchLoading, aiSearchError} = useSelector((state) => state.productsData); 

  useEffect(()=>{
    if(query){
      dispatch(aiSearchProducts(query));
    }
  }, [dispatch, query]);



  if(aiSearchLoading){
    return <SearchResultLoading/>;
  }


  if(aiSearchError) {
    return <Typography color='error' mt={5} sx={{ textAlign:"center" }} >
              {aiSearchError}
          </Typography>
  }



  return (
    <Box sx={{padding: 3}}>

      <Box sx={{ display:'flex', alignItems: 'center', gap:1, marginBottom:3}}>
        <AutoAwesomeIcon sx={{ color:'#85399c', fontSize:28}}/>
        <Typography variant='h5' sx={{fontWeight:600}}>
          Search Results for: <span style={{color: '#85399c'}}>"{query}"</span>
        </Typography>
      </Box>


      {/* no data found */}
      {aiSearchResults?.length === 0 ? (
        <Box sx={{ textAlign:'center', padding:'50px 20px'}}>
          <Typography variant='h6' color='text.secondary'>No products found!</Typography>
          <Typography color='text.secondary'>Try searchingn with different keywords.</Typography>
        </Box>
      ):(
        // data
        <Box sx={{ display: 'grid', 
                  gridTemplateColumns:{
                    xs: "1fr 1fr",
                    md: "1fr 1fr 1fr",
                    lg: "1fr 1fr 1fr 1fr"
                  }, gap: 3}}
        >
          {aiSearchResults?.map((item)=>(
            <Card
              key={item._id}
              sx={{
                display:'flex',
                height: '100%',
                flexDirection: 'column',
                borderRadius: 2,
                transition:'0.3s',
                cursor:'pointer',
                "&:hover": {
                  boxShadow:6,
                  transform:'translateY(-4px)'
                },
              }}
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <CardMedia component="img"
                        image={item.url} alt={item.title?.shortTitle}
                        sx={{height:'200',
                            width:'100%',
                            objectFit:'cover',
                            backgroundColor:'#fff'
                        }}
              />
              <CardContent sx={{flexGrow:1, display:"flex", flexDirection:'column'}}>
                <Typography variant='h6' sx={{fontSize:16, fontWeight:'bold'}}>{item.title?.shortTitle}</Typography>
                <Typography variant='body2' color='text.secondary' sx={{marginTop:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                  {item.title?.longTitle}
                </Typography>
                <Typography sx={{ marginTop:1, fontSize:'18px', fontWeight:'bold'}}>₹{item.price?.cost}</Typography>
                <Box sx={{display:'flex', gap:1, alignItems:'center'}}>
                  <Typography sx={{ fontSize:'14px', color:'gray', textDecoration:'line-through'}}>₹{item.price?.mrp} </Typography>
                  <Typography sx={{ fontSize:'14px', color:'green', fontWeight:'bold'}}>{item.price?.discount}</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchResult
