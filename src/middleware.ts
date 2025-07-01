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

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
	const url = request.nextUrl
	const pathname = url.pathname

	// Match path like /hav-coffee/table/1
	const match = pathname.match(/^\/([^\/]+)\/table\/\d+$/)

	if (match) {
		const rname = match[1] // "hav-coffee"
		const newUrl = new URL(`/restaurant/${rname}/dine-in`, request.url)
		return NextResponse.redirect(newUrl)
	}

	// Continue for all other requests
	return NextResponse.next()
}
