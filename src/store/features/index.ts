
import { combineSlices } from "@reduxjs/toolkit"
import { restaurantSlice as RestaurantSlice } from "./restaurant.slice"

import { appStateSlice as AppStateSlice } from "./app.slice"
import { cartSlice as CartSlice } from "./cart.slice"
import { DineInStateSlice } from "./dine-in.slice"
import { getMenuListAPI } from "@/services/product/get-menu-list"
import { getRestaurantDetailAPI } from "@/services/restaurant/get-restaurant-detail"

export const rootReducer = combineSlices(
	AppStateSlice,
	CartSlice,
	DineInStateSlice,
	RestaurantSlice,
	getMenuListAPI,
	getRestaurantDetailAPI
)
