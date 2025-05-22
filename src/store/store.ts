import { logger } from "redux-logger"
import { configureStore } from "@reduxjs/toolkit"
import { rootReducer } from "./features"
import { getMenuListAPI } from "@/services/product/get-menu-list"
import { getRestaurantDetailAPI } from "@/services/restaurant/get-restaurant-detail"

export const makeStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.concat(getMenuListAPI.middleware)
				.concat(getRestaurantDetailAPI.middleware)
				.concat(logger)
	})
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
