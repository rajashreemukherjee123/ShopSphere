import React from "react";
import { Box, Container, Typography, Paper } from "@mui/material";

const TermsAndConditions = () => {
  return (
    <Box sx={{ py: 6, backgroundColor: "#f5f5f5", minHeight: "80vh" }}>
      <Container maxWidth="md">
        <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 2 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Terms & Conditions
          </Typography>

          <Typography paragraph>
            By accessing and using ShopSphere, you agree to follow the terms
            and conditions described on this page.
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
            Use of Website
          </Typography>

          <Typography paragraph>
            You agree to use ShopSphere only for lawful purposes and not to
            misuse or interfere with the functionality of the website.
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
            User Account
          </Typography>

          <Typography paragraph>
            Users are responsible for maintaining the confidentiality of their
            account information and for activities performed through their
            account.
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
            Products and Prices
          </Typography>

          <Typography paragraph>
            Product information, availability, images, and prices may be
            changed or updated without prior notice.
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
            Orders and Payments
          </Typography>

          <Typography paragraph>
            Orders are subject to product availability and successful payment
            processing. We reserve the right to cancel or reject an order when
            necessary.
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
            Changes to Terms
          </Typography>

          <Typography paragraph>
            ShopSphere may update these Terms & Conditions from time to time.
            Continued use of the website means you accept the updated terms.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default TermsAndConditions;