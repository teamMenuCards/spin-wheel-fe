import { apiRoutes, suffix } from "@mcc/constants/apiroutes"

export const getProductList = async ({ rid }) => {
	try {
		const response = await fetch(
			`${apiRoutes.menuItemtList}/${rid}/${suffix.menuItemtList}`,
			{
				method: "GET"
			}
		)
		if (!response.ok) {
			throw new Error("Cannot get menu list")
		}

		const data = await response.json()
		return data
	} catch (error) {
		throw error
	}
}
