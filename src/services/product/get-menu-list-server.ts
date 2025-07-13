// Server-side function to get menu list
import { apiRoutes } from "@/services/api-routes"
import { axiosServerQuery } from "@/services/http-server"
import { parseDynamicURL } from "@/services/utils"
import {
	MenuCategory,
	MenuProduct,
	MenuVariant
} from "@/types/menu-server.types"

// Simple in-memory cache for menu list data
const menuListCache = new Map()

export interface MenuListResponse {
	categories: MenuCategory[]
}

// Server-side function to get menu list with caching
export async function getMenuListServer(
	rname: string
): Promise<MenuCategory[]> {
	// Check if we already have the data cached
	if (menuListCache.has(rname)) {
		return menuListCache.get(rname)
	}

	try {
		const { data: menudata } = await axiosServerQuery({
			url: parseDynamicURL(apiRoutes.menuItemtList, { name: rname }),
			method: "GET"
		})

		// Transform and sort the data
		const sortedCategories =
			menudata?.categories?.map((category: MenuCategory) => {
				const productsWithSortedVariants = category.products?.map(
					(product: MenuProduct) => ({
						...product,
						variants: product.variants.sort(
							(a: MenuVariant, b: MenuVariant) =>
								parseFloat(a.price) - parseFloat(b.price)
						)
					})
				)

				const productsSortedByDisplayOrder = productsWithSortedVariants?.sort(
					(a: MenuProduct, b: MenuProduct) => {
						const aRegular = a.variants.find(
							(v: MenuVariant) => v.variant_name === "Regular" || a.name
						)
						const bRegular = b.variants.find(
							(v: MenuVariant) => v.variant_name === "Regular" || a.name
						)

						const aDisplayOrder = aRegular
							? parseFloat(aRegular?.display_order)
							: 0
						const bDisplayOrder = bRegular
							? parseFloat(bRegular?.display_order)
							: 0

						return aDisplayOrder - bDisplayOrder
					}
				)

				return {
					...category,
					products: productsSortedByDisplayOrder
				}
			}) || []

		const finalSortedCategories = sortedCategories.sort(
			(a: MenuCategory, b: MenuCategory) => a.display_order - b.display_order
		)

		// Cache the result
		menuListCache.set(rname, finalSortedCategories)

		return finalSortedCategories
	} catch (error) {
		console.error("Failed to fetch menu list:", error)
		return []
	}
}
