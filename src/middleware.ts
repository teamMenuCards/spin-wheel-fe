// import { NextURL } from "next/dist/server/web/next-url"
// import { CLIENT_APP_MODE } from "./store/features/app.slice"

// export function middleware(req: {
// 	nextUrl: NextURL
// 	url: string | URL | undefined
// }) {
// 	const url = req.nextUrl
// 	const { pathname, searchParams } = url

// 	// Match the dynamic route `/restaurant/:slug`
// 	const match = pathname.match(/^\/restaurant\/([^/]+)$/)

// 	if (match) {
// 		const slug = match[1] // Extract dynamic slug
// 		const mParam = searchParams.get("m")

// 		// If query parameter `m` is `DINE_IN`, redirect and remove query params
// 		if (mParam === CLIENT_APP_MODE.DINE_IN) {
// 			return NextResponse.redirect(
// 				new URL(`/restaurant/${slug}/dine-in`, req.url)
// 			)
// 		}
// 	}

// 	return NextResponse.next() // Continue processing other routes
// }

/* 
	Below logic will
 	Redirect /hav-coffee/table/1 to /restaurant/hav-coffee/dine-in 
*/

import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
	const url = request.nextUrl
	const pathname = url.pathname

	// Blocklist of restaurants that should be redirected to 404
	const blockedRestaurants = ["aapla-malvan", "aapla-malvan-lower-parel"]

	// If path matches a blocked restaurant, redirect to 404
	const restaurantMatch = pathname.match(/^\/restaurant\/([^\/]+)\/?/)
	if (restaurantMatch) {
		const rname = restaurantMatch[1]
		if (blockedRestaurants.includes(rname)) {
			return NextResponse.redirect(new URL("/404", request.url))
		}
	}

	/* 
		Match path like "/hav-coffee/table/1"
		Redirect it to "/restaurant/hav-coffee/dine-in"
	*/
	const tableMatch = pathname.match(/^\/([^\/]+)\/table\/\d+$/)
	if (tableMatch) {
		const rname = tableMatch[1]
		const newUrl = new URL(`/restaurant/${rname}/dine-in`, request.url)
		return NextResponse.redirect(newUrl)
	}

	// Continue for all other requests
	return NextResponse.next()
}
