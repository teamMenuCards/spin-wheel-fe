import { GET_SPINNER_FOR_RESTAURANT } from "@/graphql/queries/spinner"
import { SpinnerData } from "@/services/graphql/spinner"
import { useQuery } from "@apollo/client/react"

export const useSpinnerForRestaurant = (restaurantId: string) => {
	const { data, loading, error, refetch } = useQuery<{
		spinnerByRestaurantId: SpinnerData | null
	}>(GET_SPINNER_FOR_RESTAURANT, {
		variables: { restaurantId },
		errorPolicy: "all",
		fetchPolicy: "cache-first",
		skip: !restaurantId // Skip query if restaurantId is not provided
	})

	console.log("useSpinnerForRestaurant--", data)
	const spinner = data?.spinnerByRestaurantId

	return {
		data: spinner || null,
		loading,
		error,
		refetch
	}
}
