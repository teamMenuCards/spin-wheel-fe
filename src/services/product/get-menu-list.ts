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
				const sortedCategories = response.categories?.map((category) => ({
					...category,
					products: category.products?.map((product) => ({
						...product,
						variants: product.variants.sort(
							(a, b) => parseFloat(a.price) - parseFloat(b.price)
						)
					}))
				}))

				return {
					...response,
					categories: sortedCategories
				}
			}
		})
	})
})

export const { useGetMenuListByNameQuery } = getMenuListAPI
