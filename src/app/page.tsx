"use client"

import React from "react"
import { Box, styled } from "@mui/material"
import LandingPage from "./LandingPage"

const StyledContainer = styled(Box)(() => ({
	backgroundColor: "#EBEEF1"
}))

const message = "Hi. I want to enquire about the subscription plan"
const encodedMessage = encodeURIComponent(message)

const list = [
	{
		id: 1,
		value: "Place Direct Order (Menu)",
		path: "/dashboard"
	},
	{
		id: 2,
		value: "Subscription Enquiry",
		path: `https://wa.me/919324995221?text=${encodedMessage}`
	},
	{
		id: 3,
		value: "Whatsapp us!",
		path: `https://wa.me/919324995221`
	},
	{
		id: 4,
		value: "Follow on Instagram!",
		path: "https://www.instagram.com/thegreenbowl_co/"
	}
]

export default function Home() {
	return (
		<>
			<StyledContainer
				sx={{
					px: 3,
					height: "100vh",
					textAlign: "center"
				}}
			>
				
				<LandingPage list={list} />
			</StyledContainer>
		</>
	)
}
