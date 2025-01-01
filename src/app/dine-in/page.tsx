"use client"
import axios from 'axios';
import React from 'react';

import LandingPage from '@mcc/app/dine-in/DineInLandingPage';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const instance = axios.create({
	baseURL: "http://localhost:4200/",
	timeout: 1000
})

// const message = "Hi. I want to enquire about the subscription plan"
// const encodedMessage = encodeURIComponent(message)

async function getProjects(rid: string) {
	try {
		const res = await instance.get(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/restaurants/menu-details/${rid}`
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
			value: "Review us on Zomato",
			path: "https://www.zomato.com/mumbai/caramel-coco-dadar-shivaji-park/order"
		},
		{
			id: 3,
			value: "Review us on Google",
			path: "https://g.co/kgs/zmFTdqy"
		},
		{
			id: 4,
			value: "Instagram",
			path: "https://www.instagram.com/caramel_nd_coco/"
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
	const [restData, setRestData] = React.useState(null)

	const restaurantInfo = {
		name: "Caramel & Coco",
		cuisine: ["Bakery, Desserts"],
		reviews: {
			zomato: { rating: 4.2, count: " 12 " },
			swiggy: { rating: 4.7, count: " 16 " },
			google: { rating: 4.9, count: " 14 " }
		},
		timing: "11:00 am - 08:30 pm",
		phone: "9821404990",
		location: "Dadar Shivaji Park, Mumbai",
		priceForTwo: 300
	}

	React.useEffect(() => {
		async function fetchData() {
			const data = await getProjects(params.rid)
			window?.localStorage.setItem("Resto_Id", params.rid)
			setRestData(data)
		}
		fetchData()
	}, [params.rid])

	console.log("restData==", restData)

	const options = getPath(params.rid)

	return (
		<StyledContainer>
			<DineInLandingPage options={options} restaurantInfo={restaurantInfo} />
		</StyledContainer>
	)
}
