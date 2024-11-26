import { useCallback } from "react"
import { useCartContext } from "./CartContextProvider"
// import { ICartProduct } from 'models';

const useCartTotal = () => {
	const { total, setTotal } = useCartContext()

	const updateCartTotal = useCallback(
		(products) => {
			const productQuantity = products.reduce((sum, product) => {
				return (sum += product.quantity)
			}, 0)

			const getValue = (variant) => {
				if (variant.selected) {
					return variant.selected.value
				}
				return variant.value
			}

			const totalPrice = products.reduce((sum, product) => {
				const { variant = "", quantity = "" } = product
				return (sum += getValue(variant) * quantity)
			}, 0)

			const installments = products.reduce((greater, product) => {
				return product.installments > greater ? product.installments : greater
			}, 0)

			const total = {
				productQuantity,
				installments,
				totalPrice,
				currencyId: "USD",
				currencyFormat: "$"
			}

			setTotal(total)
		},
		[setTotal]
	)

	return {
		total,
		updateCartTotal
	}
}

export default useCartTotal
