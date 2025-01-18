import {
	addItemToDineInCart,
	removeItemFromDineInCart
} from "@/utils/store/dine-in"
import { createSlice } from "@reduxjs/toolkit"

import type { PayloadAction } from "@reduxjs/toolkit"

export type DineInCartItemType = {
	productId: string
	quantity: number
}

export type DineInCartActionType = Omit<DineInCartItemType, "quantity">

export type DineInState = {
	dineInCart: DineInCartItemType[] | []
	totalItems: number
}

const initialState: DineInState = {
	dineInCart: [],
	totalItems: 0
}

export const DineInStateSlice = createSlice({
	name: "dine-in-state",
	initialState,
	reducers: {
		addToDineInCart: (state, action: PayloadAction<DineInCartActionType>) => {
			const { cart, totalItems } = addItemToDineInCart(
				state.dineInCart,
				action.payload,
				state.totalItems
			)
			state.dineInCart = cart
			state.totalItems = totalItems
		},

		removeFromDineInCart: (
			state,
			action: PayloadAction<DineInCartActionType>
		) => {
			const { cart, totalItems } = removeItemFromDineInCart(
				state.dineInCart,
				action.payload,
				state.totalItems
			)
			state.dineInCart = cart
			state.totalItems = totalItems
		}
	}
})

export const { addToDineInCart, removeFromDineInCart } =
	DineInStateSlice.actions

export default DineInStateSlice.reducer
