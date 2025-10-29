import { gql } from "@apollo/client"

// Query to get restaurant details by name
export const GET_RESTAURANT_DETAILS = gql`
	query GetRestaurantDetails($name: String!) {
		restaurant(name: $name) {
			id
			name
			display_name
			active
			createdAt
			updatedAt
			pincode
			phone_no
			email
			address
			city
			country
			state
			logo
			order_count_display
			cover_image
			feature_flags
			dashboardLinks {
				id
				name
				url
				image_url
				display_order
				active
				createdAt
				updatedAt
				link_type
				is_premium
			}
			details {
				wa_api_details {
					wa_number
				}
				platform_reviews {
					platform_name
					total_reviews
					average_rating
				}
				reviews_image_url_details {
					review_image_url
				}
				platform_details {
					platform_name
					platform_uri
				}
				meta_details {
					category
					opening_time
					closing_time
					phone_number
					avg_price
					avg_person
					location_info
				}
			}
		}
	}
`

// Query to get restaurant list (if needed for admin or search)
export const GET_RESTAURANTS = gql`
	query GetRestaurants($limit: Int, $offset: Int, $active: Boolean) {
		restaurants(limit: $limit, offset: $offset, active: $active) {
			id
			name
			display_name
			active
			createdAt
			updatedAt
			logo
			cover_image
			order_count_display
		}
	}
`
