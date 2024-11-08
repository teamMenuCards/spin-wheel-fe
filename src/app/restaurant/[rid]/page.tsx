"use client"
import axios from "axios"
import React from "react"
import { Box } from "@mui/material"
import LandingPage from "@mcc/app/LandingPage"
import { styled } from "@mui/material/styles"

const instance = axios.create({
	baseURL: "http://localhost:4200/",
	timeout: 1000
})

const message = "Hi. I want to enquire about the subscription plan"
const encodedMessage = encodeURIComponent(message)

async function getProjects(rid: string) {
	try {
		const res = await instance.get(`/restaurants/menu-details/${rid}`)
		const data = await res.data.data
		console.log("Response Data:", data)
		return data
	} catch (error) {
		console.log("Fetch error:", error)
		return {}
	}
}

const getPath = (rid) => {
	console.log("getPath called with rid:", rid)

	const list = [
		{
			id: 1,
			value: "Place Direct Order (Menu)",
			path: `/restaurant/${rid}/menu`
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
			path: "https://www.instagram.com/"
		}
	]

	return list
}

const StyledContainer = styled(Box)(() => ({
	backgroundColor: "#EBEEF1"
}))

export default function Page({ params }: { params: { rid: string } }) {
	const [restData, setRestData] = React.useState(null)

	React.useEffect(() => {
		async function fetchData() {
			const data = await getProjects(params.rid)
			window?.localStorage.setItem("Resto_Id", params.rid)
			setRestData(data)
		}
		fetchData()
	}, [params.rid])

	console.log("restData==", restData)

	// Call getPath directly and pass the list
	const list = getPath(params.rid)

	return (
		<StyledContainer
			sx={{
				px: 3,
				height: "100vh",
				textAlign: "center"
			}}
		>
			<LandingPage list={list} />
		</StyledContainer>
	)
}
