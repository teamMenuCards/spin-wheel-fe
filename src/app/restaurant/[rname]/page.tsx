import React from "react"
import DeliveryLandingPage from "./components/DeliveryLandingPage"

import { axiosServerQuery } from "@/services/http-server"
import { apiRoutes } from "@/services/api-routes"
import { parseDynamicURL } from "@/services/utils"
import Footer from "@/shared/Footer"
import ScrollButton from "./shared/ScrollButton"

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

	const { data: currentData } = await axiosServerQuery({
		url: parseDynamicURL(apiRoutes.restaurantDetail, { name: rname }),
		method: "GET"
	})

	const dashboardLinks = currentData?.dashboardLinks || []

	const diningLinks = dashboardLinks.filter(
		(link) => link.link_type === "DINING"
	)
	const deliveryLinks = dashboardLinks.filter(
		(link) => link.link_type === "DELIVERY"
	)

	console.log("currentData--", JSON.stringify(currentData))

	return (
		<div>
			<DeliveryLandingPage
				rname={rname}
				restaurantInfo={{
					...currentData,
					dashboardLinks: { diningLinks, deliveryLinks }
				}}
			/>
			{/* changes for ScrollButton */}
			<ScrollButton />
			<Footer />
		</div>
	)
}
