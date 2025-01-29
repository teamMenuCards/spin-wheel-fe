import React, { forwardRef } from "react"
import Image from "next/image"

interface VerifiedReviewsProps {
	reviews: string[]
	currentReview: number
	setCurrentReview: (index: number) => void
}

const VerifiedReviews = forwardRef<HTMLDivElement, VerifiedReviewsProps>(
	({ reviews, currentReview, setCurrentReview }, ref) => {
		return (
			<div
				ref={ref}
				className="relative w-full max-w-[400px] py-8 mx-auto px-4"
			>
				{/* Reviews Title */}
				<div className="mb-4">
					<h4 className="text-md font-bold truncate">Verfied Reviews</h4>
				</div>

				{/* Carousel Container */}
				<div className=" w-full rounded-lg overflow-hidden bg-white shadow-sm">
					<div
						className="flex transition-transform duration-300 ease-in-out"
						style={{ transform: `translateX(-${currentReview * 100}%)` }}
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
			</div>
		)
	}
)

VerifiedReviews.displayName = "VerifiedReviews"

export default VerifiedReviews
