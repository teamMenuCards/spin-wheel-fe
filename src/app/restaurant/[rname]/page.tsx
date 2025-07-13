import DeliveryLandingPage from "./components/DeliveryLandingPage"

import { getRestaurantDetails } from "@/lib/api-cache"
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

	const restaurantDetails = await getRestaurantDetails(rname)

	return (
		<div>
			<DeliveryLandingPage rname={rname} restaurantInfo={restaurantDetails} />
			<ScrollButton />
			<Footer />
		</div>
	)
}
