"use client"
import React from "react"
import DeliveryLandingPage from "./components/DeliveryLandingPage"
import { useParams } from "next/navigation"
import { useGetRestaurantDetailByNameQuery } from "@/services/restaurant/get-restaurant-detail"

/* 
		By defult the delivery page is the landing page
		"http://menu-cards.com/restaurant/<name>/dine-in" is the Dining Landing page 

*/

export default function Page() {
	const { rname } = useParams<{ rname: string }>()

	const { currentData } = useGetRestaurantDetailByNameQuery(rname)

	return (
		<div>
			<DeliveryLandingPage rname={rname} restaurantInfo={currentData} />
		</div>
	)
}
