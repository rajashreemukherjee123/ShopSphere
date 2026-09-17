import React from "react";
import { Box, Container, Typography, Paper } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Box sx={{ py: 6, backgroundColor: "#f5f5f5", minHeight: "80vh" }}>
      <Container maxWidth="md">
        <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 2 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Privacy Policy
          </Typography>

          <Typography paragraph>
            At ShopSphere, we respect your privacy and are committed to
            protecting your personal information.
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
            Information We Collect
          </Typography>

          <Typography paragraph>
            We may collect information such as your name, email address,
            account information, and order-related information when you use
            our website.
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
            How We Use Your Information
          </Typography>

          <Typography paragraph>
            Your information may be used to provide our services, manage your
            account, process orders, improve our website, and communicate with
            you regarding your account or orders.
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
            Data Security
          </Typography>

          <Typography paragraph>
            We take reasonable measures to protect your personal information
            from unauthorized access, alteration, disclosure, or destruction.
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
            Cookies
          </Typography>

          <Typography paragraph>
            Our website may use cookies or similar technologies to improve
            functionality and user experience.
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
            Changes to This Policy
          </Typography>

          <Typography paragraph>
            We may update this Privacy Policy from time to time. Any changes
            will be reflected on this page.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;