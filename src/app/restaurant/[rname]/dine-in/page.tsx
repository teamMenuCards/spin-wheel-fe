"use client"
import React, { useEffect, useRef } from "react"
import DineInfoCard from "../shared/DineInfoCard"
import DineInButtons from "../shared/DineInButtons"

import { useGetRestaurantDetailByNameQuery } from "@/services/restaurant/get-restaurant-detail"
import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"

import { IOption } from "../types"
import { useParams } from "next/navigation"
import { CLIENT_APP_MODE, setMode } from "@/store/features/app.slice"
import { useAppSelector } from "@/store/hooks"
import { useDispatch } from "react-redux"
import BackgroundImage from "../shared/BackgroundImg"
import { isSafeArray } from "@/utils/isSafeArray"
import { IDynamicLink } from "@/types"

function DineInLandingPage() {
	const dispatch = useDispatch()
	const { rname } = useParams<{ rname: string }>()
	const DINE_IN = CLIENT_APP_MODE.DINE_IN
	const mode = useAppSelector((state) => state.appState.mode)
	const { currentData: restaurantInfo } =
		useGetRestaurantDetailByNameQuery(rname)

	const dashboardLinks = restaurantInfo?.dashboardLinks || []

	/*  Find Enabled features  */
	useEffect(() => {
		if (restaurantInfo?.detail?.feature_flags) {
			const featureList = restaurantInfo.detail.feature_flags

			const enabledFeatures = Object.keys(featureList).filter(
				(item) => !!featureList[item]
			)

			localStorage.setItem(rname, JSON.stringify(enabledFeatures))
		}
	}, [dispatch, restaurantInfo, rname])

	const diningLinks =
		isSafeArray(dashboardLinks) &&
		dashboardLinks?.filter((link: IDynamicLink) => link.link_type === "DINING")

	// Type guard to validate `DINE_IN`
	const validMode = Object.values(CLIENT_APP_MODE).find(
		(m): m is CLIENT_APP_MODE => m === DINE_IN
	)

	useEffect(() => {
		if (validMode && mode !== validMode) {
			dispatch(setMode(validMode))
		}
	}, [validMode, dispatch, mode])

	const reviewsRef = useRef<HTMLDivElement>(null!)

	const getPath = (rid: string, data: RestaurantDetailResponse) => {
		const details = data?.detail?.details

		if (details?.platform_details) {
			const linksList: Record<string, string> = {}

			details.platform_details.forEach((item) => {
				linksList[item.platform_name] = item.platform_uri
			})

			const getMssg = (mssg: string) => {
				return encodeURIComponent(mssg)
			}

			const encodedMessage =
				data &&
				getMssg(
					`Hi team ${data.name}. Please keep me updated on the weekly offers`
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
		} else {
			console.error("Invalid or missing platform details")
			return { deliveryOptions: [], dineInOptions: [] }
		}
	}

	const options = restaurantInfo && getPath(rname, restaurantInfo)

	return (
		<div className="w-screen min-h-screen relative overflow-hidden">
			{restaurantInfo && <BackgroundImage restaurantInfo={restaurantInfo} />}

			<div className="w-full bg-white relative mt-[180px] z-[3] min-h-[calc(100vh-180px)] max-w-100 border-20 border-gray-100 rounded-t-[20px] p-[60px_16px_16px]">
				{restaurantInfo && (
					<DineInfoCard
						isDineIn
						restaurantInfo={restaurantInfo}
						reviewsRef={reviewsRef}
					/>
				)}

				{diningLinks && isSafeArray(diningLinks) ? (
					<DineInButtons
						dynamicOptions={diningLinks}
						restaurantInfo={restaurantInfo}
					/>
				) : options && Object.keys(options).length > 0 ? (
					<DineInButtons options={options} restaurantInfo={restaurantInfo} />
				) : null}
			</div>
		</div>
	)
}

export default DineInLandingPage
