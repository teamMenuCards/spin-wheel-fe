import { GET_SPINNER_FOR_RESTAURANT } from "@/graphql/queries/spinner"
import { createServerApolloClient } from "@/lib/apollo-client"

export type SpinnerData = {
	id: string
	name: string
	baseCustomerCount: number
	distributions: Array<{
		label: string
		percentage: number
		offer: {
			name: string
		}
	}>
}

// Server-side function using server Apollo Client
export const getSpinnerForRestaurantServer = async (
	restaurantId: string
): Promise<SpinnerData | null> => {
	try {
		const client = createServerApolloClient()

		const result = await client.query<{
			spinnerByRestaurantId: SpinnerData | null
		}>({
			query: GET_SPINNER_FOR_RESTAURANT,
			variables: { restaurantId },
			errorPolicy: "none",
			fetchPolicy: "network-only"
		})

		const { data, error } = result

		if (error) {
			console.error("Server: GraphQL error fetching spinner:", error)
			return null
		}

		if (!data) {
			return null
		}

		// Extract spinner data from GraphQL response
		const spinner = data.spinnerByRestaurantId

		if (!spinner) {
			return null
		}

		return spinner
	} catch (error: unknown) {
		console.error("Server: Error fetching spinner for restaurant:", error)
		return null
	}
}
