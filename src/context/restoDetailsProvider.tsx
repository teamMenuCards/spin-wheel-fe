import React, { useContext, createContext, useState } from "react"

const useRestaurantContext = () => useContext(WhatsappMssgContext)

const WhatsappMssgContext = createContext({
	restaurantDetails: { display_name: "", detail: { phone_no: "" } },
	setRestaurantDetails: ({}) => undefined
})

interface IValues {
	restaurantDetails: {
		display_name: string
		detail: {
			phone_no: string
		}
	}
	setRestaurantDetails: (value) => any
}

// Create a provider component to wrap your application
export const RestaurantDetailsProvider = ({ children }) => {
	const [restaurantDetails, setRestaurantDetails] = useState({
		display_name: "",
		detail: {
			phone_no: ""
		}
	})

	const values: IValues = {
		restaurantDetails,
		setRestaurantDetails
	}

	return (
		<WhatsappMssgContext.Provider value={values}>
			{children}
		</WhatsappMssgContext.Provider>
	)
}

export default useRestaurantContext
