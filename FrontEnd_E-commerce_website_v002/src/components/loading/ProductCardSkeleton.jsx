import React from 'react'
import { Card, CardContent, Skeleton } from "@mui/material";

const ProductCardSkeleton = () => {
  return (
    <Card sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2
    }}>
      <Skeleton
        variant="rectangular"
        height={200}
        animation="wave"
      />

      <CardContent sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column"
      }}>

        <Skeleton variant='text'
            height={30}
            width="80%"
            animation="wave"
        />

        <Skeleton
          variant="text"
          height={25}
          width="100%"
          animation="wave"
        />

        <Skeleton
          variant="text"
          height={25}
          width="70%"
          animation="wave"
        />

        <Skeleton
          variant="text"
          height={30}
          width="40%"
          animation="wave"
          sx={{ marginTop: 1 }}
        />

         <Skeleton
          variant="text"
          height={20}
          width="30%"
          animation="wave"
        />

        <Skeleton
          variant="text"
          height={20}
          width="35%"
          animation="wave"
        />

        <Skeleton
          variant="rectangular"
          height={40}
          animation="wave"
          sx={{
            marginTop: "auto",
            borderRadius: 1,
          }}
        />
      </CardContent>
    </Card>
  )
}

export default ProductCardSkeleton
