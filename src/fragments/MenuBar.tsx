"use client"

import React from "react"
import Image from "next/image"
import {
	Box,
	AppBar as MuiAppBar,
	IconButton,
	Toolbar,
	styled
} from "@mui/material"
import CancelIcon from "@mui/icons-material/CancelOutlined"
import useToggle from "@mcc/hooks/useToggle"
import ContactUsDrawer from "@mcc/app/restaurant/[rid]/menu/contact-us-drawer"

const StyledLogo = styled(Box)(() => ({
	height: "45px",
	width: "55px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center"
}))

export const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "authState"
})(({ theme }) => ({
	borderLeft: "none",
	zIndex: theme.zIndex.drawer + 1,
	backgroundColor: theme.palette.background.paper,
	maxWidth: "100vw",
	[theme.breakpoints.up("xl")]: {
		maxWidth: "100vw"
	}
}))

function MenuNavBar() {
	const {
		isOpen: openContactUs,
		open: setContactUs,
		close: closeContactUs
	} = useToggle(false)

	return (
		<AppBar elevation={0} position="fixed" variant="outlined">
			<Toolbar>
				<Box ml={2} sx={{ flexGrow: 1 }} />

				{/* Logo */}
				{openContactUs ? (
					<StyledLogo>
						<IconButton onClick={closeContactUs} sx={{ padding: 0 }}>
							<CancelIcon />
						</IconButton>
					</StyledLogo>
				) : (
					<IconButton onClick={setContactUs} sx={{ padding: 0 }}>
						<Image
							src="/coco.jpg"
							alt="App Logo"
							width={55}
							height={45}
							priority
						/>
					</IconButton>
				)}

				<ContactUsDrawer isOpen={openContactUs} />
			</Toolbar>
		</AppBar>
	)
}

export default MenuNavBar
