import { getMenuListServer } from "@/services/product/get-menu-list-server"
import { getRestaurantDetailsServer } from "@/services/restaurant/get-restaurant-details-server"
import { unstable_cache } from "next/cache"

// Simple in-memory cache for restaurant details
const restaurantCache = new Map()

// Simple in-memory cache for menu list data
const menuListCache = new Map()

// Restaurant details cache
export async function getRestaurantDetails(rname: string) {
	// Check if we already have the data cached
	if (restaurantCache.has(rname)) {
		return restaurantCache.get(rname)
	}

	const restaurantInfo = await getRestaurantDetailsServer(rname)

	// Cache the result
	restaurantCache.set(rname, restaurantInfo)

	return restaurantInfo
}

// Menu list cache
export async function getMenuList(rname: string) {
	// Check if we already have the data cached
	if (menuListCache.has(rname)) {
		console.log("Menu list cache hit")
		return menuListCache.get(rname)
	}

	const menuData = await getMenuListServer(rname)

	// Cache the result
	menuListCache.set(rname, menuData)

	return menuData
}

/* *********  // Alternative: Using Next.js built-in cache for restaurant details ************* */

export const getRestaurantDetailsCached = unstable_cache(
	async (rname: string) => {
		return await getRestaurantDetailsServer(rname)
	},
	["restaurant-details"],
	{
		revalidate: 7200, // Cache for 6 hours
		tags: ["restaurant"]
	}
)

// Alternative: Using Next.js built-in cache for menu list
export const getMenuListCached = unstable_cache(
	async (rname: string) => {
		return await getMenuListServer(rname)
	},
	["menu-list"],
	{
		revalidate: 7200, // Cache for 2 hours
		tags: ["menu"]
	}
)

// Clear all caches if needed (e.g., for development)
export function clearAllCaches() {
	restaurantCache.clear()
	menuListCache.clear()
}

// Clear specific caches
export function clearRestaurantCache() {
	restaurantCache.clear()
}

export function clearMenuCache() {
	menuListCache.clear()
}
