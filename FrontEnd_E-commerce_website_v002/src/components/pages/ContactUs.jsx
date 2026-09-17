import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
} from "@mui/material";

const ContactUs = () => {
  return (
    <Box sx={{ py: 6, backgroundColor: "#f5f5f5", minHeight: "80vh" }}>
      <Container maxWidth="md">
        <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 2 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Contact Us
          </Typography>

          <Typography paragraph>
            If you have any questions, suggestions, or need assistance, feel
            free to contact us.
          </Typography>

          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
            />

            <TextField
              fullWidth
              label="Subject"
              margin="normal"
            />

            <TextField
              fullWidth
              label="Message"
              multiline
              rows={5}
              margin="normal"
            />

            <Button
              variant="contained"
              sx={{ mt: 2 }}
            >
              Send Message
            </Button>
          </Box>

          <Box sx={{ mt: 5 }}>
            <Typography variant="h6" fontWeight="bold">
              Contact Information
            </Typography>

            <Typography sx={{ mt: 1 }}>
              Email: support@oneStop.com
            </Typography>

            <Typography>
              Phone: +91 98765 43210
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ContactUs;