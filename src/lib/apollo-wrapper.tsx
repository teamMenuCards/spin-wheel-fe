"use client"

import { apolloClient } from "@/lib/apollo-client"
import { ApolloProvider } from "@apollo/client/react"
import { ReactNode } from "react"

interface ApolloWrapperProps {
	children: ReactNode
}

export function ApolloWrapper({ children }: ApolloWrapperProps) {
	// Ensure we have a valid Apollo Client instance
	if (!apolloClient) {
		console.error("Apollo Client is not initialized")
		return <>{children}</>
	}

	return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
