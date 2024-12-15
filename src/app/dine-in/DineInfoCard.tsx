import { Box, Typography, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";

// Styles
const RestaurantDetails = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: "100%",
  "& > .details-section": {
    flex: "1 1 auto",
    textAlign: "left",
    paddingRight: "16px",
    maxWidth: "calc(100% - 150px)",
  },
  "& > .ratings-section": {
    flex: "0 0 auto",
    textAlign: "center",
    width: "150px",
  },
});

const LogoContainer = styled(Box)({
  position: "absolute",
  top: "-62.5px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "125px",
  height: "125px",
  borderRadius: "50%",
  overflow: "hidden",
  border: "2px solid white",
  backgroundColor: "white",
  zIndex: 4,
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateX(-50%) scale(1.02)",
  },
});

const RatingsContainer = styled(Box)({
	display: "flex", // Ensure flex display for horizontal alignment
	justifyContent: "space-around", // Distribute space evenly between items
	gap: "8px", // Add gap between rating items
	marginBottom: "6px",
	width: "100%", // Ensure it takes full width
});

const RatingItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  "& img": {
    width: "20px",
    height: "20px",
    objectFit: "contain",
  },
});

const RatingBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  backgroundColor: "#388e3c", // Darker green background
  color: "#fff", // White text
  padding: "2px 8px",
  borderRadius: "4px",
  fontSize: "0.875rem",
  fontWeight: "bold",
  "& .MuiSvgIcon-root": {
    fontSize: "1rem",
    color: "#fff", // White color for the star icon
  },
});

// Main Component
const DineInfoCard = ({ restaurantInfo, reviewsRef }) => (
  <Box
    className="details-section"
    display="grid"
    gridTemplateColumns="1fr 150px"
    alignItems="flex-start"
    gap={1}
  >
    {/* Restaurant Name */}
    <Box gridColumn="span 2">
      <Typography variant="h6" fontWeight="bold" fontSize="1.325rem" noWrap>
        {restaurantInfo.name}
      </Typography>
      <Typography
        variant="body2"
        color="#666"
        style={{
          textAlign: "left",
          display: "flex",
          flexWrap: "wrap",
          gap: "4px",
          marginBottom: "8px",
        }}
      >
        {restaurantInfo.cuisine.join(", ")}
      </Typography>
    </Box>

    {/* Logo */}
    <LogoContainer>
      <Image
        src="/coco.jpg"
        alt="Restaurant Logo"
        width={125}
        height={125}
        priority
      />
    </LogoContainer>

    {/* Ratings Section */}
    <Box className="ratings-section" gridColumn="span 2">
      <RatingsContainer>
        {/* Zomato Rating */}
        <RatingItem
          onClick={() =>
            reviewsRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <Image
            src="/zomato-logo.png"
            alt="Zomato"
            width={20}
            height={20}
            style={{ borderRadius: "4px" }}
          />
          <RatingBox>
            {restaurantInfo.reviews.zomato.rating}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              width="16px"
              height="16px"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </RatingBox>
        </RatingItem>

        {/* Swiggy Rating */}
        <RatingItem
          onClick={() =>
            reviewsRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <Image
            src="/swiggy-logo.png"
            alt="Swiggy"
            width={20}
            height={20}
          />
          <RatingBox>
            {restaurantInfo.reviews.swiggy.rating}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              width="16px"
              height="16px"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </RatingBox>
        </RatingItem>

        {/* Google Rating */}
        <RatingItem
          onClick={() =>
            reviewsRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <Image
            src="/google-logo.png"
            alt="Google"
            width={20}
            height={20}
          />
          <RatingBox>
            {restaurantInfo.reviews.google.rating}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              width="16px"
              height="16px"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </RatingBox>
        </RatingItem>
      </RatingsContainer>
    </Box>
  </Box>
);

export default DineInfoCard;
