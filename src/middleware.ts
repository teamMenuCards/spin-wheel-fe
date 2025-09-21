

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
        Match path like "https://www.menu-cards.com/hav-coffee/table/f101"
        Redirect it to "https://www.menu-cards.com/restaurant/hav-coffee/dine-in"
    */
    // const tableMatch = pathname.match(/^\/([^\/]+)\/table\/([a-zA-Z0-9]+)$/)
    // if (tableMatch) {
    //     const rname = tableMatch[1]
    //     const newUrl = new URL(`/restaurant/${rname}/dine-in`, request.url)
    //     return NextResponse.redirect(newUrl)
    // }

    // Continue for all other requests
    return NextResponse.next()
}

