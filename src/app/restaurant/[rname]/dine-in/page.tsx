"use client"
import React, { useEffect, useRef } from "react"
import DineInfoCard from "../shared/DineInfoCard"
import DineInButtons from "../shared/DineInButtons"

import {
	RestaurantDetailResponse,
	useGetRestaurantDetailByNameQuery
} from "@/services/restaurant/get-restaurant-detail"
import { IOption } from "../types"
import { useParams } from "next/navigation"
import { CLIENT_APP_MODE, setMode } from "@/store/features/app.slice"
import { useAppSelector } from "@/store/hooks"
import { useDispatch } from "react-redux"

function DineInLandingPage() {
	const { rname } = useParams<{ rname: string }>()
	const modeFromUrl = CLIENT_APP_MODE.DINE_IN
	const dispatch = useDispatch()
	const mode = useAppSelector((state) => state.appState.mode)
	const { currentData: restaurantInfo } =
		useGetRestaurantDetailByNameQuery(rname)

	// Type guard to validate `modeFromUrl`
	const validMode = Object.values(CLIENT_APP_MODE).find(
		(m): m is CLIENT_APP_MODE => m === modeFromUrl
	)

	useEffect(() => {
		if (validMode && mode !== validMode) {
			dispatch(setMode(validMode))
		}
	}, [validMode, dispatch, mode])

	const reviewsRef = useRef<HTMLDivElement>(null!)

	const DEFAULT_COVER = 'url("/goodFood.webp")'

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
				icon: "/menu-icon.png",
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
				icon: "/zomato-logo.png",
				show: !!linksList["zomato-delivery"]
			},
			{
				id: 5,
				value: "Order from Swiggy",
				path: linksList["swiggy-link"],
				icon: "/swiggy-logo.png",
				show: !!linksList["swiggy-link"]
			}
		]

		const dineInOptions: IOption[] = [
			{
				id: 1,
				value: "Menu",
				path: `/restaurant/${rid}/menu`,
				icon: "/menu-icon.png",
				show: true
			},

			{
				id: 2,
				value: "Review us on Google",
				path: linksList["google-review"],
				icon: "/google-logo.png",
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
				icon: "/instagram-icon.png",
				show: !!linksList["insta"]
			}
		]

		return { deliveryOptions, dineInOptions }
	}

	const options = restaurantInfo && getPath(rname, restaurantInfo)

	return (
		<div className="w-screen min-h-screen relative overflow-hidden bg-black">
			<div
				className="fixed top-0 left-0 w-screen h-[188px] bg-cover bg-center z-[1]"
				style={{
					backgroundImage:
						DEFAULT_COVER || `url(${restaurantInfo?.detail.cover_image})`
				}}
			/>
			<div className="w-full bg-white relative mt-[180px] z-[3] min-h-[calc(100vh-180px)] max-w-100 border-20 border-gray-100 shadow-md rounded-t-[20px] p-[60px_16px_16px]">
				{restaurantInfo && (
					<DineInfoCard
						isDineIn
						restaurantInfo={restaurantInfo}
						reviewsRef={reviewsRef}
					/>
				)}
				{options && <DineInButtons options={options} isDineIn />}
			</div>
		</div>
	)
}

export default DineInLandingPage
