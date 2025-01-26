import * as React from "react"

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
			<body>{children}</body>
		</html>
	)
}
