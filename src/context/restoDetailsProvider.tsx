import React, { useContext, createContext, useState } from "react"

const useRestaurantContext = () => useContext(WhatsappMssgContext)

const WhatsappMssgContext = createContext({
	restaurantDetails: { display_name: "" },
	setRestaurantDetails: ({}) => undefined
})

// Create a provider component to wrap your application
export const RestaurantDetailsProvider = ({ children }) => {
	const [restaurantDetails, setRestaurantDetails] = useState({
		display_name: ""
	})

	const values = {
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
