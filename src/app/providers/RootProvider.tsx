"use client"

import { ApolloWrapper } from "@/lib/apollo-wrapper"
import { ReactNode } from "react"
import { ScrollProvider } from "./ProgressbarProvider"
import { SnackbarProvider } from "./SnackbarProvider"
import StoreProvider from "./StoreProvider"

export const RootProvider = ({ children }: { children: ReactNode }) => (
	<ApolloWrapper>
		<ScrollProvider>
			<StoreProvider>
				<SnackbarProvider>{children}</SnackbarProvider>
			</StoreProvider>
		</ScrollProvider>
	</ApolloWrapper>
)
