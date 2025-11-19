import { getRestaurantDetails } from "@/lib/api-cache"
import { spinWheelContentManager } from "@/lib/spin-wheel-content-manager"
import { getSpinnerForRestaurantServer } from "@/services/graphql/spinner"
import SpinWheelClient from "./SpinWheelClient"

export const revalidate = 36000

export async function generateStaticParams() {
	return []
}

export default async function WheelPage({
	params
}: {
	params: Promise<{ rname: string }>
}) {
	const { rname } = await params

	// Fetch restaurant details server-side
	const restaurantDetails = await getRestaurantDetails(rname)

	// Handle null restaurant details
	if (!restaurantDetails) {
		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-800 mb-2">
						Restaurant not found!
					</h2>
					<p className="text-gray-600">The restaurant does not exist</p>
				</div>
			</div>
		)
	}

	const restaurantId = restaurantDetails.id

	// Fetch spinner data server-side
	const spinnerData = await getSpinnerForRestaurantServer(restaurantId)

	// Process config using content manager
	const config = spinWheelContentManager.getConfig(
		restaurantId,
		spinnerData || null
	)

	const segments = config?.segments || []

	return (
		<SpinWheelClient
			rname={rname}
			restaurantData={restaurantDetails}
			restaurantId={restaurantId}
			spinnerData={spinnerData}
			segments={segments}
		/>
	)
}
