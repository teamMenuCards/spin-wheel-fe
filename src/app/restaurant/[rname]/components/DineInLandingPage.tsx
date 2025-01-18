"use client"

import React, { useState, useRef } from "react"
import DineInfoCard from "./DineInfoCard"
import DineInButtons from "./DineInButtons"
import VerifiedReviews from "./VerifiedReviews"

// Main Component
function DineInLandingPage({ options, restaurantInfo }) {
	const [currentReview, setCurrentReview] = useState(0)
	const reviewsRef = useRef<HTMLDivElement | null>(null)
	const reviews = ["/review1.jpeg", "/review2.jpeg"] // Example review images

	return (
		<div className="w-screen min-h-screen relative overflow-hidden bg-white">
			<div
				className="fixed top-0 left-0 w-screen h-[188px] bg-cover bg-center z-[1]"
				style={{ backgroundImage: 'url("/restaurantBg.png")' }}
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
