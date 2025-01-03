const getUrl = (url: string) => {
	const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
	return `${baseUrl}/${url}`
}

const prefix = "restaurants"

export const apiRoutes = {
	menuItemtList: getUrl(`${prefix}`),
	restaurantDetails: getUrl(`${prefix}`)
}

export const suffix = {
	menuItemtList: "menu",
	restaurantDetails: "details"
}
