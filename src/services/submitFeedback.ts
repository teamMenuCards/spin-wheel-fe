import axios from "axios"

const API_BASE_URL = "https://backend.api-wa.co/campaign/serri-india/api/v2"

export const submitRestaurantFeedback = async (payload: {
	apiKey: string | undefined
	campaignName?: string
	destination?: string
	userName?: string
	templateParams?: (string | undefined)[]
	source?: string
	media?: object
	buttons?: never[]
	carouselCards: never[]
	location?: object
	attributes?: object
	paramsFallbackValue?: { SubReason: string }
}) => {
	try {
		const response = await axios.post(`${API_BASE_URL}`, payload)
		return response.data
	} catch (error) {
		console.error("Submit feedback error:", error)
	}
}
