import React from "react"
import DeliveryLandingPage from "./components/DeliveryLandingPage"

import { axiosServerQuery } from "@/services/http-server"
import { apiRoutes } from "@/services/api-routes"
import { parseDynamicURL } from "@/services/utils"
import Footer from "@/shared/Footer"
import ScrollButton from "./shared/ScrollButton"

/* 
		"http://menu-cards.com/restaurant/<name>/
		By defult the Delivery page is the landing page

		"http://menu-cards.com/restaurant/<name>/dine-in" 
		Above is the Dining page 

*/

export default async function Page({
	params
}: {
	params: Promise<{ rname: string }>
}) {
	const { rname } = await params

	const { data: restaurantDetails } = await axiosServerQuery({
		url: parseDynamicURL(apiRoutes.restaurantDetail, { name: rname }),
		method: "GET"
	})

	return (
		<div>
			<DeliveryLandingPage rname={rname} restaurantInfo={restaurantDetails} />
			{/* changes for ScrollButton */}
			<ScrollButton />
			<Footer />
		</div>
	)
}
