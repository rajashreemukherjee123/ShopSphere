import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getWishlist, removeWishList } from "../../redux/slices/wishListSlice";
import { addToCart } from "../../redux/slices/cartSlice";

// import { getProducts } from '../../redux/slices/productSlice';
import { toast } from "react-toastify";
import LoginDialog from "../login/LoginDialog";

const WishListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishList, loading, error } = useSelector((state) => state.wishList);

  const [openLogin, setOpenLogin] = useState(false);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getWishlist());
    }
  }, [dispatch, isLoggedIn]);

  // remove wishlist
  const handle_remove = async (e,item) => {
    e.stopPropagation();
    try {
      await dispatch(removeWishList(item.productId?._id)).unwrap();
      toast.success("Product removed from wishlist");
    } catch (err) {
      toast.error(err || "Failed to remove product");
    }
  };

  // add to cart
  const handle_addToCart = async (e,item) => {
    e.stopPropagation();
    try {
      await dispatch( addToCart ({
          productId: item.productId?._id,
          quantity: 1,
        }),
      ).unwrap();

      await dispatch(removeWishList(item.productId?._id)).unwrap();

      toast.success("Product successfully added to Cart");
    } catch (err) {
      toast.error(err || "Failed to add product to cart");
    }
  };

  // ------- Not login user -----
  if (!isLoggedIn) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          alignContent: "center",
          textAlign: "center",
          padding: 3,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              marginBottom: 1,
            }}
          >
            Please Login to View Your Wishlist
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              marginBottom: 3,
            }}
          >
            Login to save products to your wishlist and view them anytime.
          </Typography>

          <Button
            variant="contained"
            onClick={() => setOpenLogin(true)}
            sx={{
              textTransform: "none",
              padding: "10px 30px",
              "&:hover": {
                backgroundColor: "#85399c",
              },
            }}
          >
            Login to Continue
          </Button>

          <LoginDialog open={openLogin} setOpen={setOpenLogin} />
        </Box>
      </Box>
    );
  }

  // ------- Logged in and loading -----
  if (loading) {
    return (
      <Box sx={{ textAlign: "center", padding: 8 }}>
        <Typography>Loading Wishlist...</Typography>
      </Box>
    );
  }

  // ------- Error -----
  if (error) {
    return (
      <Box
        sx={{
          textAlign: "center",
          padding: 8,
        }}
      >
        <Typography color="error">
          Something went wrong while loading your wishlist.
        </Typography>
      </Box>
    );
  }

  // ------- wishlist Empty -----
  if (!wishList || wishList.items?.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          padding: "80px 20px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            marginBottom: 2,
          }}
        >
          Your Wishlist is Empty
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            marginBottom: 3,
          }}
        >
          You haven't added any products to your wishlist yet.
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            backgroundColor: "#512886",
            textTransform: "none",
          }}
        >
          Continue Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr 1fr",
          md: "1fr 1fr 1fr",
          lg: "1fr 1fr 1fr 1fr",
        },
        gap: 3,
        padding: 3,
      }}
    >
      {!loading &&
        wishList?.items?.map((item) => {
          return (
            <Card
              key={item._id}
              sx={{
                display: "flex",
                height: "100%",
                flexDirection: "column",
                borderRadius: 2,
                transition: "0.3s",

                "&:hover": {
                  boxShadow: 6,
                  transform: "translateY(-4px)",
                },
              }}
              onClick={() => {
                navigate(`/product/${item.productId?.id}`);
              }}
            >
              <CardMedia
                component="img"
                image={item.productId?.url}
                alt={item.productId?.title?.shortTitle}
                sx={{
                  height: "200px",
                  width: "100%",
                  objectFit: "cover",
                  backgroundColor: "#fff",
                }}
              />

              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {item.productId?.title?.shortTitle}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    marginTop: 1,
                  }}
                >
                  {item.productId?.title?.longTitle}
                </Typography>

                <Typography
                  sx={{
                    marginTop: 1,
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {item.productId?.price?.cost}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "gray",
                    textDecoration: "line-through",
                  }}
                >
                  {item.productId?.price?.mrp}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  {item.productId?.price?.discount}
                </Typography>

                {/* ----------- remove and add to cart button --------------- */}
                <Box
                  sx={{
                    marginTop: "auto",
                    display: "flex",
                    gap: 2,
                    paddingTop: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{
                      flex: 1,
                      borderWidth: "2px",
                      textTransform: "none",
                      "&:hover": {
                        borderWidth: "2px",
                        backgroundColor: "rgba(211, 47, 47, 0.04)",
                      },
                    }}
                    onClick={(e)=>handle_remove(e,item)}
                  >
                    REMOVE
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#512886",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#85399c",
                        boxShadow: 2,
                      },
                    }}
                    onClick={(e)=>handle_addToCart(e,item)}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          );
        })}
    </Box>
  );
};

export default WishListPage;
