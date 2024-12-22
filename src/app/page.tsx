"use client"

import React, { useState } from "react"
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Box,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemText,
	Grid,
	useTheme,
	useMediaQuery,
	Container,
	Paper
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import Image from "next/image"
import { styled } from "@mui/material/styles"
import { motion } from "framer-motion"
import CheckIcon from "@mui/icons-material/Check"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

// Styled Components
const Header = styled(AppBar)(({ theme }) => ({
	position: "fixed",
	top: 0,
	left: 0,
	right: 0,
	backgroundColor: "white",
	boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
	zIndex: 1200,
	padding: theme.spacing(0, 2)
}))

const NavLinks = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "flex-end",
	flexGrow: 1,
	"& > a": {
		marginLeft: theme.spacing(3),
		color: "#000",
		textDecoration: "none",
		fontWeight: "bold",
		"&:hover": {
			textDecoration: "underline"
		}
	},
	[theme.breakpoints.down("md")]: {
		display: "none"
	}
}))

const HeroSection = styled(Box)(({ theme }) => ({
	//marginTop: theme.spacing(12),
	padding: theme.spacing(3),
	paddingTop: theme.spacing(14),
	[theme.breakpoints.down("sm")]: {
		//marginTop: theme.spacing(8)
	}
}))

const FeaturesSection = styled(Container)(({ theme }) => ({
	//marginTop: theme.spacing(5),
	padding: theme.spacing(10),
	backgroundColor: theme.palette.grey[50],
	//paddingTop: theme.spacing(10),
	textAlign: "center"
}))

const FeatureBox = styled(Box)(({ theme }) => ({
	padding: theme.spacing(3),
	border: "1px solid #e0e0e0",
	borderRadius: theme.spacing(2),
	textAlign: "center",
	boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
	"&:hover": {
		transform: "scale(1.05)",
		transition: "transform 0.3s"
	}
}))

const ComparisonSection = styled(Box)(({ theme }) => ({
	paddingTop: theme.spacing(10),
	padding: theme.spacing(3),
	[theme.breakpoints.down("sm")]: {
		// Add any specific styles for mobile if needed
		marginTop: theme.spacing(6)
	}
}))

const PricingSection = styled(Box)(({ theme }) => ({
	padding: theme.spacing(3),
	paddingTop: theme.spacing(10),
	backgroundColor: theme.palette.grey[50],
	[theme.breakpoints.down("sm")]: {
		marginTop: theme.spacing(6)
	}
}))

const PricingCard = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(4),
	borderRadius: theme.spacing(2),
	textAlign: "center",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	position: "relative"
}))

const PlanFeatures = styled("ul")(({ theme }) => ({
	listStyle: "none",
	padding: 0,
	marginTop: theme.spacing(2),
	textAlign: "left"
}))

const FeatureItem = styled("li")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	marginBottom: theme.spacing(1),
	color: "#444",
	fontSize: "0.9rem"
}))

const Footer = styled(Box)(({ theme }) => ({
	textAlign: "center",
	padding: theme.spacing(2),
	//marginTop: theme.spacing(5),
	backgroundColor: "#f0f0f0"
}))

const CallToActionButton = styled(Button)(({ theme }) => ({
	borderRadius: theme.spacing(2.5),
	backgroundColor: "white",
	color: "black",
	padding: theme.spacing(1.5, 3),
	fontWeight: "bold",
	boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
	textTransform: "none",
	"&:hover": {
		backgroundColor: "#f0f0f0"
	}
}))

const navLinks = ["Home", "Features", "Sample Menu", "Pricing"]

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

const featureHighlight = (index, plan) => {
	// green ticks logic for features
	if (plan === "pro" && index <= 5) return true
	if (plan === "advanced" && index <= 10) return true
	if (plan === "premium") return true
	return false
}

const carouselSettings = {
	showArrows: false,
	autoPlay: true,
	infiniteLoop: true,
	interval: 3000,
	showThumbs: false,
	showStatus: false,
	showIndicators: false
}

