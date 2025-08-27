"use client"

import { ReactNode } from "react"
import { ScrollProvider } from './ProgressbarProvider'
import { SnackbarProvider } from "./SnackbarProvider"
import StoreProvider from "./StoreProvider"

export const RootProvider = ({ children }: { children: ReactNode }) => (
	<ScrollProvider>
		<StoreProvider>
			<SnackbarProvider>{children}</SnackbarProvider>
		</StoreProvider>
	</ScrollProvider>
)
