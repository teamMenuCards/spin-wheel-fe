"use client"
import {
	CartProvider,
	ConfettiProvider,
	SnackbarProvider,
	WhatsappMssgProvider
} from "@mcc/context"
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
				<WhatsappMssgProvider>
					<CartProvider>
						<ConfettiProvider>
							<SnackbarProvider>{children}</SnackbarProvider>
						</ConfettiProvider>
					</CartProvider>
				</WhatsappMssgProvider>
			</QueryClientProvider>
		</>
	)
}
