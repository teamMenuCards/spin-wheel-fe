import { configureStore } from "@reduxjs/toolkit"
import { logger } from "redux-logger"
import { rootReducer } from "./features"


import { getMenuListAPI } from "@/services/product/get-menu-list"
import { getRestaurantDetailAPI } from "@/services/restaurant/get-restaurant-detail"

export const makeStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => {
			const middleware = getDefaultMiddleware()
				.concat(getMenuListAPI.middleware)
				.concat(getRestaurantDetailAPI.middleware)
			
			// Only add logger in development mode to avoid double renders
			if (process.env.NODE_ENV === 'development') {
				return middleware.concat(logger)
			}
			
			return middleware
		}
	})
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]