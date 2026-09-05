import React from "react";
import { Box, Skeleton } from "@mui/material";

const ActionItemSkeleton = () => {
  return (
    <Box
      sx={{
        padding: "40px 0 0 80px",
        width: "90%",
      }}
    >
      {/* Product Image */}
      <Box
        sx={{
          padding: "15px 20px",
          border: "1px solid #f0f0f0",
          marginBottom: 2,
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height={400}
          animation="wave"
        />
      </Box>

      {/* Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: "4%",
        }}
      >
        <Skeleton
          variant="rectangular"
          width="48%"
          height={50}
          animation="wave"
        />

        <Skeleton
          variant="rectangular"
          width="48%"
          height={50}
          animation="wave"
        />
      </Box>
    </Box>
  );
};

export default ActionItemSkeleton;