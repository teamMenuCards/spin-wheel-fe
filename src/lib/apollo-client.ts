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
const httpLink = createHttpLink({
	uri: API_CONFIG.GRAPHQL_ENDPOINT,
	fetch: (uri, options) => {
		// Use native fetch for server-side, fallback to window.fetch for client-side
		if (typeof window === "undefined") {
			// Server-side: use node fetch or native fetch
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
		// Client-side: use browser fetch
		return fetch(uri, options)
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
const errorLink = onError(
	({ graphQLErrors, networkError, operation, forward }: any) => {
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
			const errorMessage =
				(networkError as any)?.message || String(networkError)

			console.error(`[Network error]: ${networkError}`)
			console.error(`GraphQL Endpoint: ${endpoint}`)
			console.error(`Running on: ${isServer ? "Server" : "Client"}`)

			// Handle fetch failed errors (common in SSR when server can't reach localhost)
			if (
				errorMessage.includes("fetch failed") ||
				errorMessage.includes("ECONNREFUSED")
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
	}
)

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
