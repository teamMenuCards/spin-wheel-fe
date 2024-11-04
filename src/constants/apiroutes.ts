const getUrl = (url: string) => {
	const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
	return `${baseUrl}/${url}`
}

export const apiRoutes = {
	menuItemtList: getUrl("restaurants/menu-details")
}
