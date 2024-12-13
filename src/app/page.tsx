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
	useMediaQuery
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import Image from "next/image"
import { styled } from "@mui/material/styles"
import { motion } from "framer-motion"

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
	marginTop: theme.spacing(12),
	padding: theme.spacing(3),
	[theme.breakpoints.down("sm")]: {
		marginTop: theme.spacing(8)
	}
}))

const Footer = styled(Box)(({ theme }) => ({
	textAlign: "center",
	padding: theme.spacing(2),
	marginTop: theme.spacing(5),
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
								href={`#${link.toLowerCase().replace(" ", "-")}`}
							>
								{link}
							</Typography>
						))}
					</NavLinks>
					<IconButton
						edge="end"
						color="inherit"
						aria-label="menu"
						onClick={toggleDrawer(true)}
						sx={{ display: { xs: "flex", sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</Header>

			<Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
				<Box
					sx={{ width: 250 }}
					role="presentation"
					onClick={toggleDrawer(false)}
					onKeyDown={toggleDrawer(false)}
				>
					<List>
						{navLinks.map((link) => (
							<ListItem button key={link}>
								<ListItemText primary={link} />
							</ListItem>
						))}
					</List>
				</Box>
			</Drawer>

			<HeroSection>
				<Typography
					variant={isMobile ? "h4" : "h3"}
					fontWeight="bold"
					textAlign="center"
					mb={6}
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
							<Typography variant="h5" fontWeight="bold" mb={1}>
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
									/>
								</motion.div>
							</Box>
						</Grid>
					</Grid>
				)}
			</HeroSection>

			<Footer>
				<Typography variant="body2">
					© 2024 MenuCards. All rights reserved.
				</Typography>
			</Footer>
		</>
	)
}
