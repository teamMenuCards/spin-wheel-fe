import { API_CONFIG } from "@/config/api"
import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	from
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"

// HTTP Link for GraphQL endpoint
// Use proxy API route for client-side to bypass CORS, direct endpoint for server-side
const getGraphQLEndpoint = () => {
	// Client-side: use Next.js API proxy to bypass CORS
	if (typeof window !== "undefined") {
		return "/api/graphql"
	}
	// Server-side: use direct endpoint (no CORS issues)
	return API_CONFIG.GRAPHQL_ENDPOINT
}

const httpLink = createHttpLink({
	uri: getGraphQLEndpoint(),
	fetch: (uri, options) => {
		// Server-side: add error handling
		if (typeof window === "undefined") {
			return fetch(uri, options).catch((error) => {
				console.error(
					`Server-side fetch failed for ${uri}. This might happen if:\n` +
						`1. The GraphQL server is not running\n` +
						`2. The server cannot reach ${uri} (use an absolute URL or internal network URL)\n` +
						`3. Network connectivity issues\n` +
						`Error: ${error.message}`
				)
				throw error
			})
		}
		
		// Client-side: handle CORS preflight properly
		// Only add logging in development
		if (process.env.NODE_ENV === "development") {
			try {
				const body = options?.body ? JSON.parse(options.body as string) : null
				console.log("[Apollo Client] Making request to:", uri, {
					method: options?.method || "POST",
					operationName: body?.operationName,
					hasAuth: !!(options?.headers as any)?.authorization
				})
			} catch (e) {
				// Ignore parse errors
			}
		}
		
		// Build fetch options that minimize CORS preflight issues
		const fetchOptions: RequestInit = {
			...options,
			// Don't include credentials to avoid CORS preflight
			// Server should handle auth via headers, not cookies
			credentials: "omit",
			// Ensure CORS mode is set
			mode: "cors",
			// Ensure headers are properly formatted
			headers: {
				...options?.headers,
				// Remove any undefined headers
			}
		}
		
		// Remove undefined headers to avoid issues
		if (fetchOptions.headers) {
			const headers: Record<string, string> = {}
			Object.entries(fetchOptions.headers).forEach(([key, value]) => {
				if (value !== undefined && value !== null && value !== "") {
					headers[key] = String(value)
				}
			})
			fetchOptions.headers = headers
		}
		
		// Make the request with proper CORS handling
		return fetch(uri, fetchOptions).catch((error: any) => {
			// Enhanced error for CORS issues
			const errorMessage = error?.message || String(error)
			if (
				errorMessage.includes("Failed to fetch") ||
				errorMessage.includes("CORS") ||
				errorMessage.includes("NetworkError")
			) {
				console.error(
					`[CORS Error] Request to ${uri} failed.\n` +
						`This is likely a CORS preflight issue. The server needs to:\n` +
						`1. Allow your origin in Access-Control-Allow-Origin\n` +
						`2. Handle OPTIONS preflight requests\n` +
						`3. Allow Authorization header in Access-Control-Allow-Headers\n` +
						`\nRequest details: ${JSON.stringify({
							method: fetchOptions.method,
							headers: Object.keys(fetchOptions.headers || {})
						})}`
				)
			}
			throw error
		})
	}
})

// Auth Link to add authentication headers
const authLink = setContext((_, { headers }) => {
	// Get the authentication token from local storage if it exists
	const token =
		typeof window !== "undefined" ? localStorage.getItem("token") : null

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
			"Content-Type": "application/json"
		}
	}
})

// Error Link for handling GraphQL errors
const errorLink = onError(({ graphQLErrors, networkError }: any) => {
	if (graphQLErrors) {
		graphQLErrors.forEach(({ message, locations, path }: any) => {
			console.error(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		})
	}

	if (networkError) {
		const statusCode =
			(networkError as any)?.statusCode || (networkError as any)?.status
		const endpoint = API_CONFIG.GRAPHQL_ENDPOINT
		const isServer = typeof window === "undefined"
		const errorMessage = (networkError as any)?.message || String(networkError)

		console.error(`[Network error]: ${networkError}`)
		console.error(`GraphQL Endpoint: ${endpoint}`)
		console.error(`Running on: ${isServer ? "Server" : "Client"}`)

		// Handle fetch failed errors (common in SSR when server can't reach localhost)
		if (
			errorMessage.includes("fetch failed") ||
			errorMessage.includes("ECONNREFUSED") ||
			errorMessage.includes("Failed to fetch")
		) {
			if (isServer) {
				console.error(
					`Server-side fetch failed. This usually means:\n` +
						`1. The GraphQL server at ${endpoint} is not running\n` +
						`2. The Next.js server cannot reach localhost URLs (try using the internal IP or hostname)\n` +
						`3. For production, ensure NEXT_PUBLIC_GRAPHQL_ENDPOINT points to an accessible URL\n` +
						`4. Consider using an internal network URL for server-side requests\n` +
						`\nTip: If your GraphQL server is on the same machine, try using:\n` +
						`- 127.0.0.1 instead of localhost\n` +
						`- Or your machine's internal IP address`
				)
			} else {
				// Client-side fetch failed
				console.error(
					`Client-side fetch failed. This usually means:\n` +
						`1. The GraphQL server at ${endpoint} is not running\n` +
						`2. CORS is not properly configured on the server\n` +
						`3. Network connectivity issues\n` +
						`4. The endpoint URL is incorrect\n` +
						`\nTo fix this:\n` +
						`- Ensure the GraphQL server is running at ${endpoint}\n` +
						`- Check that CORS is enabled for your frontend origin\n` +
						`- Verify NEXT_PUBLIC_API_BASE_URL in your .env.local file\n` +
						`- Check your browser's network tab for more details`
				)
			}
		}

		if (statusCode === 404) {
			console.error(
				`GraphQL endpoint not found (404). Please check:\n` +
					`1. Is the GraphQL server running?\n` +
					`2. Is the endpoint URL correct? Current: ${endpoint}\n` +
					`3. Set NEXT_PUBLIC_GRAPHQL_ENDPOINT in your .env.local file`
			)
		}

		// Handle specific network errors
		if (statusCode === 401) {
			// Handle unauthorized access
			if (typeof window !== "undefined") {
				localStorage.removeItem("token")
				// Optionally redirect to login page
				// window.location.href = '/login'
			}
		}
	}
})

// Create Apollo Client
export const apolloClient = new ApolloClient({
	link: from([errorLink, authLink, httpLink]),
	cache: new InMemoryCache({
		typePolicies: {
			// Define cache policies for specific types
			Restaurant: {
				fields: {
					// Cache restaurant details for 10 hours (matching your current revalidation)
					details: {
						merge: true
					}
				}
			},
			Category: {
				fields: {
					products: {
						merge: false // Replace products array instead of merging
					}
				}
			}
		}
	}),
	defaultOptions: {
		watchQuery: {
			errorPolicy: "all"
		},
		query: {
			errorPolicy: "all"
		}
	}
})

// Server-side Apollo Client for SSR
export const createServerApolloClient = () => {
	// Create a server-side auth context that ensures Content-Type header is set
	const serverAuthLink = setContext((_, { headers }) => {
		return {
			headers: {
				...headers,
				"Content-Type": "application/json"
			}
		}
	})

	return new ApolloClient({
		ssrMode: true,
		link: from([errorLink, serverAuthLink, httpLink]),
		cache: new InMemoryCache(),
		defaultOptions: {
			query: {
				errorPolicy: "all"
			}
		}
	})
}
