"use client"
import { SnackbarProvider } from "@mcc/context"

/* All providers would be listed here */
export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<SnackbarProvider>{children}</SnackbarProvider>
		</>
	)
}
