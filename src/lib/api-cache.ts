import { getMenuListServer } from "@/services/product/get-menu-list-server"
import { getRestaurantDetailsServer } from "@/services/restaurant/get-restaurant-details-server"
import { unstable_cache } from "next/cache"

// Using Next.js built-in cache for restaurant details
export const getRestaurantDetailsCached = unstable_cache(
	async (rname: string) => {
		return await getRestaurantDetailsServer(rname)
	},
	["restaurant-details"],
	{
		revalidate: 3600, // Cache for 1 hour
		tags: ["restaurant"]
	}
)

// Using Next.js built-in cache for menu list
export const getMenuListCached = unstable_cache(
	async (rname: string) => {
		return await getMenuListServer(rname)
	},
	["menu-list"],
	{
		revalidate: 3600, // Cache for 1 hour
		tags: ["menu"]
	}
)

// Re-export for backward compatibility
export const getRestaurantDetails = getRestaurantDetailsCached
export const getMenuList = getMenuListCached
