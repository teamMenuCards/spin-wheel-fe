/* eslint-disable @typescript-eslint/no-explicit-any */
import { apolloClient } from "@/lib/apollo-client"
import { SPIN_SPINNER } from "@/graphql/mutations/spinner"
import { API_CONFIG } from "@/config/api"

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
		// Log mutation attempt for debugging
		if (process.env.NODE_ENV === "development") {
			console.log("[spinSpinner] Attempting mutation:", {
				spinnerId,
				endpoint: API_CONFIG.GRAPHQL_ENDPOINT
			})
		}

		const { data, error } = await apolloClient.mutate<{
			spinSpinner: SpinSpinnerResult
		}>({
			mutation: SPIN_SPINNER,
			variables: { spinnerId },
			errorPolicy: "all",
			// Add fetch policy to bypass cache for mutations
			fetchPolicy: "no-cache"
		})

		if (error) {
			console.error("Error spinning spinner:", error)
			throw error
		}

		if (process.env.NODE_ENV === "development") {
			console.log("[spinSpinner] Mutation successful:", data)
		}

		return data?.spinSpinner || null
	} catch (error: any) {
		// Enhanced error handling for network errors
		const networkError = error?.networkError || error
		const errorMessage = networkError?.message || error?.message || String(error)
		
		// Log full error details for debugging
		console.error("[spinSpinner] Full error details:", {
			error,
			networkError,
			errorMessage,
			endpoint: API_CONFIG.GRAPHQL_ENDPOINT,
			spinnerId
		})
		
		// Check if it's a network/fetch error
		if (
			errorMessage.includes("Failed to fetch") ||
			errorMessage.includes("fetch failed") ||
			errorMessage.includes("NetworkError") ||
			networkError?.name === "NetworkError" ||
			error?.name === "TypeError"
		) {
			const enhancedError = new Error(
				`Unable to connect to the server at ${API_CONFIG.GRAPHQL_ENDPOINT}. ` +
				`Please check that the server is running and accessible. ` +
				`If queries work but mutations don't, this may be a CORS preflight issue.`
			)
			;(enhancedError as any).networkError = networkError
			;(enhancedError as any).isNetworkError = true
			;(enhancedError as any).originalError = error
			console.error("Network error spinning spinner:", {
				endpoint: API_CONFIG.GRAPHQL_ENDPOINT,
				originalError: errorMessage,
				error,
				suggestion: "Check browser Network tab for CORS errors or blocked requests"
			})
			throw enhancedError
		}
		
		console.error("Error spinning spinner:", error)
		throw error
	}
}

