import React from "react";
import { Box, Skeleton } from "@mui/material";

const CartItemSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        padding: "20px",
        background: "#fff",
        borderBottom: "1px solid #f0f0f0",
        gap: 3,
      }}
    >
      {/* Product Image */}
      <Skeleton
        variant="rectangular"
        width={120}
        height={120}
        animation="wave"
        sx={{ flexShrink: 0 }}
      />

      {/* Product Details */}
      <Box sx={{ flexGrow: 1 }}>
        <Skeleton
          variant="text"
          width="60%"
          height={30}
          animation="wave"
        />

        <Skeleton
          variant="text"
          width="40%"
          height={25}
          animation="wave"
        />

        <Skeleton
          variant="text"
          width="25%"
          height={30}
          animation="wave"
        />

        {/* Quantity buttons */}
        <Box sx={{ display: "flex", gap: 1, marginTop: 1 }}>
          <Skeleton
            variant="rectangular"
            width={35}
            height={32}
            animation="wave"
          />

          <Skeleton
            variant="rectangular"
            width={45}
            height={32}
            animation="wave"
          />

          <Skeleton
            variant="rectangular"
            width={35}
            height={32}
            animation="wave"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CartItemSkeleton;