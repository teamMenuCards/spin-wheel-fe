"use client"

import React from "react"
import { Toolbar, Box } from "@mui/material"
import MenuNavBar from "@mcc/fragments/MenuBar"

interface Props {
	children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
	return (
		<Box p={1}>
			<MenuNavBar />

			<Box component="main" sx={{ flexGrow: 1 }}>
				<Toolbar />

				{children}
			</Box>
		</Box>
	)
}
