import type { Metadata } from "next"
import "./globals.css"

import { Geist, Geist_Mono, Montserrat } from "next/font/google"

import { RootProvider } from "./providers/RootProvider"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
	display: "swap"
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
	display: "swap"
})

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin"],
	display: "swap"
})

export const metadata: Metadata = {
	title: "MenuCards",
	description: "MenuCards"
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
			>
				<RootProvider>{children}</RootProvider>
			</body>
		</html>
	)
}
