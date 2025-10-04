import { GoogleTagManager } from "@next/third-parties/google"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Montserrat } from "next/font/google"
import Script from "next/script"
import "./globals.css"

import ErrorBoundary from "../components/shared/ErrorBoundary"
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
			<head>
				{/* Google Tag Manager Script */}
				<GoogleTagManager gtmId="GTM-N6WPVHXW" />

				{/* Microsoft Clarity Script */}
				<Script
					id="clarity-script"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
							 (function(c,l,a,r,i,t,y){
								c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
								t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
								y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
							})(window, document, "clarity", "script", "qamligptbk");
						`
					}}
				/>
			</head>

			<body
				className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
			>
				<noscript>
					<iframe
						src="https://www.googletagmanager.com/ns.html?id=GTM-N6WPVHXW"
						height="0"
						width="0"
						style={{ display: "none", visibility: "hidden" }}
					></iframe>
				</noscript>
				<ErrorBoundary>
					<RootProvider>{children}</RootProvider>
				</ErrorBoundary>
			</body>
		</html>
	)
}
