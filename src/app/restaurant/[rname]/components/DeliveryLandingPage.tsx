"use client"
import React, { useState, useEffect, useRef } from "react"
// import DineInfoCard from "./DineInfoCard"
import DineInButtons from "../shared/DineInButtons"
import DineInfoCard from "../shared/DineInfoCard"
import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"
import { IOption } from "../types"
import ReviewsCarousel from "../shared/ReviewsCarousel"
import BackgroundImage from "../shared/BackgroundImg"

function DeliveryLandingPage({
	rname,
	restaurantInfo
}: {
	rname: string
	restaurantInfo: RestaurantDetailResponse | undefined
}) {
	const [currentReview, setCurrentReview] = useState(0)
	const reviewsRef = useRef<HTMLDivElement>(null!)

	const reviews = restaurantInfo?.detail?.details?.reviews_image_url_details

	const getPath = (rid: string, data: RestaurantDetailResponse) => {
		const details = data?.detail?.details || []

		const linksList: Record<string, string> = {}
		details?.platform_details?.forEach((item) => {
			linksList[item.platform_name] = item.platform_uri
		})

		const getMssg = (mssg: string) => {
			return encodeURIComponent(mssg)
		}

		const encodedMessage =
			restaurantInfo &&
			getMssg(
				`Hi team ${restaurantInfo.name}. Please keep me updated on the weekly offers`
			)

		const deliveryOptions: IOption[] = [
			{
				id: 1,
				value: "Menu",
				path: `/restaurant/${rid}/menu`,
				icon: "/menu-icon.webp",
				show: true
			},
			{
				id: 2,
				value: "Contact Us",
				path: linksList["whatsapp-link"],
				icon: "/whatsapp.svg",
				show: !!linksList["whatsapp-link"]
			},
			{
				id: 3,
				value: "Find us at",
				path: linksList["locate-us-link"],
				icon: "/google_map.svg",
				show: !!linksList["locate-us-link"]
			},
			{
				id: 4,
				value: "Order from Zomato",
				path: linksList["zomato-delivery"],
				icon: "/zomato-logo.webp",
				show: !!linksList["zomato-delivery"]
			},
			{
				id: 5,
				value: "Order from Swiggy",
				path: linksList["swiggy-link"],
				icon: "/swiggy-logo.webp",
				show: !!linksList["swiggy-link"]
			}
		]

		const dineInOptions: IOption[] = [
			{
				id: 1,
				value: "Menu",
				path: `/restaurant/${rid}/menu`,
				icon: "/menu-icon.webp",
				show: true
			},

			{
				id: 2,
				value: "Review us on Google",
				path: linksList["google-review"],
				icon: "/google-logo.webp",
				show: !!linksList["google-review"]
			},
			{
				id: 3,
				value: "Say Hello to receive offers",
				path: `${linksList["whatsapp-link"]}${encodedMessage} `,
				icon: "/whatsapp.svg",
				show: !!linksList["whatsapp-link"]
			},
			{
				id: 4,
				value: "Follow on Instagram",
				path: linksList["insta"],
				icon: "/instagram-icon.webp",
				show: !!linksList["insta"]
			}
		]

		return { deliveryOptions, dineInOptions }
	}

	const options = restaurantInfo && getPath(rname, restaurantInfo)

	useEffect(() => {
		if (reviewsRef.current) {
			reviewsRef.current.scrollIntoView({ behavior: "smooth" })
		}
	}, [currentReview])

	return (
		<div className="w-screen min-h-screen relative overflow-hidden bg-black">
			{/* <div
				className="fixed top-0 left-0 w-screen h-[188px] bg-cover bg-center z-[1]"
				style={{
					backgroundImage:
						`url(${restaurantInfo?.detail.cover_image})` || DEFAULT_COVER_IMG
				}}
			/> */}

			{restaurantInfo && <BackgroundImage restaurantInfo={restaurantInfo} />}

			<div className="w-full bg-white relative mt-[180px] z-[3] min-h-[calc(100vh-180px)] max-w-100 border-20 border-gray-100 shadow-md rounded-t-[20px] p-[60px_16px_16px]">
				{restaurantInfo && (
					<DineInfoCard
						restaurantInfo={restaurantInfo}
						reviewsRef={reviewsRef}
					/>
				)}
				{options && <DineInButtons options={options} />}

				{reviews && (
					<ReviewsCarousel
						reviews={reviews}
						currentReview={currentReview}
						setCurrentReview={setCurrentReview}
					/>
				)}
			</div>
		</div>
	)
}

export default DeliveryLandingPage
