import { getMenuList } from "@/lib/api-cache"

import SearchClient from "./SearchClient"

export const revalidate = 3600 // 1 hour - same as menu cache

export default async function SearchPage({
	params
}: {
	params: Promise<{ rname: string }>
}) {
	const { rname } = await params
	
	// Server-side: Get cached menu data
	const menuData = await getMenuList(rname)

	return <SearchClient initialMenuData={menuData} />
}
