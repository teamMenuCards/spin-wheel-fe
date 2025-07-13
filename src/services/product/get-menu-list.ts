import {
	ProductCategoryType,
	ProductType,
	ProductVariantType,
	RestaurantType
} from "@/types"
import { createApi } from "@reduxjs/toolkit/query/react"
import { apiRoutes } from "../api-routes"
import { axiosBaseQuery } from "../http-client"
import { parseDynamicURL } from "../utils"

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

// Define a service using a base URL and expected endpoints
export const getMenuListAPI = createApi({
	reducerPath: "get-menu-list",
	baseQuery: axiosBaseQuery(),
	// Cache data for 1 day (24 hours * 60 minutes * 60 seconds)
	tagTypes: ['MenuList'],
	endpoints: (builder) => ({
		getMenuListByName: builder.query<MenuListResponseType, string>({
			query: (name) => ({
				url: parseDynamicURL(apiRoutes.menuItemtList, { name }),
				method: "GET"
			}),
			keepUnusedDataFor: 24 * 60 * 60,
			providesTags: (result, error, name) => [{ type: 'MenuList', id: name }],
			transformResponse: (response: MenuListResponseType) => {
				const sortedCategories = response.categories?.map((category) => {
					const productsWithSortedVariants = category.products?.map(
						(product) => ({
							...product,
							variants: product.variants.sort(
								(a, b) => parseFloat(a.price) - parseFloat(b.price)
							)
						})
					)

					/*  
						Sorts menu items by their display_order of "Regular" variant || item Name .
					
					*/
					const productsSortedByDisplayOrder = productsWithSortedVariants?.sort(
						(a, b) => {
							const aRegular = a.variants.find(
								(v) => v.variant_name === "Regular" || a.name
							)
							const bRegular = b.variants.find(
								(v) => v.variant_name === "Regular" || a.name
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
				})

				return {
					...response,
					categories: sortedCategories
				}
			}
		})
	})
})

export const { useGetMenuListByNameQuery } = getMenuListAPI
