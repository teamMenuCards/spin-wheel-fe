"use client"

import { ReactNode } from "react"
import StoreProvider from "./StoreProvider"
import { SnackbarProvider } from "./SnackbarProvider"

export const RootProvider = ({ children }: { children: ReactNode }) => (
	<StoreProvider>
		<SnackbarProvider>{children}</SnackbarProvider>
	</StoreProvider>
)
