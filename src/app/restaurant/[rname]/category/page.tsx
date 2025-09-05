import { getMenuList, getRestaurantDetails } from "@/lib/api-cache"
import { Category } from "@/services/product/get-menu-list"
import CategoryClientWrapper from "./components/category-client-wrapper"
import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"

export const revalidate = 36000 // 10 hours caching

export async function generateStaticParams() {
	return []
}

// Server Component - fetches data at build time
export default async function CategoryPage({
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

	return (
		<CategoryClientWrapper
			rname={rname}
			categories={sortedCategories as unknown as Category[]}
			restaurantInfo={restaurantInfo as RestaurantDetailResponse}
		/>
	)
}
