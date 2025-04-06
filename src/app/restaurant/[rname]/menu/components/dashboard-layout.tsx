"use client"

import React from "react"
// import MenuNavBar from "@mcc/fragments/MenuBar"

interface Props {
	children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
	return (
		<div className="p-4">
			{/* <MenuNavBar /> */}

			<main className="flex-grow">
				<div className="h-16" />
				{children}
			</main>
		</div>
	)
}
