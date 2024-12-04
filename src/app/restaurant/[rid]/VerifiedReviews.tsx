import React, { forwardRef } from "react"
import { Box, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import Image from "next/image"

const ReviewsSection = styled(Box)({
	width: "100%",
	maxWidth: "400px",
	margin: "32px auto 0",
	padding: "0 16px"
})

const ReviewsTitle = styled(Box)({
	marginBottom: "16px",
	"& .MuiTypography-root": {
		color: "#000",
		fontSize: "1rem",
		fontWeight: 500
	}
})

const CarouselContainer = styled(Box)({
	position: "relative",
	width: "100%",
	borderRadius: "12px",
	overflow: "hidden",
	backgroundColor: "white",
	boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
})

const CarouselContent = styled(Box)({
	display: "flex",
	transition: "transform 0.3s ease-in-out"
})

const CarouselControls = styled(Box)({
	position: "absolute",
	bottom: "12px",
	left: "50%",
	transform: "translateX(-50%)",
	display: "flex",
	gap: "8px",
	zIndex: 2
})

const CarouselDot = styled(Box)<{ active?: boolean }>(({ active }) => ({
	width: "8px",
	height: "8px",
	borderRadius: "50%",
	backgroundColor: active ? "#333" : "#ccc",
	cursor: "pointer"
}))

// Main Component
const VerifiedReviews = forwardRef<
	HTMLDivElement,
	{
		reviews: string[]
		currentReview: number
		setCurrentReview: React.Dispatch<React.SetStateAction<number>>
	}
>(({ reviews, currentReview, setCurrentReview }, ref) => {
	return (
		<div ref={ref}>
			<ReviewsSection>
				<ReviewsTitle>
					<Typography variant="subtitle1">Verified Reviews</Typography>
				</ReviewsTitle>
				<CarouselContainer>
					<CarouselContent
						sx={{ transform: `translateX(-${currentReview * 100}%)` }}
					>
						{reviews.map((review, index) => (
							<Box key={index} sx={{ flex: "0 0 100%", position: "relative" }}>
								<Image
									src={review}
									alt={`Review ${index + 1}`}
									width={400}
									height={200}
									style={{
										width: "100%",
										height: "auto",
										objectFit: "contain"
									}}
								/>
							</Box>
						))}
					</CarouselContent>
					<CarouselControls>
						{reviews.map((_, index) => (
							<CarouselDot
								key={index}
								active={currentReview === index}
								onClick={() => setCurrentReview(index)}
							/>
						))}
					</CarouselControls>
				</CarouselContainer>
			</ReviewsSection>
		</div>
	)
})

export default VerifiedReviews
