import { Box, Link, Typography } from "@mui/material"
import NextLink from "next/link"
import { styled } from "@mui/material/styles"
import Image from "next/image"

const MenuOptionsContainer = styled(Box)({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	width: "100%",
	maxWidth: "400px",
	margin: "32px auto 0",
	padding: "0 16px",
	position: "relative",
	"&::before": {
		content: '""',
		position: "absolute",
		top: -16,
		left: 0,
		right: 0,
		height: "1px",
		background:
			"linear-gradient(to right, transparent, rgba(0,0,0,0.05), transparent)"
	}
})

const MenuButton = styled(Box)({
	display: "flex",
	alignItems: "center",
	padding: "16px 24px",
	backgroundColor: "white",
	borderRadius: "12px",
	marginBottom: "12px",
	boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
	width: "100%",
	maxWidth: "400px",
	margin: "0 auto 16px",
	transition: "all 0.3s ease",
	cursor: "pointer",
	position: "relative",
	border: "1px solid rgba(0,0,0,0.05)",
	backdropFilter: "blur(8px)",
	"&:hover": {
		boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
		transform: "translateY(-2px)",
		backgroundColor: "#fafafa"
	},
	"& img": {
		marginRight: "16px",
		filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
		borderRadius: "4px"
	},
	"& .MuiTypography-root": {
		color: "#2e2e2e",
		fontWeight: 600,
		position: "absolute",
		left: "50%",
		transform: "translateX(-50%)",
		width: "auto",
		fontSize: "0.95rem"
	}
})

// Main Component
const DineInButtons = ({ options }) => (
	<MenuOptionsContainer>
		{options?.map((item, index) => (
			<Link
				key={index}
				href={item.path}
				component={NextLink}
				underline="none"
				style={{ width: "100%" }}
			>
				<MenuButton>
					{item.value === "Menu" && (
						<Image src="/menu-icon.png" alt="Menu" width={24} height={24} />
					)}
					{item.value === "Review us on Zomato" && (
						<Image
							src="/zomato-logo.png"
							alt="Reserve"
							width={24}
							height={24}
						/>
					)}
					{item.value === "Review us on Google" && (
						<Image
							src="/google-logo.png"
							alt="Website"
							width={24}
							height={24}
						/>
					)}
					{item.value === "Instagram" && (
						<Image
							src="/instagram-icon.png"
							alt="WhatsApp"
							width={24}
							height={24}
						/>
					)}
					<Typography variant="body1">{item.value}</Typography>
				</MenuButton>
			</Link>
		))}
	</MenuOptionsContainer>
)

export default DineInButtons
