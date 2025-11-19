/* eslint-disable @typescript-eslint/no-explicit-any */
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
 * 
 * @param spinnerId - The ID of the spinner to spin
 * @returns The spin result with the winning offer, or null if no offer
 */
export const spinSpinner = async (
	spinnerId: string
): Promise<SpinSpinnerResult | null> => {
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
		throw error
	}
}

