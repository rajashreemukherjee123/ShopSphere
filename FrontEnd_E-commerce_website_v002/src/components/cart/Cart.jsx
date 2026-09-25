import { Typography, Box, styled, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart, clearCart } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

import CartItem from "./CartItem";
import TotalView from "./TotalView";
import useRazorpay from "../../hooks/useRazorpay"; // centralized hook

import LoginDialog from "../login/LoginDialog";

import { toast } from "react-toastify";

import CartSkeleton from "../loading/CartSkeleton";

import { Player } from "@lottiefiles/react-lottie-player";
import LoginCart from "../../assets/EmptyCart.json";
import EmptyCart from "../../assets/Nothing.json"


const Container = styled(Box)(({ theme }) => ({
  padding: "30px 135px",
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    padding: "15px 0",
  },
}));

const Header = styled(Box)`
  padding: 15px 24px;
  background: #fff;
`;

const LeftComponent = styled(Box)(({ theme }) => ({
  paddingRight: "15px",
  width: "75%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    paddingRight: 0,
    marginBottom: "20px",
  },
}));

const RightComponent = styled(Box)(({ theme }) => ({
  width: "25%",
  [theme.breakpoints.down("md")]: { width: "100%" },
}));

const ButtonWrapper = styled(Box)`
  padding: 16px 22px;
  background: #fff;
  box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
  border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
  display: flex;
  margin-left: auto;
  background: #fb641b;
  color: #fff;
  width: 250px;
  height: 51px;
  border-radius: 5px;
`;

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems, loading } = useSelector((state) => state.cart);

  const { initiatePayment } = useRazorpay();

  const [openLogin, setOpenLogin] = useState(false);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCart());
    }
  }, [dispatch, isLoggedIn]);

  //   ------ Not loggedin-----
  if (!isLoggedIn) {
    return (
      <>
        <Box
          sx={{
            minHeight: "60vh",
            alignContent: "center",
            textAlign: "center",
            padding: 3,
          }}
        >
          <Box>
            <Box sx={{ display:'flex', justifyContent:'center', marginBottom:2}}>
              <Player 
                autoplay
                loop
                src={LoginCart}
                style={{ width:'200px', height:'200px'}}
              />
            </Box>
          </Box>
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                marginBottom: 1,
              }}
            >
              Please Login to View Your Cart
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                marginBottom: 3,
              }}
            >
              Login to save products to your Cart and view them anytime.
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
      </>
    );
  }


  if(loading){
    return <CartSkeleton />;
  }



  // Cart total amount calculate
  const getTotalAmount = () => {
    return (
      cartItems.reduce((total, item) => {
        if (item.productId && item.productId.price) {
          return total + item.productId.price.cost * item.quantity;
        }
        return total;
      }, 0) + 40
    ); // delivery charge
  };

  // handlePlaceOrder function update
  const handlePlaceOrder = () => {
    initiatePayment({
      amount: getTotalAmount(),
      productName: `Cart Order (${cartItems.filter((i) => i.productId).length} items)`,
      onSuccess: async(paymentId) => {
        try{
          await dispatch(clearCart()).unwrap();
          toast.success(`Order Placed Successfully! 🎉`);
          navigate("/");

        }catch(err){
          console.log("Cart clear failed:", err);
        }
      },
      onFailure: () => {
        toast.error("Payment failed. Please try again.");
      },
    });
  };

  

  return (
    <>
      {cartItems && cartItems.length > 0 ? (
        <Container>
          <LeftComponent>
            <Header>
              <Typography>
                My Cart ({cartItems.filter((i) => i.productId).length})
              </Typography>
            </Header>
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
            <ButtonWrapper>
              {/* onClick add */}
              <StyledButton onClick={handlePlaceOrder}>
                Place Order
              </StyledButton>
            </ButtonWrapper>
          </LeftComponent>

          <RightComponent>
            <TotalView cartItems={cartItems} />
          </RightComponent>
        </Container>
      ) : (
        // EMPTY CART
        <Box
          sx={{
            width: "80%",
            height: "65vh",
            background: "#fff",
            margin: "80px auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <img
            src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
            alt="empty"
            style={{ width: "15%" }}
          /> */}

          <Box>
            <Box sx={{ display:'flex', justifyContent:'center', marginBottom:2}}>
              <Player 
                autoplay
                loop
                src={EmptyCart}
                style={{ width:'200px', height:'200px'}}
              />
            </Box>
          </Box>
          <Typography sx={{ marginTop: "20px", fontSize: 18, fontWeight: 600 }}>
            Your cart is empty!
          </Typography>
          <Typography sx={{ fontSize: 12 }}>Add items to it now.</Typography>
          <Button
            variant="contained"
            sx={{
              marginTop: "20px",
              background: "#2874f0",
              textTransform: "none",
              borderRadius: 2,
              padding: "12px 70px",
            }}
            onClick={() => navigate("/")}
          >
            Shop Now
          </Button>
        </Box>
      )}
    </>
  );
};

export default Cart;
