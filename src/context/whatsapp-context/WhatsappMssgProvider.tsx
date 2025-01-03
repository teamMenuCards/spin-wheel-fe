import React, { useContext, createContext, useState, ReactNode } from "react"

// Define the context and state types
interface WhatsappMssgContextType {
	appliedDiscount: number
	passFiftyDiscount: number
	couponCode: string
	greenpassCoupon: string
	offerCode: string | undefined
	setAppliedDiscount: React.Dispatch<React.SetStateAction<number>>
	setCouponcode: React.Dispatch<React.SetStateAction<string>>
	setPassFiftyDiscount: React.Dispatch<React.SetStateAction<number>>
	setGreenpassCoupon: React.Dispatch<React.SetStateAction<string>>
	setOfferCode: React.Dispatch<React.SetStateAction<string | undefined>>
}

// Default context value
const defaultContextValue: WhatsappMssgContextType = {
	appliedDiscount: 0,
	passFiftyDiscount: 0,
	couponCode: "",
	greenpassCoupon: "",
	offerCode: "",
	setAppliedDiscount: () => {},
	setCouponcode: () => {},
	setPassFiftyDiscount: () => {},
	setGreenpassCoupon: () => {},
	setOfferCode: () => {}
}

// Create the context
const WhatsappMssgContext =
	createContext<WhatsappMssgContextType>(defaultContextValue)

// Custom hook to use the context
const useWhatsappMssgContext = () => {
	const context = useContext(WhatsappMssgContext)

	if (!context) {
		throw new Error(
			"useWhatsappMssgContext must be used within a WhatsappMssgProvider"
		)
	}

	return context
}

// Provider component
interface WhatsappMssgProviderProps {
	children: ReactNode
}

export const WhatsappMssgProvider: React.FC<WhatsappMssgProviderProps> = ({
	children
}) => {
	const [appliedDiscount, setAppliedDiscount] = useState<number>(0)
	const [passFiftyDiscount, setPassFiftyDiscount] = useState<number>(0)
	const [couponCode, setCouponcode] = useState<string>("")
	const [greenpassCoupon, setGreenpassCoupon] = useState<string>("")
	const [offerCode, setOfferCode] = useState<string | undefined>(undefined)

	const values: WhatsappMssgContextType = {
		appliedDiscount,
		setAppliedDiscount,
		couponCode,
		setCouponcode,
		offerCode,
		setOfferCode,
		greenpassCoupon,
		setGreenpassCoupon,
		passFiftyDiscount,
		setPassFiftyDiscount
	}

	return (
		<WhatsappMssgContext.Provider value={values}>
			{children}
		</WhatsappMssgContext.Provider>
	)
}

export default useWhatsappMssgContext
