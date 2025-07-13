import { apiRoutes } from "@/services/api-routes"
import { axiosServerQuery } from "@/services/http-server"
import { parseDynamicURL } from "@/services/utils"

export type RestaurantDetailsResponse = {
	name: string
	detail: {
		logo: string
		details: {
			wa_api_details?: {
				wa_number: string
			}
			platform_details?: Array<{
				platform_name: string
				platform_uri: string
			}>
		}
	}
}

// Server-side function to get restaurant details
export async function getRestaurantDetailsServer(
	rname: string
): Promise<RestaurantDetailsResponse | null> {
	try {
		const { data: restaurantInfo } = await axiosServerQuery({
			url: parseDynamicURL(apiRoutes.restaurantDetail, { name: rname }),
			method: "GET"
		})

		return restaurantInfo
	} catch (error) {
		console.error("Failed to fetch restaurant details:", error)
		return null
	}
}
