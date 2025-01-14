"use client"

import React, { useState, useRef } from "react"
//import RestaurantInfoCard from "../restaurant/[rid]/RestaurantInfoCard"
import DineInfoCard from "./DineInfoCard"
//import RestaurantButtons from "../restaurant/[rid]/RestaurantButtons"
import DineInButtons from "./DineInButtons"
import VerifiedReviews from './VerifiedReviews'
import Header from "@/shared/Header"

// Main Component
function DineInLandingPage({ options, restaurantInfo }) {
	const [currentReview, setCurrentReview] = useState(0)
	const reviewsRef = useRef<HTMLDivElement | null>(null)
	const reviews = ["/review1.jpeg", "/review2.jpeg"] // Example review images

	return (
		<div className="w-screen min-h-screen relative overflow-hidden">
			<Header />
			<div className="w-full bg-white relative mt-[180px] z-[3] min-h-[calc(100vh-180px)] border-t border-gray-100 shadow-md rounded-t-[16px] p-[60px_16px_16px]">
				<DineInfoCard
					restaurantInfo={restaurantInfo}
					reviewsRef={reviewsRef}
				/>
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
