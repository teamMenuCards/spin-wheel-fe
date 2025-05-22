import { apis } from "@/services"
import { combineSlices } from "@reduxjs/toolkit"
import { restaurantSlice as RestaurantSlice } from "./restaurant.slice"

import { appStateSlice as AppStateSlice } from "./app.slice"
import { DineInStateSlice } from "./dine-in.slice"
import { cartSlice as CartSlice } from "./cart.slice"

export const rootReducer = combineSlices(
	AppStateSlice,
	CartSlice,
	DineInStateSlice,
	RestaurantSlice,
	apis
)
