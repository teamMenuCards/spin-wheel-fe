import { NextRequest, NextResponse } from "next/server"
import { API_CONFIG } from "@/config/api"

/**
 * GraphQL Proxy API Route
 * This route proxies GraphQL requests to the backend to bypass CORS issues
 */
export async function POST(request: NextRequest) {
	try {
		// Get the request body
		const body = await request.json()
		
		// Get authorization header from the request
		const authHeader = request.headers.get("authorization")
		
		// Forward the request to the GraphQL endpoint
		const response = await fetch(API_CONFIG.GRAPHQL_ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...(authHeader && { authorization: authHeader })
			},
			body: JSON.stringify(body)
		})
		
		// Get the response data
		const data = await response.json()
		
		// Return the response with proper CORS headers
		return NextResponse.json(data, {
			status: response.status,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Authorization"
			}
		})
	} catch (error: any) {
		console.error("[GraphQL Proxy] Error:", error)
		return NextResponse.json(
			{
				errors: [
					{
						message: error?.message || "Failed to proxy GraphQL request",
						extensions: {
							code: "INTERNAL_SERVER_ERROR"
						}
					}
				]
			},
			{
				status: 500,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "POST, OPTIONS",
					"Access-Control-Allow-Headers": "Content-Type, Authorization"
				}
			}
		)
	}
}

// Handle OPTIONS preflight requests
export async function OPTIONS() {
	return new NextResponse(null, {
		status: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization"
		}
	})
}

