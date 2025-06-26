"use client"
import { useState } from "react"
import { IDynamicLink } from "@/types"
import { IOption } from "../types"
import InfoButton from "./InfoButton"
import { useParams } from "next/navigation"
import dynamic from "next/dynamic"
import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"
// import { useFeatureList } from "@/hooks/useFeatureList"

const FeedbackPopup = dynamic(() => import("../components/feedback"))

// type RestaurantConfig = {
// 	showReferralPopup: boolean
// 	showFeedbackPopup: boolean
// }

const REVIEW_OPTIONS = new Set(["review us on google", "review us on zomato"])

const normalize = (str: string) => str.trim().toLowerCase().replace(/\s+/g, " ")

const DineInButtons = ({
	isDineIn = false,
	options,
	dynamicOptions,
	restaurantInfo,
	hasReviewFeature
}: {
	isDineIn?: boolean
	dynamicOptions?: IDynamicLink[]
	restaurantInfo?: RestaurantDetailResponse | undefined
	options?: {
		deliveryOptions: IOption[]
		dineInOptions: IOption[]
	}
	hasReviewFeature?: boolean
}) => {
	const { rname } = useParams<{ rname: string }>()

	const [activeFeedback, setActiveFeedback] = useState(false)

	const { dineInOptions = [], deliveryOptions = [] } = options || {}

	const links = (dynamicOptions ?? []).sort(
		(a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
	)
	// const [activePopup, setActivePopup] = useState<string | null>(null)
	const [redirectLink, setRedirectLink] = useState<string | null>(null)

	const handleClick =
		(item: IOption | IDynamicLink) => (e: React.MouseEvent) => {
			const itemValue = "value" in item ? item.value : item.name

			const normalizedValue = normalize(itemValue)

			const link = "path" in item ? item.path ?? "/" : item.url ?? "/"
			setRedirectLink(link)

			const openFeedbackPopup =
				REVIEW_OPTIONS.has(normalizedValue) && hasReviewFeature

			if (openFeedbackPopup) {
				e.preventDefault()
				setRedirectLink(link)
				setActiveFeedback(true)
			} else {
				window.location.href = link
			}
		}

	// const handleReferralSubmit = (selectedOptions: string) => {
	// 	console.log("Referral selected:", selectedOptions)
	// 	setActivePopup(null)
	// 	if (redirectLink) {
	// 		window.location.href = redirectLink
	// 	}
	// }

	return (
		<div className="relative flex flex-col items-center w-full max-w-[400px] mt-8 mx-auto px-4">
			<div className="absolute top-[-16px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

			{/* DYNAMIC Menu for IS_DELIVERY page */}
			{!isDineIn &&
				links &&
				links?.map((item: IDynamicLink, index) => {
					return item.active ? (
						<InfoButton
							key={index}
							value={item.name}
							href={item?.url ?? "/"}
							icon={item.image_url}
							premium={item?.is_premium}
							onClick={handleClick(item)}
						/>
					) : null
				})}

			{activeFeedback && hasReviewFeature && (
				<FeedbackPopup
					rname={rname}
					redirect={redirectLink || "/"}
					restaurantInfo={restaurantInfo}
					onClose={() => setActiveFeedback(false)}
				/>
			)}

			{/* DEFAULT DINE_IN buttons */}
			{isDineIn &&
				dineInOptions?.map((item: IOption, index) =>
					item.show ? (
						<InfoButton
							key={index}
							href={item?.path ?? "/"}
							icon={item.icon}
							value={item.value}
							onClick={handleClick(item)}
						/>
					) : null
				)}

			{/* {activePopup && restaurantConfig.showReferralPopup && (
				<ReferralPopup
					onClose={() => setActivePopup(null)}
					onSubmit={handleReferralSubmit}
				/>
			)} */}

			{/*  DEFAULT DELIVERY option buttons */}
			{!isDineIn &&
				deliveryOptions?.map((item: IOption, index) =>
					item.show ? (
						<InfoButton
							key={index}
							href={
								item.value === "Order from Zomato" ||
								item.value === "Order from Swiggy"
									? "#"
									: item.path || "#"
							}
							icon={item.icon}
							value={item.value}
							onClick={handleClick(item)}
						/>
					) : null
				)}
		</div>
	)
}

export default DineInButtons
