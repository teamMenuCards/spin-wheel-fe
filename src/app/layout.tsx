import type { Metadata } from "next"
import "./globals.css"
import Script from "next/script"

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
			<head>
				{/* Google Tag Manager Script */}
				<Script
					id="google-tag-manager"
					strategy="afterInteractive"
					src={`https://www.googletagmanager.com/gtm.js?id=GTM-MWFQKB7H`}
				/>

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
						src="https://www.googletagmanager.com/ns.html?id=GTM-MWFQKB7H"
						height="0"
						width="0"
						style={{ display: "none", visibility: "hidden" }}
					></iframe>
				</noscript>
				<RootProvider>{children}</RootProvider>
			</body>
		</html>
	)
}
