import React from "react"
import DineinLandingPage from "./dineInLandingPage"

import { getRestaurantDetails } from "@/lib/api-cache"
import { RestaurantDetailResponse } from "@/services/graphql/restaurant"
import Footer from "@/shared/Footer"
import ScrollButton from "../shared/ScrollButton"

/* 
		By defult the delivery page is the landing page
		"http://menu-cards.com/restaurant/<name>/dine-in" is the Dining Landing page 

*/

export default async function Page({
	params
}: {
	params: Promise<{ rname: string }>
}) {
	const { rname } = await params
	const restaurantDetails = await getRestaurantDetails(rname)

	// Handle null restaurant details
	if (!restaurantDetails) {
		return (
			<div>
				<div className="mt-6 flex justify-center font-md font-semibold font-metropolis">
					Restaurant not found!
				</div>
				<ScrollButton />
				<Footer />
			</div>
		)
	}

	return (
		<div>
			<DineinLandingPage
				rname={rname}
				restaurantInfo={restaurantDetails as RestaurantDetailResponse}
			/>
			{/* changes for ScrollButton */}
			<ScrollButton />
			<Footer />
		</div>
	)
}
