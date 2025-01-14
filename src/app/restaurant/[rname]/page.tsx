"use client"
import React from "react"
// import { Box } from "@mui/material"
// import { styled } from "@mui/material/styles"
import DineInLandingPage from './components/DineInLandingPage'
import { useParams } from 'next/navigation';
import { useGetRestaurantDetailByNameQuery } from '@/services/restaurant/get-restaurant-detail';



// const message = "Hi. I want to enquire about the subscription plan"
// const encodedMessage = encodeURIComponent(message)


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



export default function Page({ params }: { params: { rid: string } }) {
	
	    const { rname } = useParams<{ rname: string }>();

  const { currentData, error, isLoading } =
    useGetRestaurantDetailByNameQuery(rname);

	console.log("currentData--", currentData);
	


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

	const options = getPath(params.rid)

	return (
		<div>
			<DineInLandingPage options={options} restaurantInfo={restaurantInfo} />
		</div>
	)
}
