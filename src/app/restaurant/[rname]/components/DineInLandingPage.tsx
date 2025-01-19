"use client"

import React, { useState, useRef } from "react"
import DineInfoCard from "./DineInfoCard"
import DineInButtons from "./DineInButtons"
import VerifiedReviews from "./VerifiedReviews"

// Main Component
function DineInLandingPage({ rname, restaurantInfo }) {
	const [currentReview, setCurrentReview] = useState(0)
	const reviewsRef = useRef<HTMLDivElement | null>(null)
	const reviews = ["/review1.jpeg", "/review2.jpeg"] // Example review images
	const DEFAULT_IMG = 'url("https://dummyimage.com/600x400/000/fff")'

	const getPath = (rid: string, data) => {
		const details = data?.detail?.details || []

		console.log("getPath:", rid, details)

		const options = [
			{
				id: 1,
				value: "Menu",
				path: `/restaurant/${rid}/menu`
			},
			{
				id: 2,
				value: "Review us on Zomato",
				path: details.zomato_dine_in_link
			},
			{
				id: 3,
				value: "Review us on Google",
				path: details.google_review_link
			},
			{
				id: 4,
				value: "Instagram",
				path: details.insta_link
			}
		]

		return options
	}

	const options = getPath(rname, restaurantInfo)

	return (
		<div className="w-screen min-h-screen relative overflow-hidden bg-white">
			<div
				className="fixed top-0 left-0 w-screen h-[188px] bg-cover bg-center z-[1]"
				style={{
					backgroundImage: restaurantInfo?.detail.cover_image || DEFAULT_IMG
				}}
			/>
			<div className="w-full bg-white relative mt-[180px] z-[3] min-h-[calc(100vh-180px)] max-w-100 border-20 border-gray-100 shadow-md rounded-t-[20px] p-[60px_16px_16px]">
				<DineInfoCard restaurantInfo={restaurantInfo} reviewsRef={reviewsRef} />
				<DineInButtons options={options} />
				<VerifiedReviews
					reviews={reviews}
					currentReview={currentReview}
					setCurrentReview={setCurrentReview}
					ref={reviewsRef}
				/>
			</div>
		</div>
	)
}

export default DineInLandingPage
