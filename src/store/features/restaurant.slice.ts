import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface RestaurantState {
	restaurantData: RestaurantDetailResponse | null
}

const initialState: RestaurantState = {
	restaurantData: null
}

export const restaurantSlice = createSlice({
	name: "restaurant",
	initialState,
	reducers: {
		setRestaurantDetails(
			state,
			action: PayloadAction<RestaurantDetailResponse | null>
		) {
			state.restaurantData = action.payload
		}
	}
})

export const { setRestaurantDetails } = restaurantSlice.actions
export default restaurantSlice.reducer
