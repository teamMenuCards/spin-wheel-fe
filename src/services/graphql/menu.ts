import { GET_MENU_LIST } from "@/graphql/queries/menu"
import { apolloClient, createServerApolloClient } from "@/lib/apollo-client"
import {
	ProductCategoryType,
	ProductType,
	ProductVariantType,
	RestaurantType
} from "@/types"

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

// Helper function to sort products by display order
const sortProductsByDisplayOrder = (products: any[]) => {
	return products
		.map((product) => ({
			...product,
			variants: product.variants.sort(
				(a: any, b: any) => parseFloat(a.price) - parseFloat(b.price)
			)
		}))
		.sort((a, b) => {
			const aRegular = a.variants.find(
				(v: any) => v.variant_name === "Regular" || a.name
			)
			const bRegular = b.variants.find(
				(v: any) => v.variant_name === "Regular" || a.name
			)

			const aDisplayOrder = aRegular ? parseFloat(aRegular?.display_order) : 0
			const bDisplayOrder = bRegular ? parseFloat(bRegular?.display_order) : 0

			return aDisplayOrder - bDisplayOrder
		})
}

// Client-side function using Apollo Client
export const getMenuListClient = async (name: string): Promise<Category[]> => {
	try {
		const { data } = await apolloClient.query({
			query: GET_MENU_LIST,
			variables: { name },
			errorPolicy: "all",
			fetchPolicy: "cache-first" // Use cache if available
		})

		if (!data?.menuList || !data.menuList.length) {
			return []
		}

		// Transform and sort the data
		const sortedCategories = data.menuList.map((menu: any) => {
			const productsWithSortedVariants = sortProductsByDisplayOrder(
				menu.categories || []
			)

			return {
				...menu,
				categories: productsWithSortedVariants
			}
		})

		return sortedCategories[0]?.categories || []
	} catch (error) {
		console.error("Error fetching menu list:", error)
		return []
	}
}

// Server-side function using server Apollo Client
export const getMenuListServer = async (name: string): Promise<Category[]> => {
	try {
		const client = createServerApolloClient()
		const { data } = await client.query({
			query: GET_MENU_LIST,
			variables: { name },
			errorPolicy: "all",
			fetchPolicy: "network-only" // Always fetch fresh data on server
		})

		if (!data?.menuList || !data.menuList.length) {
			return []
		}

		// Transform and sort the data
		const sortedCategories = data.menuList.map((menu: any) => {
			const productsWithSortedVariants = sortProductsByDisplayOrder(
				menu.categories || []
			)

			return {
				...menu,
				categories: productsWithSortedVariants
			}
		})

		return sortedCategories[0]?.categories || []
	} catch (error) {
		console.error("Error fetching menu list on server:", error)
		return []
	}
}
