import React, { useContext, useState, ReactNode } from "react"

// Define initial state values
const totalInitialValues = {
	productQuantity: 0,
	installments: 0,
	totalPrice: 0,
	currencyId: "USD",
	currencyFormat: "$"
}

const initialState = {
	isOpen: false,
	products: [],
	cartValue: 0,
	selectedProduct: null,
	total: totalInitialValues,
	userOptions: {
		dontSendCutlery: false,
		dontSendNapkins: false,
		applyCashback: false
	},
	userAddress: {},
	setCartValue: (sum: number) => {},
	setProducts: (value) => {},
	setTotal: (value) => {},
	setIsOpen: (open: boolean) => {}, // Now typed to accept a boolean
	setSelectedProduct: (product: any) => {},
	setUserOptions: (options: any) => {},
	setUserAddress: (address: any) => {}
}

// Define the CartContext with the correct typing
const CartContext = React.createContext(initialState)

// Custom hook to access CartContext
const useCartContext = () => {
	const context = useContext(CartContext)

	if (!context) {
		throw new Error("useCartContext must be used within a CartProvider")
	}

	return context
}

// Define the CartProvider component and type its props
interface CartProviderProps {
	children: ReactNode
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [products, setProducts] = useState<any[]>([])
	const [cartValue, setCartValue] = useState<number>(0)
	const [selectedProduct, setSelectedProduct] = useState<any>(null)
	const [total, setTotal] = useState(totalInitialValues)
	const [userOptions, setUserOptions] = useState({
		dontSendCutlery: false,
		dontSendNapkins: false,
		applyCashback: true // default value
	})
	const [userAddress, setUserAddress] = useState<any>({})

	const CartContextValue = {
		isOpen,
		setIsOpen,
		products,
		setProducts,
		selectedProduct,
		setSelectedProduct,
		total,
		setTotal,
		userOptions,
		setUserOptions,
		userAddress,
		setUserAddress,
		cartValue,
		setCartValue
	}

	return (
		<CartContext.Provider value={CartContextValue}>
			{children}
		</CartContext.Provider>
	)
}

export { CartProvider, useCartContext }
