"use client"
import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import React, { useState, useRef } from "react"
import Header from "../restaurant/[rid]/Header"
//import RestaurantInfoCard from "../restaurant/[rid]/RestaurantInfoCard"
import DineInfoCard from "./DineInfoCard"
//import RestaurantButtons from "../restaurant/[rid]/RestaurantButtons"
import DineInButtons from "./DineInButtons"
import VerifiedReviews from "../restaurant/[rid]/VerifiedReviews"

const PageWrapper = styled(Box)({
	width: "100vw",
	minHeight: "100vh",
	position: "relative",
	overflow: "hidden"
})

const InfoSection = styled(Box)({
	width: "100%",
	backgroundColor: "white",
	position: "relative",
	marginTop: "180px",
	zIndex: 3,
	minHeight: "calc(100vh - 180px)",
	borderTopLeftRadius: "16px",
	borderTopRightRadius: "16px",
	padding: "60px 16px 16px",
	"& > *": {
		maxWidth: "100%"
	},
	boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
	border: "1px solid rgba(0,0,0,0.05)"
})

// Main Component
function DineInLandingPage({ options, restaurantInfo }) {
	const [currentReview, setCurrentReview] = useState(0)
	const reviewsRef = useRef<HTMLDivElement | null>(null)
	const reviews = ["/review1.jpeg", "/review2.jpeg"] // Example review images

	return (
		<PageWrapper>
			<Header />
			<InfoSection>
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
			</InfoSection>
		</PageWrapper>
	)
}

export default DineInLandingPage
