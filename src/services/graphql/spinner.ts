import { unstable_cache } from "next/cache"
import { GET_SPINNER_FOR_RESTAURANT } from "@/graphql/queries/spinner"
import { createServerApolloClient } from "@/lib/apollo-client"
import { CACHE_TAG_ALL_APIS } from "@/lib/cache-tags"

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

// Internal server function (without cache)
const _getSpinnerForRestaurantServer = async (
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

// Server-side function with cache tags for Vercel
export const getSpinnerForRestaurantServer = async (
	restaurantId: string
): Promise<SpinnerData | null> => {
	return unstable_cache(
		async () => {
			return _getSpinnerForRestaurantServer(restaurantId)
		},
		[`spinner-${restaurantId}`],
		{
			tags: [
				CACHE_TAG_ALL_APIS, // Common tag for all APIs (for Vercel)
				`spinner-${restaurantId}`,
				"spinner",
				"spinners"
			],
			revalidate: 36000 // 10 hours
		}
	)()
}
