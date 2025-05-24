"use client"

import { ReactNode } from "react"
import StoreProvider from "./StoreProvider"
import { SnackbarProvider } from "notistack"

export const RootProvider = ({ children }: { children: ReactNode }) => (
	<StoreProvider>
		<SnackbarProvider maxSnack={1}>{children}</SnackbarProvider>
	</StoreProvider>
)
