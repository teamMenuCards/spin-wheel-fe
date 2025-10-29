"use client"

import { ReactNode } from "react"
import { ApolloProvider } from "./ApolloProvider"
import { ScrollProvider } from "./ProgressbarProvider"
import { SnackbarProvider } from "./SnackbarProvider"
import StoreProvider from "./StoreProvider"

export const RootProvider = ({ children }: { children: ReactNode }) => (
	<ApolloProvider>
		<ScrollProvider>
			<StoreProvider>
				<SnackbarProvider>{children}</SnackbarProvider>
			</StoreProvider>
		</ScrollProvider>
	</ApolloProvider>
)
