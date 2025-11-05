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
			dashboardLinks: restaurant.links?.map((link: any) => ({
				id: 0,
				name: link.name,
				url: link.url,
				active: true
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
				dashboardLinks: restaurant.links?.map((link: any) => ({
					id: 0,
					name: link.name,
					url: link.url,
					active: true
				})) || [],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				details: {
					wa_api_details: restaurant.whatsapp ? {
						wa_number: restaurant.whatsapp
					} : undefined,
					platform_reviews: restaurant.thirdPartyReviews?.map((review: any) => ({
						platform_name: review.platform,
						total_reviews: review.reviewCount || 0,
						average_rating: review.rating || 0
					})) || [],
					reviews_image_url_details: restaurant.settings?.uiThemeData?.reviewImageUrl?.length 
						? [{ review_image_url: restaurant.settings.uiThemeData.reviewImageUrl.join(",") }]
						: [],
					platform_details: [],
					meta_details: {
						opening_time: restaurant.openingTime || "",
						closing_time: restaurant.closingTime || "",
						phone_number: restaurant.phone || "",
						avg_price: restaurant.averagePrice || 0,
						avg_person: 0,
						location_info: restaurant.addressLine1 || "",
						category: restaurant.cuisines?.map((cuisine: any) => cuisine.name).join(", ") || ""
					}
				}
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
		console.log("Server: Fetching restaurant with slug:", name)
		console.log("Server: GraphQL endpoint:", process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:4200/graphql")
		console.log("Server: Query variables:", { slug: name })
		
		let result
		try {
			result = await client.query({
				query: GET_RESTAURANT_DETAILS,
				variables: { slug: name },
				errorPolicy: "none", // Changed to "none" to surface errors better
				fetchPolicy: "network-only" // Always fetch fresh data on server
			})
		} catch (error: any) {
			console.error("Server: Query failed with error:", error)
			console.error("Server: Error message:", error?.message)
			console.error("Server: Error name:", error?.name)
			
			// Log GraphQL errors with full details
			if (error?.graphQLErrors) {
				console.error("Server: GraphQL errors count:", error.graphQLErrors.length)
				error.graphQLErrors.forEach((gqlError: any, index: number) => {
					console.error(`Server: GraphQL error ${index + 1}:`, {
						message: gqlError.message,
						locations: gqlError.locations,
						path: gqlError.path,
						extensions: gqlError.extensions,
						originalError: gqlError.originalError
					})
				})
			}
			
			// Log network errors
			if (error?.networkError) {
				console.error("Server: Network error details:", {
					message: error.networkError.message,
					statusCode: error.networkError.statusCode,
					status: error.networkError.status,
					result: error.networkError.result,
					bodyText: error.networkError.bodyText
				})
			}
			
		// Log the query and variables for debugging
		try {
			const queryString = GET_RESTAURANT_DETAILS.loc?.source?.body || 
				(GET_RESTAURANT_DETAILS as any).definitions?.[0]?.loc?.source?.body ||
				"Unable to extract query"
			console.error("Server: Query string:", queryString)
		} catch (e) {
			console.error("Server: Could not extract query string")
		}
		console.error("Server: Variables sent:", { slug: name })
		console.error("Server: Full error object:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2))
			
			// Return null on error
			return null
		}

		console.log("Server: Full result object keys:", Object.keys(result))
		console.log("Server: GraphQL data:", result.data)
		console.log("Server: GraphQL data type:", typeof result.data)
		console.log("Server: GraphQL error:", result.error)
		console.log("Server: Result loading:", (result as any).loading)
		console.log("Server: Result networkStatus:", (result as any).networkStatus)
		
		const { data, error } = result
		
		// Check if data exists but is an empty object
		if (data && typeof data === 'object' && Object.keys(data).length === 0) {
			console.error("Server: Data is an empty object")
			return null
		}
		
		if (error) {
			console.error("Server: GraphQL error:", error)
			if ((error as any).graphQLErrors) {
				console.error("Server: GraphQL errors:", (error as any).graphQLErrors)
			}
			if ((error as any).networkError) {
				console.error("Server: Network error:", (error as any).networkError)
			}
			return null
		}

		if (!data) {
			console.error("Server: No data returned from GraphQL query")
			console.error("Server: This might mean:")
			console.error("  1. The GraphQL server is not running")
			console.error("  2. The query failed but errorPolicy: 'all' hid the error")
			console.error("  3. Network connectivity issue")
			return null
		}

		// Transform GraphQL response to match expected format
		const restaurant = (data as any)?.restaurantBySlug
		
		if (!restaurant) {
			console.log("Server: restaurantBySlug is null or undefined in response")
			return null
		}
		
		
		console.log("Server: Restaurant found:", restaurant.name)
		
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
			dashboardLinks: restaurant.links?.map((link: any) => ({
				id: 0,
				name: link.name,
				url: link.url,
				active: true
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
				dashboardLinks: restaurant.links?.map((link: any) => ({
					id: 0,
					name: link.name,
					url: link.url,
					active: true
				})) || [],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				details: {
					wa_api_details: restaurant.whatsapp ? {
						wa_number: restaurant.whatsapp
					} : undefined,
					platform_reviews: restaurant.thirdPartyReviews?.map((review: any) => ({
						platform_name: review.platform,
						total_reviews: review.reviewCount || 0,
						average_rating: review.rating || 0
					})) || [],
					reviews_image_url_details: restaurant.settings?.uiThemeData?.reviewImageUrl?.length 
						? [{ review_image_url: restaurant.settings.uiThemeData.reviewImageUrl.map((url: string) => url.trim()).join(", ") }]
						: [],
					platform_details: [],
					meta_details: {
						opening_time: restaurant.openingTime || "",
						closing_time: restaurant.closingTime || "",
						phone_number: restaurant.phone || "",
						avg_price: restaurant.averagePrice || 0,
						avg_person: restaurant.averagePerson || 0,
						location_info: restaurant.addressLine1 || "",
						category: restaurant.cuisines?.map((cuisine: any) => cuisine.name).join(", ") || ""
					}
				}
			}
		}
	} catch (error: any) {
		console.error("Server: Error fetching restaurant details:", error)
		console.error("Server: Error message:", error?.message)
		console.error("Server: Error stack:", error?.stack)
		
		// Check if it's a network error
		if (error?.networkError) {
			console.error("Server: Network error:", error.networkError)
			console.error("Server: Network error status:", error.networkError?.statusCode)
			console.error("Server: Network error message:", error.networkError?.message)
		}
		
		// Check if it's a GraphQL error
		if (error?.graphQLErrors) {
			console.error("Server: GraphQL errors in catch:", error.graphQLErrors)
		}
		
		return null
	}
}
