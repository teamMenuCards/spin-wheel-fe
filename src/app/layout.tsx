import * as React from "react"
import RootLayout from "./root-layout"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import theme from "@mcc/components/ThemeRegistry/theme"

export const metadata = {
	title: "MenuCards",
	description: "MenuCards"
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=0.3, minimum-scale=0.3"
				/>
			</head>
			<body>
				<AppRouterCacheProvider>
					<ThemeProvider theme={theme}>
						{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
						<CssBaseline />
						<RootLayout>{children}</RootLayout>
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	)
}
