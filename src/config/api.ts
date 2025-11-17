// API Configuration
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4200/"
// Ensure base URL doesn't have trailing slash for GraphQL endpoint construction
const normalizedBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl

export const API_CONFIG = {
	// Base URLs
	REST_BASE_URL: baseUrl,
	GRAPHQL_ENDPOINT: `${normalizedBaseUrl}/graphql`,

	// Feature Flags - GraphQL is now the default
	USE_GRAPHQL: process.env.NEXT_PUBLIC_API_BASE_URL !== "false",

	// Cache Settings
	CACHE_TTL: 10 * 60 * 60, // 10 hours in seconds (matching your current revalidation)

	// Analytics
	GOOGLE_TAG_MANAGER_ID:
		process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || "GTM-N6WPVHXW",
	MICROSOFT_CLARITY_ID:
		process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID || "qamligptbk"
} as const

// Type-safe environment variables
export type ApiConfig = typeof API_CONFIG
