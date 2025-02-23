"use client"
import React, { forwardRef, useRef } from "react"
import Image from "next/image"

interface VerifiedReviewsProps {
	reviews: string[]
	currentReview: number
	setCurrentReview: React.Dispatch<React.SetStateAction<number>>
}

const Swipable = forwardRef<HTMLDivElement, VerifiedReviewsProps>(
	({ reviews, currentReview, setCurrentReview }, ref) => {
		const touchStartX = useRef(0)
		const touchEndX = useRef(0)

		const handleTouchStart = (e: React.TouchEvent) => {
			touchStartX.current = e.touches[0].clientX
		}

		const handleTouchMove = (e: React.TouchEvent) => {
			touchEndX.current = e.touches[0].clientX
		}

		const handleTouchEnd = () => {
			const deltaX = touchStartX.current - touchEndX.current

			if (deltaX > 50) {
				// Swipe left (next)
				setCurrentReview((prev) => Math.min(prev + 1, reviews.length - 1))
			} else if (deltaX < -50) {
				// Swipe right (previous)
				setCurrentReview((prev) => Math.max(prev - 1, 0))
			}
		}

		return (
			<div ref={ref}>
				{/* Reviews Title */}
				<div className="mb-4">
					<h4 className="text-md font-bold truncate">Verified Reviews</h4>
				</div>

				{/* Carousel Container */}
				<div className="w-full rounded-lg overflow-hidden bg-white shadow-sm relative">
					<div
						className="flex transition-transform duration-300 ease-in-out"
						style={{ transform: `translateX(-${currentReview * 100}%)` }}
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}
					>
						{reviews.map((review, index) => (
							<div key={index} className="flex-shrink-0 w-full relative">
								<Image
									src={review}
									alt={`Review ${index + 1}`}
									width={400}
									height={200}
									className="w-full h-auto object-contain"
								/>
							</div>
						))}
					</div>
				</div>

				{/* Pagination Dots */}
				<div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
					{reviews.map((_, index) => (
						<button
							key={index}
							className={`w-2 h-2 rounded-full ${
								currentReview === index ? "bg-gray-800" : "bg-gray-400"
							}`}
							onClick={() => setCurrentReview(index)}
						/>
					))}
				</div>
			</div>
		)
	}
)

Swipable.displayName = "VerifiedReviews"

export default Swipable
