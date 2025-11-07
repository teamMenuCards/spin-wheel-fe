import { gql } from "@apollo/client"

// Query to get spinner by restaurant ID
export const GET_SPINNER_FOR_RESTAURANT = gql`
	query GetSpinnerForRestaurant($restaurantId: ID!) {
		spinnerByRestaurantId(restaurantId: $restaurantId) {
			baseCustomerCount
			name
			id
			distributions {
				label
				percentage
				offer {
					name
				}
			}
		}
	}
`

