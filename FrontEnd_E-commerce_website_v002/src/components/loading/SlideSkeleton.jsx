import React from "react";
import { Box, Skeleton } from "@mui/material";

const SlideSkeleton = () => {
  return (
    <Box
      sx={{
        marginTop: "10px",
        backgroundColor: "#fff",
        paddingBottom: 2,
      }}
    >
      {/* Header Skeleton */}
      <Box
        sx={{
          padding: "15px 20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Skeleton
          variant="text"
          width={180}
          height={35}
          animation="wave"
        />

        <Skeleton
          variant="text"
          width={130}
          height={25}
          sx={{ marginLeft: 2 }}
          animation="wave"
        />

        <Skeleton
          variant="rectangular"
          width={90}
          height={36}
          sx={{ marginLeft: "auto", borderRadius: 1 }}
          animation="wave"
        />
      </Box>

      {/* Products Skeleton */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(5, 1fr)",
          },
          gap: 2,
          padding: "20px",
        }}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <Box
            key={index}
            sx={{
              padding: "10px",
              textAlign: "center",
            }}
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              height={150}
              animation="wave"
            />

            <Skeleton
              variant="text"
              width="80%"
              height={25}
              sx={{ margin: "10px auto 0" }}
              animation="wave"
            />

            <Skeleton
              variant="text"
              width="50%"
              height={22}
              sx={{ margin: "auto" }}
              animation="wave"
            />

            <Skeleton
              variant="text"
              width="70%"
              height={22}
              sx={{ margin: "auto" }}
              animation="wave"
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SlideSkeleton;