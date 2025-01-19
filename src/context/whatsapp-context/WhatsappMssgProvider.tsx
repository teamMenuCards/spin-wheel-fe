import React, { useContext, createContext, useState } from "react"

const useWhatsappMssgContext = () => useContext(WhatsappMssgContext)

const WhatsappMssgContext = createContext({
	cashbackAmt: "",
	appliedDiscount: "",
	passFiftyDiscount: "",
	pickup: false,
	couponCode: "",
	greenpassCoupon: "",
	offerCode: "",
	// for handling 50% discount in Coupons page
	setAppliedDiscount: () => undefined,

	// for handling coupon discount in Coupons page
	setCouponcode: () => undefined,

	// for handling 50% discount in GreenPassCoupons page
	setPassFiftyDiscount: () => undefined,
	// for handling coupon discount in GreenPassCoupons page
	setGreenpassCoupon: () => undefined,

	// get the coupon code of pamphlet
	setOfferCode: () => undefined
})

// Create a provider component to wrap your application
export const WhatsappMssgProvider = ({ children }) => {
	const [cashbackAmt, setCashback] = useState("")
	/* this is for showing the value on "Apply discount" Card on cart page */
	const [appliedDiscount, setAppliedDiscount] = useState(0)
	const [passFiftyDiscount, setPassFiftyDiscount] = useState(0)

	const [pickup, setPickup] = useState(false)
	const [couponCode, setCouponcode] = useState("")
	const [greenpassCoupon, setGreenpassCoupon] = useState("")
	// get the coupon code of pamphlet
	const [offerCode, setOfferCode] = useState()

	const values = {
		cashbackAmt,
		setCashback,
		appliedDiscount,
		setAppliedDiscount,
		pickup,
		setPickup,
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
