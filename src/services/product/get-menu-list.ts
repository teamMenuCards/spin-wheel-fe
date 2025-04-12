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
	endpoints: (builder) => ({
		getMenuListByName: builder.query<MenuListResponseType, string>({
			query: (name) => ({
				url: parseDynamicURL(apiRoutes.menuItemtList, { name }),
				method: "GET"
			}),
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
						Sorts menu item's by their prices of "Regular" variant.
						If that is not present then considers menu item's name
					
					*/
					const productsSortedByRegularPrice = productsWithSortedVariants?.sort(
						(a, b) => {
							const aRegular = a.variants.find(
								(v) => v.variant_name === "Regular" || a.name
							)
							const bRegular = b.variants.find(
								(v) => v.variant_name === "Regular" || a.name
							)

							const aPrice = aRegular ? parseFloat(aRegular.price) : Infinity
							const bPrice = bRegular ? parseFloat(bRegular.price) : Infinity

							return aPrice - bPrice
						}
					)

					return {
						...category,
						products: productsSortedByRegularPrice
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
