import { apiRoutes } from "@mcc/constants/apiroutes"

export const getProductList = async ({ id }) => {
	try {
		const response = await fetch(`${apiRoutes.menuItemtList}/${id}`, {
			method: "GET"
		})
		if (!response.ok) {
			throw new Error("Cannot get menu list")
		}

		const data = await response.json()
		return data
	} catch (error) {
		throw error
	}
}
