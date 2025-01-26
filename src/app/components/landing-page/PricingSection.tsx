'use client';

import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import Image from "next/image";
import { useState } from "react";

// Define types
type PlanType = "pro" | "advanced" | "premium";

// Styled components
const StyledSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  paddingTop: theme.spacing(10),
  backgroundColor: theme.palette.grey[50],
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(6),
  },
}));

const StyledCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  textAlign: "center",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
  transition: "transform 0.3s ease",
}));

const StyledFeaturesList = styled("ul")(({ theme }) => ({
  listStyle: "none",
  padding: 0,
  marginTop: theme.spacing(2),
  textAlign: "left",
}));

const StyledFeatureItem = styled("li")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
  color: "#444",
  fontSize: "0.9rem",
}));

// Features array
const features = [
	"Homepage (10x Better than linktree)",
	"Free QR code",
	"Menu Management",
	"Analytics",
	"Customer Support",
	"Tipping Waiter/Kitchen Staff",
	"Online Ordering",
	"Marketing ROI",
	"Food Rating & Feedback",
	"Social Media Integration",
	"Payment Gateway Integration",
	"Queue Breaker",
	"Custom Domain",
	"Complete Branding Control",
	"Advance Analytics",
	"POS Integrations"
]

// Helper function for feature highlighting
const featureHighlight = (index: number, plan: PlanType): boolean => {
  if (plan === "pro") return index < 4;
  if (plan === "advanced") return index < 6;
  return true; // premium plan gets all features
};

const PricingSectionComponent = () => {
  const [hovered, setHovered] = useState<PlanType | null>(null);

  return (
    <StyledSection id="pricing">
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        textAlign="center"
        style={{ paddingBottom: "25px" }}
      >
        Our Pricing Plans
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* Pro Plan */}
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard
            elevation={3}
            onMouseEnter={() => setHovered("pro")}
            onMouseLeave={() => setHovered(null)}
            sx={{
              transform:
                hovered === "pro"
                  ? "scale(1)"
                  : hovered
                  ? "scale(0.9)"
                  : "scale(0.9)",
            }}
          >
            <Box bgcolor="#2E7D32" color="#fff" p={1} borderRadius={1} mb={2}>
              <Typography variant="h6">Pro</Typography>
            </Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              Free
              <Image
                src="/prize-icon.png"
                alt="Prize Icon"
                width={40}
                height={40}
                style={{ marginLeft: "8px" }}
              />
            </Typography>
            <Typography variant="body2" mt={1}>
              Billed annually
            </Typography>
            <Typography mt={2} color="textSecondary">
              Transition from paper menus to beautiful mobile menus with QR codes.
            </Typography>
            <StyledFeaturesList>
              {features.map((item, index) => (
                <StyledFeatureItem key={index}>
                  <CheckIcon
                    sx={{
                      color: featureHighlight(index, "pro") ? "#2E7D32" : "#ddd",
                      mr: 1,
                    }}
                  />
                  <span
                    style={{
                      fontWeight: featureHighlight(index, "pro")
                        ? "bold"
                        : "normal",
                    }}
                  >
                    {item}
                  </span>
                </StyledFeatureItem>
              ))}
            </StyledFeaturesList>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Button
                variant="contained"
                color="success"
                sx={{
                  textTransform: "none",
                  width: "auto",
                  minWidth: "150px",
                  padding: "8px 16px",
                }}
              >
                Select
              </Button>
            </Box>
          </StyledCard>
        </Grid>

        {/* Advanced Plan */}
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard
            elevation={3}
            onMouseEnter={() => setHovered("advanced")}
            onMouseLeave={() => setHovered(null)}
            sx={{
              transform:
                hovered === "advanced"
                  ? "scale(1)"
                  : hovered
                  ? "scale(1)"
                  : "scale(1)",
              border: "2px solid #FB8C00",
              backgroundColor: "#FFF3E0",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Box bgcolor="#FB8C00" color="#fff" p={1} borderRadius={1} mb={2}>
              <Typography variant="h6">Advanced</Typography>
            </Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              1 Large Pizza
              <Image
                src="/pizza-icon.png"
                alt="Prize Icon"
                width={40}
                height={40}
                style={{ marginLeft: "8px" }}
              />
            </Typography>
            <Typography variant="body2" mt={1}>
              Billed annually
            </Typography>
            <Typography mt={2} color="textSecondary">
              Get your online ordering site integrated with logistics partners.
            </Typography>
            <StyledFeaturesList>
              {features.map((item, index) => (
                <StyledFeatureItem key={index}>
                  <CheckIcon
                    sx={{
                      color: featureHighlight(index, "advanced")
                        ? "#2E7D32"
                        : "#ddd",
                      mr: 1,
                    }}
                  />
                  <span
                    style={{
                      fontWeight: featureHighlight(index, "advanced")
                        ? "bold"
                        : "normal",
                    }}
                  >
                    {item}
                  </span>
                </StyledFeatureItem>
              ))}
            </StyledFeaturesList>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  width: "auto",
                  minWidth: "150px",
                  padding: "8px 16px",
                  backgroundColor: "#FB8C00",
                  color: "#fff",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    backgroundColor: "#FB8C00",
                    boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                Selected
              </Button>
            </Box>
          </StyledCard>
        </Grid>

        {/* Premium Plan */}
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard
            elevation={3}
            onMouseEnter={() => setHovered("premium")}
            onMouseLeave={() => setHovered(null)}
            sx={{
              transform:
                hovered === "premium"
                  ? "scale(1)"
                  : hovered
                  ? "scale(0.9)"
                  : "scale(0.9)",
            }}
          >
            <Box bgcolor="#D32F2F" color="#fff" p={1} borderRadius={1} mb={2}>
              <Typography variant="h6">Premium</Typography>
            </Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              1 kg Biryani
              <Image
                src="/biryani-icon.png"
                alt="Prize Icon"
                width={40}
                height={40}
                style={{ marginLeft: "8px" }}
              />
            </Typography>
            <Typography variant="body2" mt={1}>
              Billed annually
            </Typography>
            <Typography mt={2} color="textSecondary">
              For brands that want it all! Full customization and advanced features.
            </Typography>
            <StyledFeaturesList>
              {features.map((item, index) => (
                <StyledFeatureItem key={index}>
                  <CheckIcon
                    sx={{
                      color: featureHighlight(index, "premium")
                        ? "#2E7D32"
                        : "#ddd",
                      mr: 1,
                    }}
                  />
                  <span
                    style={{
                        fontWeight: featureHighlight(index, "premium")
                        ? "bold"
                        : "normal",
                    }}
                  >
                    {item}
                  </span>
                </StyledFeatureItem>
              ))}
            </StyledFeaturesList>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Button
                variant="contained"
                color="success"
                sx={{
                  textTransform: "none",
                  width: "auto",
                  minWidth: "150px",
                  padding: "8px 16px",
                }}
              >
                Select
              </Button>
            </Box>
          </StyledCard>
        </Grid>
      </Grid>
    </StyledSection>
  );
  };
  
  export default PricingSectionComponent;
  