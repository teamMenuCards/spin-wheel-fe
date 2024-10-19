import * as React from "react"
import RootLayout from "./root-layout"

export const metadata = {
	title: "TheGreenBowl",
	description: "TheGreenBowl"
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<RootLayout>{children}</RootLayout>
			</body>
		</html>
	)
}
