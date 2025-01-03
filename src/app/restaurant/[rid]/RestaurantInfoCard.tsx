import { Box, Typography, Link } from "@mui/material"
import { styled } from "@mui/material/styles"
import PhoneIcon from "@mui/icons-material/Phone"
import PeopleIcon from "@mui/icons-material/People"
import Image from "next/image"

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
		maxWidth: "calc(100% - 150px)"
	},
	"& > .ratings-section": {
		flex: "0 0 auto",
		textAlign: "right",
		width: "150px"
	}
})

// Logo Container
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
		transform: "translateX(-50%) scale(1.02)"
	}
})

const DetailsColumn = styled(Box)({
	display: "flex",
	flexDirection: "column",
	gap: "2px"
})

const CuisineText = styled(Typography)({
	textAlign: "left",
	color: "#666",
	fontSize: "0.82rem",
	display: "flex",
	flexWrap: "wrap",
	gap: "4px",
	marginBottom: "8px"
})

const PhoneContainer = styled(Box)({
	textAlign: "left"
})

const PhoneLink = styled(Link)({
	display: "inline-flex",
	alignItems: "center",
	gap: "8px",
	color: "#000",
	textDecoration: "underline"
})

const TimeContainer = styled(Box)({
	display: "flex",
	alignItems: "center",
	gap: "4px",
	marginBottom: "2px"
})

const TimeBox = styled(Box)({
	display: "inline-flex",
	alignItems: "center",
	padding: "1px 5px",
	borderRadius: "4px",
	"& .MuiTypography-root": {
		fontSize: "0.82rem",
		color: "#000"
	}
})

const LocationContainer = styled(Box)({
	display: "flex",
	alignItems: "center",
	gap: "4px",
	marginTop: "2px",
	width: "fit-content",
	maxWidth: "90%"
})

const LocationLink = styled(Link)({
	display: "inline-flex",
	alignItems: "center",
	padding: "1px 5px",
	borderRadius: "4px",
	color: "#000",
	textDecoration: "none",
	"& .MuiTypography-root": {
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
		fontSize: "0.82rem",
		color: "#000"
	}
})

// Ratings Styles
const RatingItem = styled(Box)({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-start",
	gap: "8px",
	marginBottom: "6px",
	"& img": {
		width: "20px",
		height: "20px",
		objectFit: "contain"
	},
	"& .rating-text": {
		fontSize: "0.82rem",
		color: "#000",
		whiteSpace: "nowrap",
		minWidth: "120px",
		textAlign: "left",
		textDecoration: "none",
		"&:hover": {
			textDecoration: "underline"
		}
	}
})

// Main Component
const RestaurantInfoCard = ({ restaurantInfo, reviewsRef }) => (
	<Box
		className="details-section"
		display="grid"
		gridTemplateColumns="1fr"
		alignItems="flex-start"
		gap={1}
	>
		{/* Restaurant Name */}
		<Box gridColumn="span 2">
			<Typography variant="h6" fontWeight="bold" fontSize="1.325rem" noWrap>
				{restaurantInfo.name}
			</Typography>
			<CuisineText>{restaurantInfo.cuisine.join(", ")}</CuisineText>
		</Box>

		<LogoContainer>
			<Image
				src="/coco.jpg"
				alt="Restaurant Logo"
				width={125}
				height={125}
				priority
			/>
		</LogoContainer>

		{/* Restaurant Details */}
		<RestaurantDetails>
			<DetailsColumn>
				<TimeContainer>
					<Image src="/clock-icon.png" alt="Time" width={14} height={14} />
					<TimeBox>
						<Typography variant="body2">{restaurantInfo.timing}</Typography>
					</TimeBox>
				</TimeContainer>

				<PhoneContainer>
					<PhoneLink href={`tel:${restaurantInfo.phone_no}`} underline="always">
						<PhoneIcon sx={{ fontSize: "14px" }} />
						<Typography variant="body2">{restaurantInfo.phone_no}</Typography>
					</PhoneLink>
				</PhoneContainer>

				<Box display="flex" alignItems="center">
					<PeopleIcon sx={{ mr: 1, fontSize: "14px", color: "#000" }} />
					<Typography variant="body2">
						₹{restaurantInfo.priceForTwo} for two
					</Typography>
				</Box>

				<LocationContainer>
					<Image
						src="/google-maps-icon.png"
						alt="Location"
						width={14}
						height={14}
					/>
					<LocationLink
						href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
							restaurantInfo.location
						)}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Typography variant="body2">{restaurantInfo.location}</Typography>
					</LocationLink>
				</LocationContainer>
			</DetailsColumn>
		</RestaurantDetails>

		{/* Ratings Section */}
		<Box className="ratings-section">
			{restaurantInfo.reviews.map((item, index) => {
				return (
					<Box key={index}>
						<RatingItem
							onClick={() =>
								reviewsRef.current?.scrollIntoView({ behavior: "smooth" })
							}
						>
							<Image
								src={item.logo}
								alt={item.platform}
								width={20}
								height={20}
								style={{ marginLeft: "auto" }}
							/>
							<Typography variant="body2">
								{item.rating} ({item.count})
							</Typography>
						</RatingItem>
					</Box>
				)
			})}
		</Box>
	</Box>
)

export default RestaurantInfoCard
