import { ProductType } from "@/types"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface CartState {
	isOpen: boolean
	selectedProduct: ProductType | null
	products: ProductType[]
}

const initialState: CartState = {
	isOpen: false,
	selectedProduct: null,
	products: []
}

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		openCart(state) {
			state.isOpen = true
		},
		closeCart(state) {
			state.isOpen = false
		},
		toggleCart(state) {
			state.isOpen = !state.isOpen
		},
		selectProduct(state, action: PayloadAction<ProductType | null>) {
			state.selectedProduct = action.payload
		},
		addProduct(state, action: PayloadAction<ProductType>) {
			const existingProduct = state.products.find(
				(product) => product.id === action.payload.id
			)
			if (existingProduct) {
				existingProduct.quantity =
					(existingProduct.quantity || 0) + (action.payload.quantity || 0)
			} else {
				state.products.push(action.payload)
			}
		},
		removeProduct(state, action: PayloadAction<string>) {
			state.products = state.products.filter(
				(product) => product.id !== action.payload
			)
		},
		increaseProductQuantity(state, action: PayloadAction<string>) {
			const product = state.products.find(
				(product: ProductType) => product.id === action.payload
			)

			console.log("producthja--", product, product?.quantity)

			if (product) {
				product.quantity = (product.quantity || 0) + 1
			}
		},
		decreaseProductQuantity(state, action: PayloadAction<string>) {
			const product = state.products.find(
				(product) => product.id === action.payload
			)
			if (product && (product.quantity ?? 0) > 1) {
				product.quantity = (product.quantity ?? 0) - 1
			}
		}
	}
})

export const {
	openCart,
	closeCart,
	toggleCart,
	selectProduct,
	addProduct,
	removeProduct,
	increaseProductQuantity,
	decreaseProductQuantity
} = cartSlice.actions

export default cartSlice.reducer

// Selector for cart total
export const selectCartTotal = createSelector(
	(state: RootState) => state.cart.products,
	(products) => {
		return products?.reduce((sum: number, product: ProductType) => {
			// Handle cases where variants may be missing
			const variants = product.variants || []

			// Sum all variants prices for this product
			const productTotal = variants.reduce((variantSum, variant) => {
				const variantPrice = Number(variant.price) || 0
				return variantSum + variantPrice
			}, 0)

			// Multiply the total variant price by product quantity
			const quantity = product.quantity || 1
			return sum + productTotal * quantity
		}, 0)
	}
)
