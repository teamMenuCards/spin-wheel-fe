import { revalidateTag } from "next/cache"
import { CACHE_TAG_ALL_APIS } from "./cache-tags"

/**
 * Revalidate cache tags for restaurant data
 * Use this when restaurant data is updated
 */
export async function revalidateRestaurant(restaurantName: string) {
	revalidateTag(CACHE_TAG_ALL_APIS) // Revalidate all APIs
	revalidateTag(`restaurant-${restaurantName}`)
	revalidateTag("restaurant-details")
	revalidateTag("restaurants")
}

/**
 * Revalidate cache tags for menu data
 * Use this when menu data is updated
 */
export async function revalidateMenu(restaurantId: string) {
	revalidateTag(CACHE_TAG_ALL_APIS) // Revalidate all APIs
	revalidateTag(`menu-${restaurantId}`)
	revalidateTag("menu-list")
	revalidateTag("menus")
}

/**
 * Revalidate cache tags for spinner data
 * Use this when spinner data is updated
 */
export async function revalidateSpinner(restaurantId: string) {
	revalidateTag(CACHE_TAG_ALL_APIS) // Revalidate all APIs
	revalidateTag(`spinner-${restaurantId}`)
	revalidateTag("spinner")
	revalidateTag("spinners")
}

/**
 * Revalidate the common cache tag for all APIs
 * Use this to clear all GraphQL API caches at once
 */
export async function revalidateAllApis() {
	revalidateTag(CACHE_TAG_ALL_APIS)
}

/**
 * Revalidate all cache tags for a restaurant
 */
export async function revalidateRestaurantAll(restaurantName: string, restaurantId: string) {
	await revalidateRestaurant(restaurantName)
	await revalidateMenu(restaurantId)
	await revalidateSpinner(restaurantId)
}

