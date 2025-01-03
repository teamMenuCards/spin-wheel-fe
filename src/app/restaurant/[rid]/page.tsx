"use client"
import axios from "axios"
import React from "react"
import { Box } from "@mui/material"
import LandingPage from "@mcc/app/LandingPage"
import { styled } from "@mui/material/styles"
import { useRestaurantDetails } from "@mcc/context"

const instance = axios.create({
	baseURL: "http://localhost:4200/",
	timeout: 1000
})

// const message = "Hi. I want to enquire about the subscription plan"
// const encodedMessage = encodeURIComponent(message)

async function getProjects(rid: string) {
	try {
		const res = await instance.get(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/restaurants/${rid}/details`
		)
		const data = await res.data.data
		console.log("Response Data:", data)
		return data
	} catch (error) {
		console.log("Fetch error:", error)
		return {}
	}
}

const getPath = (rid: string) => {
	console.log("getPath called with rid:", rid)

	const options = [
		{
			id: 1,
			value: "Menu",
			path: `/restaurant/${rid}/menu`
		},
		{
			id: 2,
			value: "Zomato",
			path: "https://www.zomato.com/mumbai/caramel-coco-dadar-shivaji-park/order"
		},
		{
			id: 3,
			value: "Swiggy",
			path: "https://www.swiggy.com/city/mumbai/caramel-and-coco-mahim-dadar-rest947982"
		},
		{
			id: 4,
			value: "Whatsapp us!",
			path: "https://wa.me/9821404990"
		}
	]

	return options
}

const StyledContainer = styled(Box)(() => ({
	width: "100%",
	minHeight: "100vh",
	backgroundColor: "white"
}))

export default function Page({ params }: { params: { rid: string } }) {
	const { restaurantDetails, setRestaurantDetails } = useRestaurantDetails()

	const restaurantInfo = {
		name: "Caramel & Coco",
		cuisine: ["Bakery, Desserts"],
		reviews: [
			{
				platform: "Zomato",
				rating: 4.2,
				count: 12,
				logo: "/zomato-logo.png"
			},
			{
				platform: "Swiggy",
				rating: 4.7,
				count: 20,
				logo: "/swiggy-logo.png"
			},
			{
				platform: "Google",
				rating: 4.7,
				count: 20,
				logo: "/google-logo.png"
			}
		],
		timing: "11:00 am - 08:30 pm",
		phone_no: "",
		location: "Dadar Shivaji Park, Mumbai",
		priceForTwo: 300
	}

	React.useEffect(() => {
		async function fetchData() {
			const data = await getProjects(params.rid)
			setRestaurantDetails(data)
			window?.localStorage.setItem("Resto_Id", data.id)
		}
		fetchData()
	}, [params.rid])

	const options = getPath(params.rid)

	return (
		<StyledContainer>
			<LandingPage
				options={options}
				restaurantInfo={{ ...restaurantInfo, ...restaurantDetails?.detail }}
			/>
		</StyledContainer>
	)
}
