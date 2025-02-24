import { NextURL } from "next/dist/server/web/next-url"
import { NextResponse } from "next/server"
import { CLIENT_APP_MODE } from "./store/features/app.slice"

export function middleware(req: {
	nextUrl: NextURL
	url: string | URL | undefined
}) {
	const url = req.nextUrl
	const { pathname, searchParams } = url

	// Match the dynamic route `/restaurant/:slug`
	const match = pathname.match(/^\/restaurant\/([^/]+)$/)

	if (match) {
		const slug = match[1] // Extract dynamic slug
		const mParam = searchParams.get("m")

		// If query parameter `m` is `DINE_IN`, redirect and remove query params
		if (mParam === CLIENT_APP_MODE.DINE_IN) {
			return NextResponse.redirect(
				new URL(`/restaurant/${slug}/dine-in`, req.url)
			)
		}
	}

	return NextResponse.next() // Continue processing other routes
}
