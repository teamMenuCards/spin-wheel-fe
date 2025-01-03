"use client"
import {
	CartProvider,
	ConfettiProvider,
	RestaurantDetailsProvider,
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
						<RestaurantDetailsProvider>
							<ConfettiProvider>
								<SnackbarProvider>{children}</SnackbarProvider>
							</ConfettiProvider>
						</RestaurantDetailsProvider>
					</CartProvider>
				</WhatsappMssgProvider>
			</QueryClientProvider>
		</>
	)
}
