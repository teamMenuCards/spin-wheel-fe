// NOTE: Currently unused in production - only used in test/example components
// Uncomment if needed for client-side React hooks

/*
import { GET_MENU_LIST } from "@/graphql/queries/menu"
import { Category } from "@/services/graphql/menu"
import { useQuery } from "@apollo/client/react"
import { transformMenuData } from "@/utils/transform-menu-data"

export const useMenuList = (id: string) => {
	const { data, loading, error, refetch } = useQuery(GET_MENU_LIST, {
		variables: { id },
		errorPolicy: "all",
		fetchPolicy: "cache-first",
		skip: !id // Skip query if id is not provided
	})

	// Get raw categories from API
	const categories = (data as any)?.productCategoriesByRestaurant || []
	
	// Transform new API data to match old format
	const transformedData: Category[] = transformMenuData(categories)

	return {
		data: transformedData,
		loading,
		error,
		refetch
	}
}
*/
