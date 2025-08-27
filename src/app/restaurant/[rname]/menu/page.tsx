import { getMenuList, getRestaurantDetails } from "@/lib/api-cache"
import { Category } from "@/services/product/get-menu-list"
import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"
import MenuClientWrapper from "./components/menu-client-wrapper"

// This function runs at build time for each static path
export async function generateMetadata({
	params
}: {
	params: Promise<{ rname: string }>
}) {
	const { rname } = await params
	const restaurantInfo = await getRestaurantDetails(rname)

	return {
		title: `${restaurantInfo?.name || "Restaurant"} - Menu`,
		description: `View the menu for ${restaurantInfo?.name || "our restaurant"}`
	}
}

export const revalidate = 36000 // 10 hours caching

export async function generateStaticParams() {
	return []
}

// Server Component - fetches data at build time
export default async function MenuPage({
	params
}: {
	params: Promise<{ rname: string }>
}) {
	const { rname } = await params

	// Fetch data at build time using clean services
	const sortedCategories = await getMenuList(rname)
	const restaurantInfo = await getRestaurantDetails(rname)

	// Handle null restaurant info
	if (!restaurantInfo) {
		return (
			<div className="mt-6 flex justify-center font-md font-semibold font-metropolis">
				Restaurant not found!
			</div>
		)
	}

	if (!sortedCategories.length) {
		return (
			<MenuClientWrapper
				restaurantInfo={restaurantInfo as RestaurantDetailResponse}
				rname={rname}
				sortedCategories={sortedCategories as unknown as Category[]}
			>
				<div className="mt-6 flex justify-center font-md font-semibold font-metropolis">
					Menu Coming Soon!
				</div>
			</MenuClientWrapper>
		)
	}

	return (
		<MenuClientWrapper
			restaurantInfo={restaurantInfo as RestaurantDetailResponse}
			rname={rname}
			sortedCategories={sortedCategories as unknown as Category[]}
		/>
	)
}
