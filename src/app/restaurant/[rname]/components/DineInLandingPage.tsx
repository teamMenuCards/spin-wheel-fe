"use client"
import React, { useEffect, useRef, useState } from "react"
import DineInfoCard from "./DineInfoCard"
import DineInButtons from "./DineInButtons"
// import VerifiedReviews from "./VerifiedReviews"
import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"
import { IOption } from "../types"

function DineInLandingPage({
	rname,
	restaurantInfo
}: {
	rname: string
	restaurantInfo: RestaurantDetailResponse | undefined
}) {
	// const [currentReview, setCurrentReview] = useState(0)
	const reviewsRef = useRef<HTMLDivElement>(null!)
	// const reviews: string[] = [
	// 	"/reviews/p1.jpeg",
	// 	"/reviews/p2.jpeg",
	// 	"/reviews/p3.jpeg"
	// ]

	const DEFAULT_COVER = 'url("/goodFood.png")'

	const getPath = (rid: string, data: RestaurantDetailResponse) => {
		const details = data?.detail?.details || []

		const linksList: Record<string, string> = {}
		details?.platform_details?.forEach((item) => {
			linksList[item.platform_name] = item.platform_uri
		})

		const options: IOption[] = [
			{
				id: 1,
				value: "Menu",
				path: `/restaurant/${rid}/menu`
			},
			{
				id: 2,
				value: "Review us on Zomato",
				path: linksList["zomato-dine-in"]
			},
			{
				id: 3,
				value: "Review us on Google",
				path: linksList["google-review"]
			},
			{
				id: 4,
				value: "Instagram",
				path: linksList["insta"]
			}
		]

		return options
	}

	const options = restaurantInfo && getPath(rname, restaurantInfo)

	// useEffect(() => {
	// 	if (reviewsRef.current) {
	// 		reviewsRef.current.scrollIntoView({ behavior: "smooth" })
	// 	}
	// }, [currentReview])

	return (
		<div className="w-screen min-h-screen relative overflow-hidden bg-black">
			<div
				className="fixed top-0 left-0 w-screen h-[188px] bg-cover bg-center z-[1]"
				style={{
					backgroundImage: restaurantInfo?.detail.cover_image || DEFAULT_COVER
				}}
			/>
			<div className="w-full bg-white relative mt-[180px] z-[3] min-h-[calc(100vh-180px)] max-w-100 border-20 border-gray-100 shadow-md rounded-t-[20px] p-[60px_16px_16px]">
				{restaurantInfo && (
					<DineInfoCard
						restaurantInfo={restaurantInfo}
						reviewsRef={reviewsRef}
					/>
				)}
				{options && <DineInButtons options={options} />}

				{/* {!!reviews.length && restaurantInfo && (
					<VerifiedReviews
						reviews={reviews}
						currentReview={currentReview}
						setCurrentReview={setCurrentReview}
					/>
				)} */}
			</div>
		</div>
	)
}

export default DineInLandingPage
