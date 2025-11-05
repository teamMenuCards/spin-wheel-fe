import DeliveryLandingPage from "./components/DeliveryLandingPage"

import { getRestaurantDetails } from "@/lib/api-cache"
import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"
import Footer from "@/shared/Footer"
import ScrollProgressBar from "./components/scroll-progress-bar"
import ScrollButton from "./shared/ScrollButton"

/* 
		"http://menu-cards.com/restaurant/<name>/
		By defult the Delivery page is the landing page

		"http://menu-cards.com/restaurant/<name>/dine-in" 
		Above is the Dining page which is accessed via QR code on restaurant table

*/

export const revalidate = 36000

export async function generateStaticParams() {
	return []
}

export default async function Page({
	params
}: {
	params: Promise<{ rname: string }>
}) {
	const { rname } = await params
	const restaurantDetails = await getRestaurantDetails(rname)
	console.log("restaurantDetails", restaurantDetails)


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
			<ScrollProgressBar />
			<DeliveryLandingPage
				rname={rname}
				restaurantInfo={restaurantDetails as RestaurantDetailResponse}
			/>
			<ScrollButton />
			<Footer />
		</div>
	)
}
