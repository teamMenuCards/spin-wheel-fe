"use client"
import React, { useRef, useEffect } from "react"
import DineInButtons from "../shared/DineInButtons"
import DineInfoCard from "../shared/DineInfoCard"
import { IOption } from "../types"
import ReviewsCarousel from "../shared/ReviewsCarousel"
import BackgroundImage from "../shared/BackgroundImg"
import { isSafeArray } from "@/utils/isSafeArray"
import { IDynamicLink } from "@/types"
import { useDispatch } from "react-redux"
import { setRestaurantDetails } from "@/store/features/restaurant.slice"
import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"

function DeliveryLandingPage({
	rname,
	restaurantInfo
}: {
	rname: string
	restaurantInfo: RestaurantDetailResponse | undefined
}) {
	const dispatch = useDispatch()

	if (restaurantInfo) {
		dispatch(setRestaurantDetails(restaurantInfo))
	}

	useEffect(() => {
		/*  Find Enabled features  */
		if (restaurantInfo?.detail?.feature_flags) {
			const featureList = restaurantInfo?.detail?.feature_flags

			const enabledFeatures = Object.keys(featureList).filter(
				(item) => !!featureList[item]
			)

			localStorage.setItem(rname, JSON.stringify(enabledFeatures))
		}
	}, [dispatch, restaurantInfo, rname])

	useEffect(() => {}, [rname])

	const deliveryLinks =
		isSafeArray(restaurantInfo?.dashboardLinks) &&
		restaurantInfo?.dashboardLinks.filter(
			(link: IDynamicLink) => link.link_type === "DELIVERY"
		)

	const reviewsRef = useRef<HTMLDivElement>(null!)

	const reviews = restaurantInfo?.detail?.details?.reviews_image_url_details

	const getPath = (rid: string, data: RestaurantDetailResponse) => {
		const details = data?.detail?.details

		const linksList: Record<string, string> = {}

		const platformDetails = details.platform_details ?? []

		platformDetails.forEach((item) => {
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
			// {
			// 	id: 3,
			// 	value: "Find us at",
			// 	path: linksList["locate-us-link"],
			// 	icon: "/google_map.svg",
			// 	show: !!linksList["locate-us-link"]
			// },
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
				show: true,
				preload: true
			},

			{
				id: 2,
				value: "Review us on Google",
				path: linksList["google-review"],
				icon: "/google-logo.webp",
				show: !!linksList["google-review"],
				preload: false
			},
			{
				id: 3,
				value: "Say Hello to receive offers",
				path: `${linksList["whatsapp-link"]}${encodedMessage} `,
				icon: "/whatsapp.svg",
				show: !!linksList["whatsapp-link"],
				preload: false
			},
			{
				id: 4,
				value: "Follow on Instagram",
				path: linksList["insta"],
				icon: "/instagram-icon.webp",
				show: !!linksList["insta"],
				preload: false
			}
		]

		return { deliveryOptions, dineInOptions }
	}

	const defualtBtns = restaurantInfo && getPath(rname, restaurantInfo)

	return (
		<div className="w-screen min-h-screen relative overflow-hidden">
			{restaurantInfo && <BackgroundImage restaurantInfo={restaurantInfo} />}

			<div className="w-full bg-white relative mt-[180px] z-[3] min-h-[calc(100vh-180px)] max-w-100 border-20 border-gray-100 rounded-t-[20px] p-[60px_16px_16px]">
				{restaurantInfo && (
					<DineInfoCard
						restaurantInfo={restaurantInfo}
						reviewsRef={reviewsRef}
					/>
				)}

				{deliveryLinks && isSafeArray(deliveryLinks) ? (
					<DineInButtons dynamicOptions={deliveryLinks} />
				) : defualtBtns ? (
					<DineInButtons options={defualtBtns} />
				) : null}

				{reviews && (
					<div ref={reviewsRef}>
						<ReviewsCarousel reviews={reviews} />
					</div>
				)}
			</div>
		</div>
	)
}

export default DeliveryLandingPage
