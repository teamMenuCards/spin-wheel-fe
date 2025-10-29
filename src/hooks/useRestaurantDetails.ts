import { GET_RESTAURANT_DETAILS } from "@/graphql/queries/restaurant"
import { RestaurantDetailResponse } from "@/services/graphql/restaurant"
import { useQuery } from "@apollo/client"

export const useRestaurantDetails = (name: string) => {
	const { data, loading, error, refetch } = useQuery(GET_RESTAURANT_DETAILS, {
		variables: { name },
		errorPolicy: "all",
		fetchPolicy: "cache-first",
		skip: !name // Skip query if name is not provided
	})

	console.log("useRestaurantDetails--", data)
	// Transform GraphQL response to match expected format
	const transformedData: RestaurantDetailResponse | null = data?.restaurant
		? {
				id: data.restaurant.id,
				name: data.restaurant.name,
				display_name: data.restaurant.display_name,
				active: data.restaurant.active,
				createdAt: data.restaurant.createdAt,
				updatedAt: data.restaurant.updatedAt,
				pincode: data.restaurant.pincode,
				phone_no: data.restaurant.phone_no,
				email: data.restaurant.email,
				address: data.restaurant.address,
				city: data.restaurant.city,
				country: data.restaurant.country,
				state: data.restaurant.state,
				logo: data.restaurant.logo,
				order_count_display: data.restaurant.order_count_display,
				cover_image: data.restaurant.cover_image,
				feature_flags: data.restaurant.feature_flags,
				dashboardLinks: data.restaurant.dashboardLinks || [],
				detail: {
					wa_api_details: data.restaurant.details?.wa_api_details || {},
					platform_reviews: data.restaurant.details?.platform_reviews || [],
					reviews_image_url_details:
						data.restaurant.details?.reviews_image_url_details || [],
					platform_details: data.restaurant.details?.platform_details || [],
					meta_details: data.restaurant.details?.meta_details || {}
				}
		  }
		: null

	return {
		data: transformedData,
		loading,
		error,
		refetch
	}
}
