import { RestaurantDetailType, RestaurantType } from "@/types"
import { createApi } from "@reduxjs/toolkit/query/react"

import { apiRoutes } from "../api-routes"
import { axiosBaseQuery } from "../http-client"
import { parseDynamicURL } from "../utils"

export type RestaurantDetailResponse = {
	detail: RestaurantDetailType
} & RestaurantType

// Define a service using a base URL and expected endpoints
export const getRestaurantDetailAPI = createApi({
	reducerPath: "get-restaurant-detail",
	baseQuery: axiosBaseQuery(),
	endpoints: (builder) => ({
		getRestaurantDetailByName: builder.query<RestaurantDetailResponse, string>({
			query: (name) => ({
				url: parseDynamicURL(apiRoutes.restaurantDetail, { name }),
				method: "GET"
			})
		})
	})
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetRestaurantDetailByNameQuery } = getRestaurantDetailAPI
