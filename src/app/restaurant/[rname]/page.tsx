"use client"
import React from "react"
import DeliveryLandingPage from "./components/DeliveryLandingPage"
import { useParams } from "next/navigation"
import { useGetRestaurantDetailByNameQuery } from "@/services/restaurant/get-restaurant-detail"
import Script from "next/script"

/* 
		By defult the delivery page is the landing page
		"http://menu-cards.com/restaurant/<name>/dine-in" is the Dining Landing page 

*/

export default function Page() {
	const { rname } = useParams<{ rname: string }>()

	const { currentData } = useGetRestaurantDetailByNameQuery(rname)

	return (
		<div>
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

			<noscript>
				<iframe
					src="https://www.googletagmanager.com/ns.html?id=GTM-MWFQKB7H"
					height="0"
					width="0"
					style={{ display: "none", visibility: "hidden" }}
				></iframe>
			</noscript>

			<DeliveryLandingPage rname={rname} restaurantInfo={currentData} />
		</div>
	)
}
