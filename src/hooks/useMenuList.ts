import { GET_MENU_LIST } from "@/graphql/queries/menu"
import { Category } from "@/services/graphql/menu"
import { useQuery } from "@apollo/client"

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

export const useMenuList = (name: string) => {
	const { data, loading, error, refetch } = useQuery(GET_MENU_LIST, {
		variables: { name },
		errorPolicy: "all",
		fetchPolicy: "cache-first",
		skip: !name // Skip query if name is not provided
	})

	// Transform and sort the data
	const transformedData: Category[] =
		data?.menuList && data.menuList.length > 0
			? data.menuList.map((menu: any) => {
					const productsWithSortedVariants = sortProductsByDisplayOrder(
						menu.categories || []
					)

					return {
						...menu,
						categories: productsWithSortedVariants
					}
			  })[0]?.categories || []
			: []

	return {
		data: transformedData,
		loading,
		error,
		refetch
	}
}
