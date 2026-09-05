import React from "react";
import { Box, Skeleton } from "@mui/material";
import CartItemSkeleton from "./CartItemSkeleton";


const CartSkeleton = () => {
  return (
    <Box
      sx={{
        padding: "30px 135px",
        display: "flex",
        gap: 2,
      }}
    >
      {/* Left Side */}
      <Box
        sx={{
          width: "75%",
          paddingRight: "15px",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            padding: "15px 24px",
            background: "#fff",
          }}
        >
          <Skeleton
            variant="text"
            width={150}
            height={30}
            animation="wave"
          />
        </Box>

        {/* Cart Items */}
        {Array.from({ length: 3 }).map((_, index) => (
          <CartItemSkeleton key={index} />
        ))}

        {/* Place Order */}
        <Box
          sx={{
            padding: "16px 22px",
            background: "#fff",
            boxShadow: "0 -2px 10px 0 rgb(0 0 0 / 10%)",
          }}
        >
          <Skeleton
            variant="rectangular"
            width={250}
            height={51}
            sx={{
              marginLeft: "auto",
              borderRadius: 1,
            }}
            animation="wave"
          />
        </Box>
      </Box>

      {/* Right Side */}
      <Box
        sx={{
          width: "25%",
          background: "#fff",
          padding: 2,
        }}
      >
        <Skeleton
          variant="text"
          width="60%"
          height={30}
          animation="wave"
        />

        <Skeleton
          variant="text"
          width="100%"
          height={25}
          animation="wave"
        />

        <Skeleton
          variant="text"
          width="80%"
          height={25}
          animation="wave"
        />

        <Skeleton
          variant="text"
          width="90%"
          height={25}
          animation="wave"
        />

        <Skeleton
          variant="rectangular"
          width="100%"
          height={1}
          sx={{ margin: "15px 0" }}
        />

        <Skeleton
          variant="text"
          width="70%"
          height={30}
          animation="wave"
        />
      </Box>
    </Box>
  );
};

export default CartSkeleton;