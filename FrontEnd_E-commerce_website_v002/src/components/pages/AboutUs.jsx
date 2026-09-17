import React from "react";
import { Box, Container, Typography, Paper } from "@mui/material";

const AboutUs = () => {
  return (
    <Box sx={{ py: 6, backgroundColor: "#f5f5f5", minHeight: "80vh" }}>
      <Container maxWidth="md">
        <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 2 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            About Us
          </Typography>

          <Typography paragraph>
            Welcome to OneStop, your trusted online shopping destination.
            We aim to provide a simple, secure, and convenient shopping
            experience for everyone.
          </Typography>

          <Typography paragraph>
            OneStop offers products across different categories including
            fashion, electronics, mobile devices, appliances, and beauty
            products.
          </Typography>

          <Typography paragraph>
            Our goal is to make online shopping easy by providing a
            user-friendly interface, secure authentication, personalized cart
            and wishlist features, and a smooth checkout experience.
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
            Our Mission
          </Typography>

          <Typography paragraph>
            Our mission is to create a reliable and user-friendly e-commerce
            platform where customers can discover products and enjoy a smooth
            online shopping experience.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default AboutUs;