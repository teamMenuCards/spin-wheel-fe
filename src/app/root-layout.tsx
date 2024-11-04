"use client"
import { SnackbarProvider } from "@mcc/context"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const queryClient = new QueryClient()

/* All providers would be listed here */
export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<SnackbarProvider>{children}</SnackbarProvider>
			</QueryClientProvider>
		</>
	)
}
