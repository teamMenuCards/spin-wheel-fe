import { GET_RESTAURANT_DETAILS } from "@/graphql/queries/restaurant"
import { apolloClient, createServerApolloClient } from "@/lib/apollo-client"
import { RestaurantDetailType, RestaurantType } from "@/types"

export type RestaurantDetailResponse = {
	detail: RestaurantDetailType
} & RestaurantType

// Client-side function using Apollo Client
export const getRestaurantDetailsClient = async (
	name: string
): Promise<RestaurantDetailResponse | null> => {
	try {
		const { data } = await apolloClient.query({
			query: GET_RESTAURANT_DETAILS,
			variables: { name },
			errorPolicy: "all",
			fetchPolicy: "cache-first" // Use cache if available
		})

		if (!data?.restaurant) {
			return null
		}

		// Transform GraphQL response to match expected format
		const restaurant = data.restaurant
		return {
			id: restaurant.id,
			name: restaurant.name,
			display_name: restaurant.display_name,
			active: restaurant.active,
			createdAt: restaurant.createdAt,
			updatedAt: restaurant.updatedAt,
			pincode: restaurant.pincode,
			phone_no: restaurant.phone_no,
			email: restaurant.email,
			address: restaurant.address,
			city: restaurant.city,
			country: restaurant.country,
			state: restaurant.state,
			logo: restaurant.logo,
			order_count_display: restaurant.order_count_display,
			cover_image: restaurant.cover_image,
			feature_flags: restaurant.feature_flags,
			dashboardLinks: restaurant.dashboardLinks || [],
			detail: {
				wa_api_details: restaurant.details?.wa_api_details || {},
				platform_reviews: restaurant.details?.platform_reviews || [],
				reviews_image_url_details:
					restaurant.details?.reviews_image_url_details || [],
				platform_details: restaurant.details?.platform_details || [],
				meta_details: restaurant.details?.meta_details || {}
			}
		}
	} catch (error) {
		console.error("Error fetching restaurant details:", error)
		return null
	}
}

// Server-side function using server Apollo Client
export const getRestaurantDetailsServer = async (
	name: string
): Promise<RestaurantDetailResponse | null> => {
	try {
		const client = createServerApolloClient()
		const { data } = await client.query({
			query: GET_RESTAURANT_DETAILS,
			variables: { name },
			errorPolicy: "all",
			fetchPolicy: "network-only" // Always fetch fresh data on server
		})

		if (!data?.restaurant) {
			return null
		}

		// Transform GraphQL response to match expected format
		const restaurant = data.restaurant
		return {
			id: restaurant.id,
			name: restaurant.name,
			display_name: restaurant.display_name,
			active: restaurant.active,
			createdAt: restaurant.createdAt,
			updatedAt: restaurant.updatedAt,
			pincode: restaurant.pincode,
			phone_no: restaurant.phone_no,
			email: restaurant.email,
			address: restaurant.address,
			city: restaurant.city,
			country: restaurant.country,
			state: restaurant.state,
			logo: restaurant.logo,
			order_count_display: restaurant.order_count_display,
			cover_image: restaurant.cover_image,
			feature_flags: restaurant.feature_flags,
			dashboardLinks: restaurant.dashboardLinks || [],
			detail: {
				wa_api_details: restaurant.details?.wa_api_details || {},
				platform_reviews: restaurant.details?.platform_reviews || [],
				reviews_image_url_details:
					restaurant.details?.reviews_image_url_details || [],
				platform_details: restaurant.details?.platform_details || [],
				meta_details: restaurant.details?.meta_details || {}
			}
		}
	} catch (error) {
		console.error("Error fetching restaurant details on server:", error)
		return null
	}
}
