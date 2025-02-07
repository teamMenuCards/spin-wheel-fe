"use client"
import React from "react"
import DineInLandingPage from "./components/DineInLandingPage"
import { useParams } from "next/navigation"
import { useGetRestaurantDetailByNameQuery } from "@/services/restaurant/get-restaurant-detail"

export default function Page() {
	const { rname } = useParams<{ rname: string }>()

	const { currentData } = useGetRestaurantDetailByNameQuery(rname)

	return (
		<div>
			<DineInLandingPage rname={rname} restaurantInfo={currentData} />
		</div>
	)
}
