// API Configuration
export const API_CONFIG = {
	// Base URLs
	REST_BASE_URL:
		process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4200/",
	GRAPHQL_ENDPOINT:
		process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:3010/graphql",

	// Feature Flags - GraphQL is now the default
	USE_GRAPHQL: process.env.NEXT_PUBLIC_USE_GRAPHQL !== "false",

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
