import { GET_MENU_LIST } from "@/graphql/queries/menu"
// import { apolloClient } from "@/lib/apollo-client" // Only used in commented-out getMenuListClient
import { createServerApolloClient } from "@/lib/apollo-client"
import { API_CONFIG } from "@/config/api"
import {
	ProductCategoryType,
	ProductType,
	ProductVariantType,
	RestaurantType
} from "@/types"
import { transformMenuData } from "@/utils/transform-menu-data"

export type Category = ProductCategoryType & {
	products: Array<
		ProductType & {
			variants: ProductVariantType[]
		}
	>
}

export type MenuListResponseType = {
	categories: Array<Category> | []
} & RestaurantType

// Client-side function using Apollo Client
// NOTE: Currently unused in production - only used in test/example components
// Uncomment if needed for client-side fetching
// Also uncomment the apolloClient import above
/*
export const getMenuListClient = async (id: string): Promise<Category[]> => {
	try {
		const { data } = await apolloClient.query({
			query: GET_MENU_LIST,
			variables: { id },
			errorPolicy: "all",
			fetchPolicy: "cache-first" // Use cache if available
		})

		const categories = (data as any)?.productCategoriesByRestaurant || []
		
		if (!categories.length) {
			return []
		}

		// Transform new API data to match old format
		return transformMenuData(categories)
	} catch (error) {
		return []
	}
}
*/

// Server-side function using server Apollo Client
export const getMenuListServer = async (id: string): Promise<Category[]> => {
	try {
		if (!id) {
			return []
		}
		
		if (!API_CONFIG.GRAPHQL_ENDPOINT) {
			return []
		}
		
		const client = createServerApolloClient()
		const result = await client.query({
			query: GET_MENU_LIST,
			variables: { id },
			errorPolicy: "all",
			fetchPolicy: "network-only" // Always fetch fresh data on server
		})

		const data = result.data
		const categories = (data as any)?.productCategoriesByRestaurant || []
		
		if (!categories.length) {
			return []
		}

		// Transform new API data to match old format
		return transformMenuData(categories)
	} catch (error) {
		return []
	}
}
