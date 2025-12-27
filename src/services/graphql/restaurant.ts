/* eslint-disable @typescript-eslint/no-explicit-any */
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
			variables: { slug: name },
			errorPolicy: "all",
			fetchPolicy: "cache-first" // Use cache if available
		})

		const restaurant = (data as any).restaurantBySlug

		if (!restaurant) {
			return null
		}

		// Transform GraphQL response to match expected format
		// Top level: RestaurantType fields
		// detail: RestaurantDetailType with all fields including details nested object
		return {
			id: restaurant.id,
			name: restaurant.name,
			display_name: restaurant.name, // Use name as display_name if not available
			active: true, // Default to true if not provided
			createdAt: new Date().toISOString(), // Default if not available
			updatedAt: new Date().toISOString(), // Default if not available
			dashboardLinks:
				restaurant.links?.map((link: any) => ({
					id: link.id,
					name: link.name,
					url: link.url,
					type: link.type,
					active: link.isActive,
					channelType: link.channelType,
					displayOrder: link.displayOrder,
					image_url: link.imageUrl
				})) || [],

			detail: {
				id: 0, // RestaurantDetailType expects number
				pincode: "", // Not available in GraphQL response
				phone_no: restaurant.phone || "",
				email: restaurant.email || "",
				address: restaurant.addressLine1 || "",
				city: "", // Not available in GraphQL response
				country: "", // Not available in GraphQL response
				state: "", // Not available in GraphQL response
				logo: restaurant.theme?.logo || "",
				order_count_display: 0, // Default if not available
				cover_image: restaurant.theme?.coverImage || "",
				feature_flags: {}, // Default if not available
				dashboardLinks:
					restaurant.links?.map((link: any) => ({
						id: link.id,
						name: link.name,
						url: link.url,
						active: link.isActive,
						channelType: link.channelType,
						displayOrder: link.displayOrder,
						image_url: link.imageUrl
					})) || [],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				details: {
					wa_api_details: restaurant.whatsapp
						? {
							wa_number: restaurant.whatsapp
						}
						: undefined,
					platform_reviews:
						restaurant.thirdPartyReviews?.map((review: any) => ({
							platform_name: review.platform,
							total_reviews: review.reviewCount || 0,
							average_rating: review.rating || 0
						})) || [],
					reviews_image_url_details: restaurant.settings?.uiThemeData
						?.reviewImageUrl?.length
						? [
							{
								review_image_url:
									restaurant.settings.uiThemeData.reviewImageUrl.join(",")
							}
						]
						: [],
					platform_details: [],
					meta_details: {
						opening_time: restaurant.openingTime || "",
						closing_time: restaurant.closingTime || "",
						phone_number: restaurant.phone || "",
						avg_price: restaurant.averagePrice || 0,
						avg_person: 0,
						location_info: restaurant.addressLine1 || "",
						category:
							restaurant.cuisines
								?.map((cuisine: any) => cuisine.name)
								.join(", ") || ""
					}
				}
			}
		}
	} catch (error) {
		console.error("Error fetching restaurant detailsjajja:", error)
		return null
	}
}

// Server-side function using server Apollo Client
export const getRestaurantDetailsServer = async (
	name: string
): Promise<RestaurantDetailResponse | null> => {
	try {
		const client = createServerApolloClient()
		const result = await client.query({
			query: GET_RESTAURANT_DETAILS,
			variables: { slug: name },
			errorPolicy: "none",
			fetchPolicy: "network-only"
		})

		const { data, error } = result

		if (error) {
			console.error("Error fetching restaurant details from server:", error)
			return null
		}

		if (!data) {
			return null
		}

		// Transform GraphQL response to match expected format
		const restaurant = (data as any)?.restaurantBySlug

		if (!restaurant) {
			return null
		}

		// Map GraphQL response fields to expected format
		// Top level: RestaurantType fields
		// detail: RestaurantDetailType with all fields including details nested object
		return {
			id: restaurant.id,
			name: restaurant.name,
			display_name: restaurant.name, // Use name as display_name if not available
			active: true, // Default to true if not provided
			createdAt: new Date().toISOString(), // Default if not available
			updatedAt: new Date().toISOString(), // Default if not available
			dashboardLinks:
				restaurant.links?.map((link: any) => ({
					id: link.id,
					name: link.name,
					url: link.url,
					channelType: link.channelType,
					image_url: link.imageUrl,
					displayOrder: link.displayOrder,
					active: link.isActive,
					type: link.type
				})) || [],

			detail: {
				id: 0, // RestaurantDetailType expects number
				pincode: "", // Not available in GraphQL response
				phone_no: restaurant.phone || "",
				email: restaurant.email || "",
				address: restaurant.addressLine1 || "",
				city: "", // Not available in GraphQL response
				country: "", // Not available in GraphQL response
				state: "", // Not available in GraphQL response
				logo: restaurant.theme?.logo || "",
				order_count_display: restaurant.settings?.uiThemeData?.orderCount || 0, // Default if not available
				cover_image: restaurant.theme?.coverImage || "",
				feature_flags: {}, // Default if not available
				dashboardLinks:
					restaurant.links?.map((link: any) => ({
						id: link.id,
						name: link.name,
						url: link.url,
						active: link.isActive,
						displayOrder: link.displayOrder,
						channelType: link.channelType,
						image_url: link.imageUrl,
					})) || [],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				details: {
					wa_api_details: restaurant.whatsapp
						? {
							wa_number: restaurant.whatsapp
						}
						: undefined,
					platform_reviews:
						restaurant.thirdPartyReviews?.map((review: any) => ({
							platform_name: review.platform,
							total_reviews: review.reviewCount || 0,
							average_rating: review.rating || 0
						})) || [],
					reviews_image_url_details: restaurant.settings?.uiThemeData
						?.reviewImageUrl?.length
						? [
							{
								review_image_url:
									restaurant.settings.uiThemeData.reviewImageUrl
										.map((url: string) => url.trim())
										.join(", ")
							}
						]
						: [],
					platform_details: [],
					meta_details: {
						opening_time: restaurant.openingTime || "",
						closing_time: restaurant.closingTime || "",
						phone_number: restaurant.phone || "",
						avg_price: restaurant.averagePrice || 0,
						avg_person: restaurant.averagePerson || 0,
						location_info: restaurant.addressLine1 || "",
						category:
							restaurant.cuisines
								?.map((cuisine: any) => cuisine.name)
								.join(", ") || ""
					}
				}
			}
		}
	} catch (error) {
		console.error("Error fetching restaurant detailhahhahas:", error)
		return null
	}
}
