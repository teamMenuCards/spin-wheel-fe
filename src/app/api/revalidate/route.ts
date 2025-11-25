import {
	revalidateAllApis,
	revalidateRestaurantAll
} from "@/lib/cache-revalidate"
import { NextRequest, NextResponse } from "next/server"

/**
 * API route for revalidating cache tags
 *
 * Usage:
 * GET/POST /api/revalidate?restaurantName=<name>&restaurantId=<id>
 *
 * Examples:
 * - curl: curl -X POST "https://your-domain.com/api/revalidate?restaurantName=my-restaurant&restaurantId=123"
 * - Webhook: Set up in your backend to call this when data changes
 * - Server-side: Use fetch() from Next.js server components/actions
 */
export async function GET(request: NextRequest) {
	return handleRevalidate(request)
}

export async function POST(request: NextRequest) {
	return handleRevalidate(request)
}

async function handleRevalidate(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url)
		const restaurantName = searchParams.get("restaurantName")
		const restaurantId = searchParams.get("restaurantId")
		const revalidateAll = searchParams.get("all") === "true"
		// const secret = searchParams.get("secret")

		// Optional: Add secret validation for security
		// Uncomment and set REVALIDATE_SECRET in environment variables
		if (
			process.env.REVALIDATE_SECRET
			// && secret !== process.env.REVALIDATE_SECRET
		) {
			return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
		}

		// Revalidate all APIs if "all=true" parameter is provided
		if (revalidateAll) {
			await revalidateAllApis()
			return NextResponse.json({
				revalidated: true,
				message: "All GraphQL APIs cache revalidated",
				tag: "all-graphql-apis",
				now: Date.now()
			})
		}

		if (!restaurantName || !restaurantId) {
			return NextResponse.json(
				{
					message:
						"Missing restaurantName or restaurantId. Use ?all=true to revalidate all APIs.",
					example: "/api/revalidate?all=true"
				},
				{ status: 400 }
			)
		}

		await revalidateRestaurantAll(restaurantName, restaurantId)

		return NextResponse.json({
			revalidated: true,
			restaurantName,
			restaurantId,
			now: Date.now()
		})
	} catch (error) {
		return NextResponse.json(
			{ message: "Error revalidating cache", error: String(error) },
			{ status: 500 }
		)
	}
}
