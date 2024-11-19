"use client"
import NextLink from "next/link"
import Image from "next/image"
import { Box, Typography, Link } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledImgContainer = styled(Box)({
	width: "130px",
	height: "120px",
	borderRadius: "50%",
	overflow: "hidden",
	backgroundImage: 'url("/coco.jpg")',
	backgroundSize: "cover",
	backgroundPosition: "center",
	margin: "auto"
})

const MenuContainer = styled(Box)(({ theme }) => ({
	borderRadius: "20px",
	backgroundColor: theme.palette.primary.contrastText
}))

function LandingPage({ options }) {
	return (
		<Box pt={8}>
			<StyledImgContainer mb={2} mt={2}>
				<Image
					// src="/logo_green_bg.jpeg"
					src="/coco.jpg"
					alt="App Logo"
					width={130}
					height={120}
					priority
				/>
			</StyledImgContainer>

			<Typography mt={2} variant="SPP_H4" color="secondary">
				{/* The Green Bowl */}
				Caramel and Coco
			</Typography>

			<Box mt={4}>
				{options &&
					options.map((item, index) => {
						return (
							<MenuContainer
								key={index}
								sx={{
									borderRadius: "20px"
								}}
								p={2}
								my={2}
								className={item.showGlow ? "glowContainer" : ""}
							>
								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center"
									}}
								>
									<Link href={item.path} component={NextLink} underline="none">
										<Typography color="secondary" key={item.value}>
											{item.value}
										</Typography>
									</Link>
								</Box>
							</MenuContainer>
						)
					})}
			</Box>
		</Box>
	)
}

export default LandingPage
