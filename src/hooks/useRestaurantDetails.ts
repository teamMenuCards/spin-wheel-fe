import { GET_RESTAURANT_DETAILS } from "@/graphql/queries/restaurant"
import { RestaurantDetailResponse } from "@/services/graphql/restaurant"
import { useQuery } from "@apollo/client/react"

export const useRestaurantDetails = (name: string) => {
	const { data, loading, error, refetch } = useQuery(GET_RESTAURANT_DETAILS, {
		variables: { slug: name },
		errorPolicy: "all",
		fetchPolicy: "cache-first",
		skip: !name 
	})	
console.log("data", data)
	// Transform GraphQL response to match expected format
	const restaurant = (data as any)?.restaurantBySlug
	console.log("restaurant", restaurant)
	const transformedData: RestaurantDetailResponse | null = restaurant
		? {
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
					type: link.type,
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
	} : null

	return {
		data: transformedData,
		loading,
		error,
		refetch
	}
}
