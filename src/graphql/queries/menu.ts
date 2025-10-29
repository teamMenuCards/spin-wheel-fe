import { gql } from "@apollo/client"

// Query to get menu list by restaurant name
export const GET_MENU_LIST = gql`
	query GetMenuList($name: String!) {
		menuList(restaurantName: $name) {
			id
			name
			display_name
			active
			createdAt
			updatedAt
			categories {
				id
				name
				display_name
				description
				image_url
				display_order
				active
				createdAt
				updatedAt
				products {
					id
					name
					display_name
					description
					image_url
					display_order
					active
					createdAt
					updatedAt
					is_veg
					is_available
					variants {
						id
						variant_name
						price
						display_order
						active
						createdAt
						updatedAt
						preparation_time_minutes
						is_available
					}
				}
			}
		}
	}
`

// Query to get a specific product with variants
export const GET_PRODUCT_DETAILS = gql`
	query GetProductDetails($productId: ID!) {
		product(id: $productId) {
			id
			name
			display_name
			description
			image_url
			display_order
			active
			createdAt
			updatedAt
			is_veg
			is_available
			category {
				id
				name
				display_name
			}
			variants {
				id
				variant_name
				price
				display_order
				active
				createdAt
				updatedAt
				preparation_time_minutes
				is_available
			}
		}
	}
`

// Query to search products
export const SEARCH_PRODUCTS = gql`
	query SearchProducts($restaurantName: String!, $searchTerm: String!) {
		searchProducts(restaurantName: $restaurantName, searchTerm: $searchTerm) {
			id
			name
			display_name
			description
			image_url
			is_veg
			is_available
			variants {
				id
				variant_name
				price
				preparation_time_minutes
				is_available
			}
			category {
				id
				name
				display_name
			}
		}
	}
`
