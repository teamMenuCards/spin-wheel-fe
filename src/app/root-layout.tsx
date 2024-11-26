"use client"
import { SnackbarProvider } from "@mcc/context"
import { CartProvider } from "@mcc/context/cart-context"
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
				<CartProvider>
					<SnackbarProvider>{children}</SnackbarProvider>
				</CartProvider>
			</QueryClientProvider>
		</>
	)
}
