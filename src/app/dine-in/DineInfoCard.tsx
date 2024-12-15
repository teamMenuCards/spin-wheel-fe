import { Box, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import Image from "next/image"
import Rating from "./Rating"

// Styled Components
const RestaurantDetails = styled(Box)(({}) => ({
	display: "flex",
	flexWrap: "wrap",
	justifyContent: "space-between",
	alignItems: "flex-start",
	width: "100%",
	"& > .details-section": {
		flex: "1 1 auto",
		textAlign: "left",
		paddingRight: "16px",
		maxWidth: "100%"
	},
	"& > .ratings-section": {
		flex: "1 1 auto",
		textAlign: "center",
		marginTop: "16px",
		width: "100%"
	},
	"@media (min-width: 600px)": {
		"& > .details-section": {
			maxWidth: "calc(100% - 150px)"
		},
		"& > .ratings-section": {
			flex: "0 0 auto",
			width: "150px",
			marginTop: "0"
		}
	}
}))

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

const RatingsContainer = styled(Box)({
	display: "flex",
	flexDirection: "row",
	justifyContent: "center",
	gap: "12px",
	width: "100%"
})

const DineInfoCard = ({ restaurantInfo, reviewsRef }) => {
	const reviews = restaurantInfo.reviews || {}

	return (
		<RestaurantDetails>
			<Box className="details-section">
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
						marginBottom: "8px"
					}}
				>
					{restaurantInfo.cuisine.join(", ")}
				</Typography>
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

			<Box className="ratings-section">
				<RatingsContainer>
					<Rating
						logo="/zomato-logo.png"
						rating={reviews.zomato?.rating || "N/A"}
						onClick={() =>
							reviewsRef.current?.scrollIntoView({ behavior: "smooth" })
						}
					/>
					<Rating
						logo="/swiggy-logo.png"
						rating={reviews.swiggy?.rating || "N/A"}
						onClick={() =>
							reviewsRef.current?.scrollIntoView({ behavior: "smooth" })
						}
					/>
					<Rating
						logo="/google-logo.png"
						rating={reviews.google?.rating || "N/A"}
						onClick={() =>
							reviewsRef.current?.scrollIntoView({ behavior: "smooth" })
						}
					/>
				</RatingsContainer>
			</Box>
		</RestaurantDetails>
	)
}

export default DineInfoCard
