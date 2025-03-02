import React from "react"
import DeliveryLandingPage from "./components/DeliveryLandingPage"

import { axiosServerQuery } from "@/services/http-server"
import { apiRoutes } from "@/services/api-routes"
import { parseDynamicURL } from "@/services/utils"
import Link from "next/link"

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

	return (
		<div>
			<DeliveryLandingPage rname={rname} restaurantInfo={currentData} />
			<footer className="bg-slate-900 mt-4 flex justify-center p-2">
				<div className="text-stone-300">
					powered by{" "}
					<Link href={`/`} className="underline">
						menucards
					</Link>
				</div>
			</footer>
		</div>
	)
}