export default function Home() {
	const [drawerOpen, setDrawerOpen] = useState(false)
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

	const toggleDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return
		}
		setDrawerOpen(open)
	}

	return (
		<>
			<Header>
				<Toolbar>
					<Image
						src="/menu-cards-logo.png"
						alt="MenuCards Logo"
						width={100}
						height={40}
					/>
					<NavLinks>
						{navLinks.map((link) => (
							<Typography
								key={link}
								variant="body1"
								component="a"
								href={`#${link.toLowerCase()}`}
								sx={{
									cursor: "pointer",
									marginLeft: theme.spacing(3),
									color: "#000",
									textDecoration: "none",
									fontWeight: "bold",
									"&:hover": {
										textDecoration: "underline"
									}
								}}
							>
								{link}
							</Typography>
						))}
					</NavLinks>
					<IconButton
						edge="end"
						color="default"
						aria-label="menu"
						onClick={toggleDrawer(true)}
						sx={{
							display: { xs: "flex", sm: "none" },
							position: "absolute",
							right: theme.spacing(2)
						}}
					>
						<MenuIcon sx={{ color: "#000" }} />
					</IconButton>
				</Toolbar>
			</Header>

			<Drawer
				anchor="right"
				open={drawerOpen}
				onClose={toggleDrawer(false)}
				sx={{
					"& .MuiBackdrop-root": {
						backgroundColor: "rgba(0, 0, 0, 0.5)"
					},
					width: "100%", // Make drawer full width on small screens
					maxWidth: "100vw" // Prevent overflow beyond the screen
				}}
			>
				<Box
					sx={{ width: 250 }}
					role="presentation"
					onClick={toggleDrawer(false)}
					onKeyDown={toggleDrawer(false)}
				>
					<List>
						{navLinks.map((link) => (
							<ListItem
								button
								key={link}
								onClick={() => {
									const element = document.getElementById(link.toLowerCase());
									if (element) {
										element.scrollIntoView({ behavior: "smooth" });
									}
								}}
							>
								<ListItemText primary={link} />
							</ListItem>
						))}
					</List>
				</Box>
			</Drawer>

			<HeroSection id="home">
				<Typography
					variant={isMobile ? "h4" : "h3"}
					fontWeight="bold"
					textAlign="center"
					mb={3}
				>
					Revolutionize Your Restaurant’s Online Presence with MenuCard
				</Typography>

				{isMobile ? (
					<>
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							mb={3}
						>
							<motion.div
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
							>
								<Image
									src="/mockup.png"
									alt="Menu Mockup showing food items"
									width={250}
									height={450}
									priority
								/>
							</motion.div>
						</Box>

						<Typography variant="h5" fontWeight="bold" mb={2}>
							Save 30% in Commissions
						</Typography>
						<Typography variant="body1" mb={3}>
							Skip Zomato and Swiggy commissions. Take direct orders and
							maximize your profits.
						</Typography>

						<CallToActionButton
							variant="contained"
							endIcon={
								<Image
									src="/pointer-icon.png"
									alt="Pointer Icon"
									width={20}
									height={25}
								/>
							}
						>
							Start with free version today
						</CallToActionButton>
					</>
				) : (
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<Typography variant="h5" fontWeight="bold" mb={3}>
								Save 30% in Commissions
							</Typography>
							<Typography variant="body1" mb={2}>
								Skip Zomato and Swiggy commissions. Take direct orders and
								maximize your profits.
							</Typography>
							<CallToActionButton
								variant="contained"
								endIcon={
									<Image
										src="/pointer-icon.png"
										alt="Pointer Icon"
										width={20}
										height={25}
									/>
								}
							>
								Start with free version today
							</CallToActionButton>
						</Grid>
						<Grid item xs={12} md={6}>
							<Box display="flex" justifyContent="center" alignItems="center">
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.5 }}
								>
									<Image
										src="/mockup.png"
										alt="Menu Mockup showing food items"
										width={300}
										height={550}
										priority
									/>
								</motion.div>
							</Box>
						</Grid>
					</Grid>
				)}
			</HeroSection>

			<FeaturesSection id="features">
				<Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
					Why Choose MenuCard?
				</Typography>

				<Grid container spacing={4} justifyContent="center">
					<Grid item xs={12} sm={6} md={4}>
						<FeatureBox>
							<Image
								src="/feature-icon1.png"
								alt="Feature Icon 1"
								width={60}
								height={60}
								style={{ marginBottom: "16px" }}
							/>
							<Typography variant="h6" fontWeight="bold" mb={1}>
								Food Item Rating
							</Typography>
							<Typography variant="body2" color="textSecondary" mb={2}>
								Let your old customers rate food and help new ones discover the
								best sellers.
							</Typography>
						</FeatureBox>
					</Grid>

					<Grid item xs={12} sm={6} md={4}>
						<FeatureBox>
							<Image
								src="/feature-icon2.png"
								alt="Feature Icon 2"
								width={60}
								height={60}
								style={{ marginBottom: "16px" }}
							/>
							<Typography variant="h6" fontWeight="bold" mb={1}>
								Marketing Returns
							</Typography>
							<Typography variant="body2" color="textSecondary" mb={2}>
								Don’t just blindly spend on marketing. With MenuCards, figure
								out the ROI of your efforts.
							</Typography>
						</FeatureBox>
					</Grid>

					<Grid item xs={12} sm={6} md={4}>
						<FeatureBox>
							<Image
								src="/feature-icon3.png"
								alt="Feature Icon 3"
								width={60}
								height={60}
								style={{ marginBottom: "16px" }}
							/>
							<Typography variant="h6" fontWeight="bold" mb={1}>
								Customer Feedback
							</Typography>
							<Typography variant="body2" color="textSecondary" mb={2}>
								Ensure that customers leaving your restaurant are happy and
								satisfied.
							</Typography>
						</FeatureBox>
					</Grid>

					<Grid item xs={12} sm={6} md={4}>
						<FeatureBox>
							<Image
								src="/feature-icon4.png"
								alt="Feature Icon 4"
								width={60}
								height={60}
								style={{ marginBottom: "16px" }}
							/>
							<Typography variant="h6" fontWeight="bold" mb={1}>
								Social Media Sharing
							</Typography>
							<Typography variant="body2" color="textSecondary" mb={2}>
								Easily share your best items and offers on social media,
								directly from your MenuCard.
							</Typography>
						</FeatureBox>
					</Grid>
				</Grid>
			</FeaturesSection>

			<ComparisonSection id="sample menu">
				<Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
					Why use MenuCards instead of Linktree?
				</Typography>
				<Box mt={4} mb={4} textAlign="center">
					<Typography variant="body1" fontWeight="bold">
						Move beyond static links - Make a better impression of your
						restaurant with menu cards within seconds.
					</Typography>
				</Box>

				<Grid
					container
					spacing={4}
					alignItems="center"
					justifyContent="center"
					sx={{ mt: 4 }}
				>
					{/* Linktree Section */}
					{isMobile ? (
						<Carousel {...carouselSettings}>
							<div>
								<Box
									sx={{
										textAlign: "center",
										width: "100%"
									}}
								>
									<Typography variant="h5" fontWeight="bold" mb={2}>
										Linktree
									</Typography>
									<Box
										sx={{
											width: "100%",
											maxWidth: 250,
											margin: "0 auto"
										}}
									>
										<Image
											src="/linktreeUI.png"
											alt="Linktree UI"
											width={250}
											height={500}
											style={{
												objectFit: "contain",
												width: "100%",
												height: "auto"
											}} // Maintain aspect ratio
										/>
									</Box>
								</Box>
							</div>

							<div>
								<Box
									sx={{
										textAlign: "center",
										width: "100%"
									}}
								>
									<Typography variant="h5" fontWeight="bold" mb={2}>
										MenuCards
									</Typography>
									<Box
										sx={{
											width: "100%",
											maxWidth: 250,
											margin: "0 auto"
										}}
									>
										<Image
											src="/MenuCardsUI.png"
											alt="MenuCards UI"
											width={250}
											height={500}
											style={{
												objectFit: "contain",
												width: "100%",
												height: "auto"
											}} // Maintain aspect ratio
										/>
									</Box>
								</Box>
							</div>
						</Carousel>
					) : (
						<>
							{/* Original Grid for larger screens */}
							<Grid item xs={12} md={5}>
								<Box
									sx={{
										borderRadius: 2,
										p: 2,
										textAlign: "center",
										boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
										width: "100%",
										boxSizing: "border-box"
									}}
								>
									<Typography variant="h5" fontWeight="bold" mb={2}>
										Linktree
									</Typography>
									<Box
										sx={{
											width: "100%",
											maxWidth: 250,
											margin: "0 auto"
										}}
									>
										<Image
											src="/linktreeUI.png"
											alt="Linktree UI"
											width={250}
											height={500}
											style={{
												objectFit: "contain",
												width: "100%",
												height: "auto"
											}} // Maintain aspect ratio
										/>
									</Box>
								</Box>
							</Grid>

							<Grid item xs={12} md={2} textAlign="center">
								<Typography variant="h5" fontWeight="bold">
									vs
								</Typography>
							</Grid>

							{/* MenuCards Section */}
							<Grid item xs={12} md={5}>
								<Box
									sx={{
										borderRadius: 2,
										p: 2,
										textAlign: "center",
										boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
										width: "100%",
										boxSizing: "border-box"
									}}
								>
									<Typography variant="h5" fontWeight="bold" mb={2}>
										MenuCards
									</Typography>
									<Box
										sx={{
											width: "100%",
											maxWidth: 250,
											margin: "0 auto"
										}}
									>
										<Image
											src="/MenuCardsUI.png"
											alt="MenuCards UI"
											width={250}
											height={500}
											style={{
												objectFit: "contain",
												width: "100%",
												height: "auto"
											}} // Maintain aspect ratio
										/>
									</Box>
								</Box>
							</Grid>
						</>
					)}
				</Grid>
			</ComparisonSection>

			<PricingSection id="pricing">
				<Typography
					variant="h4"
					fontWeight="bold"
					mb={4}
					textAlign="center"
					style={{ paddingBottom: "10px" }}
				>
					Our Pricing Plans
				</Typography>

				<Grid container spacing={3} justifyContent="center">
					{/* Pro Plan */}
					<Grid item xs={12} sm={6} md={4}>
						<PricingCard elevation={3}>
							<Box bgcolor="#2E7D32" color="#fff" p={1} borderRadius={1} mb={2}>
								<Typography variant="h6">Pro</Typography>
							</Box>
							{/* <Typography variant="h4" fontWeight="bold">₹799<span style={{ fontSize: "1rem" }}>/month</span>
							</Typography> */}
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
								Transition from paper menus to beautiful mobile menus with QR
								codes.
							</Typography>
							<PlanFeatures>
								{features.map((item, index) => (
									<FeatureItem key={index}>
										{/* Check if the feature should have a green tick */}
										<CheckIcon
											sx={{
												color: featureHighlight(index, "pro")
													? "#2E7D32"
													: "#ddd",
												mr: 1
											}}
										/>

										<span
											style={{
												fontWeight: featureHighlight(index, "pro")
													? "bold"
													: "normal"
											}}
										>
											{item}
										</span>
									</FeatureItem>
								))}
							</PlanFeatures>

							<Box display="flex" justifyContent="center" alignItems="center">
								<Button
									variant="contained"
									color="success"
									sx={{
										textTransform: "none",
										width: "auto",
										minWidth: "150px",
										padding: "8px 16px"
									}}
								>
									Select
								</Button>
							</Box>
						</PricingCard>
					</Grid>

					{/* Advanced Plan */}
					<Grid item xs={12} sm={6} md={4}>
						<PricingCard
							elevation={3}
							sx={{
								// border, background color, and shadow to highlight the selected plan
								border: "2px solid #FB8C00",
								backgroundColor: "#FFF3E0",
								boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
							}}
						>
							<Box bgcolor="#FB8C00" color="#fff" p={1} borderRadius={1} mb={2}>
								<Typography variant="h6">Advanced</Typography>
							</Box>
							<Typography variant="h4" fontWeight="bold">
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
								Get your online ordering site integrated with logistics
								partners.
							</Typography>
							<PlanFeatures>
								{features.map((item, index) => (
									<FeatureItem key={index}>
										<CheckIcon
											sx={{
												color: featureHighlight(index, "advanced")
													? "#2E7D32"
													: "#ddd",
												mr: 1
											}}
										/>
										<span
											style={{
												fontWeight: featureHighlight(index, "advanced")
													? "bold"
													: "normal"
											}}
										>
											{item}
										</span>
									</FeatureItem>
								))}
							</PlanFeatures>
							<Box display="flex" justifyContent="center" alignItems="center">
								<Button
									variant="contained"
									color="success"
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
											boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.15)"
										}
									}}
								>
									Selected
								</Button>
							</Box>
						</PricingCard>
					</Grid>

					{/* Premium Plan */}
					<Grid item xs={12} sm={6} md={4}>
						<PricingCard elevation={3}>
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
								For brands that want it all! Full customization and advanced
								features.
							</Typography>
							<PlanFeatures>
								{features.map((item, index) => (
									<FeatureItem key={index}>
										<CheckIcon
											sx={{
												color: featureHighlight(index, "premium")
													? "#2E7D32"
													: "#ddd",
												mr: 1
											}}
										/>

										<span
											style={{
												fontWeight: featureHighlight(index, "premium")
													? "bold"
													: "normal"
											}}
										>
											{item}
										</span>
									</FeatureItem>
								))}
							</PlanFeatures>

							<Box display="flex" justifyContent="center" alignItems="center">
								<Button
									variant="contained"
									color="success"
									sx={{
										textTransform: "none",
										width: "auto",
										minWidth: "150px",
										padding: "8px 16px"
									}}
								>
									Select
								</Button>
							</Box>
						</PricingCard>
					</Grid>
				</Grid>
			</PricingSection>

			<Footer>
				<Typography variant="body2">
					© 2024 MenuCards. All rights reserved.
				</Typography>
			</Footer>
		</>
	)
}
