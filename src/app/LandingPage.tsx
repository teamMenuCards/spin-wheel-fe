import NextLink from "next/link"
import Image from "next/image"
import { Box, styled, Typography, Link } from "@mui/material"

const StyledImgContainer = styled(Box)({
	width: "130px",
	height: "120px",
	borderRadius: "50%",
	overflow: "hidden",
	backgroundImage: 'url("/logo.png")',
	backgroundSize: "cover",
	backgroundPosition: "center",
	margin: "auto"
})

const MenuContainer = styled(Box)(({ theme }) => ({
	borderRadius: "20px",
	backgroundColor: theme.palette.primary.contrastText
}))

function LandingPage({ list }) {
	return (
		<Box pt={8}>
			<StyledImgContainer mb={2} mt={2}>
				<Image
					src="/logo_green_bg.jpeg"
					alt="App Logo"
					width={130}
					height={120}
					priority
				/>
			</StyledImgContainer>

			<Typography mt={2} variant="SPP_H4" color="secondary">
				The Green Bowl
			</Typography>

			<Box mt={4}>
				{list &&
					list.map((item, index) => {
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
