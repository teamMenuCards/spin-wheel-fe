"use client"

import React from "react"
import {
	AppBar as MuiAppBar,
	IconButton,
	Typography,
	Toolbar,
	styled
} from "@mui/material"
import { useRouter } from "next/navigation"
import { ArrowBackIosNew as BackIcon } from "@mui/icons-material"

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
export default function NavBar({ backLink }: { backLink?: string }) {
	const router = useRouter()

	return (
		<>
			<AppBar elevation={0} position="fixed" variant="outlined">
				<Toolbar>
					<IconButton
						color="secondary"
						onClick={() => (backLink ? router.push(backLink) : router.back())}
					>
						<BackIcon fontSize="small" />
					</IconButton>
					<Typography variant="SPP_H6" color="secondary">
						The Green Bowl
					</Typography>
				</Toolbar>
			</AppBar>
		</>
	)
}
