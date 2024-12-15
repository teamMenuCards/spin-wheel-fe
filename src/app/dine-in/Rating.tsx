import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import Image from "next/image"

const theme = {
	colors: {
		darkGreen: "#2E7D32"
	}
}

const RatingItem = styled(Box)({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: "8px",
	cursor: "pointer"
})

const RatingBox = styled(Box)(() => ({
	display: "flex",
	alignItems: "center",
	gap: "4px",
	backgroundColor: theme.colors.darkGreen,
	color: "#fff",
	padding: "2px 8px",
	borderRadius: "4px",
	fontSize: "0.875rem",
	fontWeight: "bold",
	"& .MuiSvgIcon-root": {
		fontSize: "1rem",
		color: "#fff"
	}
}))

const Rating = ({ logo, rating, onClick }) => (
	<RatingItem onClick={onClick} aria-label="Scroll to reviews">
		<Image
			src={logo}
			alt="Rating Logo"
			width={24}
			height={24}
			style={{ marginLeft: "auto", borderRadius: "4px" }}
		/>
		<RatingBox>
			{rating}
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
)

export default Rating
