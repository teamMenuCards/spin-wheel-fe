import { getMenuListServer } from "@/services/graphql/menu"
import { getRestaurantDetailsServer } from "@/services/graphql/restaurant"
import { unstable_cache } from "next/cache"
import { CACHE_TAG_ALL_APIS } from "./cache-tags"

// Server-side functions using GraphQL exclusively with cache tags for Vercel
export const getRestaurantDetails = async (name: string) => {
	return unstable_cache(
		async () => {
			return getRestaurantDetailsServer(name)
		},
		[`restaurant-details-${name}`],
		{
			tags: [
				CACHE_TAG_ALL_APIS, // Common tag for all APIs (for Vercel)
				`restaurant-${name}`,
				"restaurant-details",
				"restaurants"
			],
			revalidate: 36000 // 10 hours
		}
	)()
}

export const getMenuList = async (id: string) => {
	return unstable_cache(
		async () => {
			return getMenuListServer(id)
		},
		[`menu-list-${id}`],
		{
			tags: [
				CACHE_TAG_ALL_APIS, // Common tag for all APIs (for Vercel)
				`menu-${id}`,
				"menu-list",
				"menus"
			],
			revalidate: 36000 // 10 hours
		}
	)()
}
