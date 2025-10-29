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
	uri: API_CONFIG.GRAPHQL_ENDPOINT
})

// Auth Link to add authentication headers
const authLink = setContext((_, { headers }) => {
	// Get the authentication token from local storage if it exists
	const token =
		typeof window !== "undefined" ? localStorage.getItem("auth-token") : null

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
			console.error(`[Network error]: ${networkError}`)

			// Handle specific network errors
			if (
				"statusCode" in networkError &&
				(networkError as any).statusCode === 401
			) {
				// Handle unauthorized access
				if (typeof window !== "undefined") {
					localStorage.removeItem("auth-token")
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
	return new ApolloClient({
		ssrMode: true,
		link: from([errorLink, httpLink]), // No auth link for server-side
		cache: new InMemoryCache(),
		defaultOptions: {
			query: {
				errorPolicy: "all"
			}
		}
	})
}
