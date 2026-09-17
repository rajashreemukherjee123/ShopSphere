import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#1a1a2e",
        color: "#ffffff",
        pt: 6,
        pb: 3,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        {/* ================= TOP SECTION ================= */}
        <Box
          sx={{
            textAlign: "center",
            mb: 6,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "900",
              mb: 2,
              color: "#4fc3f7",
              letterSpacing: "1px",
            }}
          >
            OneStop
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#b0bec5",
              maxWidth: "600px",
              mx: "auto",
              lineHeight: 1.8,
            }}
          >
            Your one-stop destination for trendy dresses, electronics, mobiles,
            and beauty products. Quality guaranteed and delivered with love!
          </Typography>
        </Box>

        {/* ================= 3 COLUMN SECTION ================= */}
        <Grid
          container
          spacing={{ xs: 5, md: 8 }}
          sx={{
            textAlign: "center",
          }}
        >
          {/* ================= QUICK LINKS ================= */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "600",
                mb: 3,
              }}
            >
              Quick Links
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <MuiLink
                component={RouterLink}
                to="/about"
                underline="hover"
                sx={{
                  color: "#b0bec5",
                  transition: "0.3s",
                  "&:hover": {
                    color: "#4fc3f7",
                  },
                }}
              >
                About Us
              </MuiLink>

              <MuiLink
                component={RouterLink}
                to="/contact"
                underline="hover"
                sx={{
                  color: "#b0bec5",
                  transition: "0.3s",
                  "&:hover": {
                    color: "#4fc3f7",
                  },
                }}
              >
                Contact Us
              </MuiLink>

              <MuiLink
                component={RouterLink}
                to="/privacy-policy"
                underline="hover"
                sx={{
                  color: "#b0bec5",
                  transition: "0.3s",
                  "&:hover": {
                    color: "#4fc3f7",
                  },
                }}
              >
                Privacy Policy
              </MuiLink>

              <MuiLink
                component={RouterLink}
                to="/terms"
                underline="hover"
                sx={{
                  color: "#b0bec5",
                  transition: "0.3s",
                  "&:hover": {
                    color: "#4fc3f7",
                  },
                }}
              >
                Terms & Conditions
              </MuiLink>
            </Box>
          </Grid>

          {/* ================= TOP CATEGORIES ================= */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "600",
                mb: 3,
              }}
            >
              Top Categories
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <MuiLink
                component={RouterLink}
                to="/category/fashion"
                underline="hover"
                sx={{
                  color: "#b0bec5",
                  transition: "0.3s",
                  "&:hover": {
                    color: "#4fc3f7",
                  },
                }}
              >
                Fashion
              </MuiLink>

              <MuiLink
                component={RouterLink}
                to="/category/mobile"
                underline="hover"
                sx={{
                  color: "#b0bec5",
                  transition: "0.3s",
                  "&:hover": {
                    color: "#4fc3f7",
                  },
                }}
              >
                Latest Mobiles
              </MuiLink>

              <MuiLink
                component={RouterLink}
                to="/category/electronics"
                underline="hover"
                sx={{
                  color: "#b0bec5",
                  transition: "0.3s",
                  "&:hover": {
                    color: "#4fc3f7",
                  },
                }}
              >
                Smart Electronics
              </MuiLink>

              <MuiLink
                component={RouterLink}
                to="/category/appliance"
                underline="hover"
                sx={{
                  color: "#b0bec5",
                  transition: "0.3s",
                  "&:hover": {
                    color: "#4fc3f7",
                  },
                }}
              >
                Home Appliances
              </MuiLink>

              <MuiLink
                component={RouterLink}
                to="/category/beauty"
                underline="hover"
                sx={{
                  color: "#b0bec5",
                  transition: "0.3s",
                  "&:hover": {
                    color: "#4fc3f7",
                  },
                }}
              >
                Beauty & Skincare
              </MuiLink>
            </Box>
          </Grid>

          {/* ================= CUSTOMER SUPPORT ================= */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "600",
                mb: 3,
              }}
            >
              Customer Support
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#b0bec5",
                  maxWidth: "230px",
                  lineHeight: 1.7,
                }}
              >
                Have questions? Reach out to us anytime.
              </Typography>

              <MuiLink
                href="mailto:support@onestop.com"
                underline="hover"
                sx={{
                  color: "#4fc3f7",
                  fontWeight: "bold",
                  transition: "0.3s",
                  "&:hover": {
                    color: "#ffffff",
                  },
                }}
              >
                support@onestop.com
              </MuiLink>
            </Box>
          </Grid>
        </Grid>

        {/* ================= COPYRIGHT ================= */}
        <Box
          sx={{
            borderTop: "1px solid #37474f",
            mt: 6,
            pt: 3,
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#90a4ae",
            }}
          >
            © {new Date().getFullYear()} OneStop. All rights reserved.
            {" | "}
            Built with MERN Stack.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
