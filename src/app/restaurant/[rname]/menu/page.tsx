import { getMenuList, getRestaurantDetails } from "@/lib/api-cache"
import MenuClientWrapper from "./components/menu-client-wrapper"

// This function runs at build time for each static path
export async function generateMetadata({
	params
}: {
	params: { rname: string }
}) {
	const { rname } = params
	const restaurantInfo = await getRestaurantDetails(rname)

	return {
		title: `${restaurantInfo?.name || "Restaurant"} - Menu`,
		description: `View the menu for ${restaurantInfo?.name || "our restaurant"}`
	}
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

	if (!sortedCategories.length) {
		return (
			<MenuClientWrapper
				restaurantInfo={restaurantInfo}
				rname={rname}
				sortedCategories={sortedCategories}
			>
				<div className="mt-6 flex justify-center font-md font-semibold font-metropolis">
					Menu Coming Soon!
				</div>
			</MenuClientWrapper>
		)
	}

	return (
		<MenuClientWrapper
			restaurantInfo={restaurantInfo}
			rname={rname}
			sortedCategories={sortedCategories}
		/>
	)
}
