import { gql } from "@apollo/client"

// Query to get restaurant details by name
export const GET_RESTAURANT_DETAILS = gql`
	query {
		restaurantBySlug(slug: "cafe-cadell") {
			id
			name
			averagePrice
			addressLine1
			categories {
				name
			}
			links {
				name
				url
			}
			theme {
				logo
				coverImage
			}
			thirdPartyReviews {
				rating
				reviewCount
				platform
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
