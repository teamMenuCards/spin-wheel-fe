import React from "react"
import { styled, Box, Typography } from "@mui/material"

const CardContainer = styled(Box)(({ theme, disabled }) => ({
	border: "1px solid #ccc",
	borderRadius: "5px",
	overflow: "hidden",
	maxWidth: "400px",
	...(disabled && {
		backgroundColor: "red",
		opacity: 0.5,
		pointerEvents: "none"
	})
}))

const HalfContainer = styled(Box)({
	padding: "10px 10px"
})

const Link = styled("a")({
	textDecoration: "none",
	color: "#000",
	"&:hover": {
		textDecoration: "underline"
	}
})

const DividedCard = ({
	text,
	linkText,
	disabled,
	onClick,
	bgColor = "green",
	...item
}) => {
	return (
		<CardContainer disabled={!disabled}>
			{/* First Half */}
			<HalfContainer sx={{ backgroundColor: "white" }}>
				<Typography variant="SPP_Caption" color="secondary">
					{text}
				</Typography>
			</HalfContainer>

			{/* Second Half */}
			<HalfContainer
				sx={{
					backgroundColor: bgColor ? bgColor : "primary.main",
					textAlign: "center"
				}}
			>
				<Typography
					onClick={() => onClick(item.value)}
					variant="SPP_Caption"
					color="primary.contrastText"
				>
					{linkText}
				</Typography>
				{/* <Link
					href={linkUrl}
					target="_blank"
					rel="noopener noreferrer"
					style={{ pointerEvents: disabled ? "none" : "auto" }}
				>
					<Typography variant="SPP_Caption" color="primary.contrastText">
						{linkText}
					</Typography>
				</Link> */}
			</HalfContainer>
		</CardContainer>
	)
}

export default DividedCard
