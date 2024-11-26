import { useCartContext } from "./CartContextProvider"
import useCartProducts from "./useCartProducts"
import useCartTotal from "./useCartTotal"

const useCart = () => {
	const {
		isOpen,
		setIsOpen,
		selectedProduct,
		setSelectedProduct,
		userOptions,
		setUserOptions,
		userAddress,
		setUserAddress,
		cartValue,
		setCartValue
	} = useCartContext()

	const {
		products,
		addProduct,
		removeProduct,
		increaseProductQuantity,
		decreaseProductQuantity
	} = useCartProducts()

	const { total, updateCartTotal } = useCartTotal()

	const openCart = () => setIsOpen(true)
	const closeCart = () => setIsOpen(false)

	return {
		isOpen,
		openCart,
		closeCart,
		products,
		addProduct,
		removeProduct,
		selectedProduct,
		setSelectedProduct,
		increaseProductQuantity,
		decreaseProductQuantity,
		total,
		updateCartTotal,
		userOptions,
		setUserOptions,
		userAddress,
		setUserAddress,
		cartValue,
		setCartValue
	}
}

export default useCart
