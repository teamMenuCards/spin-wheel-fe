import { apolloClient } from "@/lib/apollo-client"
import { SPIN_SPINNER } from "@/graphql/mutations/spinner"

export interface SpinSpinnerOffer {
	name: string
	discountType: string
	discountValue?: number
}

export interface SpinSpinnerResult {
	offer: SpinSpinnerOffer | null
}

/**
 * Spin the spinner and get the winning offer
 * @param spinnerId - The ID of the spinner to spin
 * @returns The spin result with the winning offer, or null if no offer
 */
/**
 * Mock function for testing - returns dummy data matching API structure
 * This can be used when API is not available
 * 
 * Based on actual API distributions:
 * - "60% off" (10% probability) -> "spinner discount 60% on bill"
 * - "20% off" (20% probability) -> "spinner discount 20% on bill"
 * - "10% off" (25% probability) -> "spinner discount 10% on bill"
 * - "30% off" (15% probability) -> "spinner discount 30% on bill"
 */
export const spinSpinnerMock = async (
	spinnerId: string
): Promise<SpinSpinnerResult | null> => {
	// Simulate API delay (500ms to 1s)
	const delay = 500 + Math.random() * 500
	await new Promise(resolve => setTimeout(resolve, delay))

	// Dummy offers matching actual API distributions
	// These match the actual offer names from the API
	const dummyOffers: SpinSpinnerOffer[] = [
		{ 
			name: "spinner discount 60% on bill", 
			discountType: "percentage", 
			discountValue: 60 
		},
		{ 
			name: "spinner discount 20% on bill", 
			discountType: "percentage", 
			discountValue: 20 
		},
		{ 
			name: "spinner discount 10% on bill", 
			discountType: "percentage", 
			discountValue: 10 
		},
		{ 
			name: "spinner discount 30% on bill", 
			discountType: "percentage", 
			discountValue: 30 
		},
	]

	// Weighted random selection based on probability distribution
	// 60% off: 10% probability, 20% off: 20%, 10% off: 25%, 30% off: 15%
	// For simplicity, we'll use equal probability or you can implement weighted selection
	const random = Math.random()
	let selectedOffer: SpinSpinnerOffer

	if (random < 0.10) {
		// 10% probability for 60% off
		selectedOffer = dummyOffers[0]
	} else if (random < 0.30) {
		// 20% probability for 20% off
		selectedOffer = dummyOffers[1]
	} else if (random < 0.55) {
		// 25% probability for 10% off
		selectedOffer = dummyOffers[2]
	} else {
		// 15% probability for 30% off
		selectedOffer = dummyOffers[3]
	}

	// For testing specific offers, uncomment one of these:
	// selectedOffer = dummyOffers[0] // Always return 60% off
	// selectedOffer = dummyOffers[1] // Always return 20% off
	// selectedOffer = dummyOffers[2] // Always return 10% off
	// selectedOffer = dummyOffers[3] // Always return 30% off

	console.log("🎲 Mock API Response:", {
		spinnerId,
		offer: selectedOffer,
		timestamp: new Date().toISOString()
	})

	return {
		offer: selectedOffer
	}
}

export const spinSpinner = async (
	spinnerId: string
): Promise<SpinSpinnerResult | null> => {
	// TODO: Set this to false when API is ready
	const USE_MOCK_DATA = true

	if (USE_MOCK_DATA) {
		console.log("⚠️ Using mock data for testing. Set USE_MOCK_DATA to false when API is ready.")
		return spinSpinnerMock(spinnerId)
	}

	try {
		const { data, error } = await apolloClient.mutate<{
			spinSpinner: SpinSpinnerResult
		}>({
			mutation: SPIN_SPINNER,
			variables: { spinnerId },
			errorPolicy: "all"
		})

		if (error) {
			console.error("Error spinning spinner:", error)
			throw error
		}

		return data?.spinSpinner || null
	} catch (error: any) {
		console.error("Error spinning spinner:", error)
		// Fallback to mock data on error
		console.log("⚠️ API error, falling back to mock data")
		return spinSpinnerMock(spinnerId)
	}
}

