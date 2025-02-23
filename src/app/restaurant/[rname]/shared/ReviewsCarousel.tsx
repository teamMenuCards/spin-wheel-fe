import { IReviews } from "@/types"
import DecorativeLine from "../shared/DecorativeLine"
import { Dispatch, SetStateAction } from "react"
import Swipable from "@/shared/Swipable"

interface IReviewsCarousel {
	reviews: IReviews[]
	currentReview: number
	setCurrentReview: Dispatch<SetStateAction<number>>
}
function ReviewsCarousel({
	reviews,
	currentReview,
	setCurrentReview
}: IReviewsCarousel) {
	const reviewList = reviews[0]?.review_image_url?.split(",")

	return (
		<>
			{/* VerifiedReviews */}
			{reviewList && reviewList.length && (
				<div className="relative">
					<div className="my-4">
						<DecorativeLine />
					</div>

					<div className="relative w-full max-w-[400px] mx-auto px-4">
						<Swipable
							reviews={reviewList}
							currentReview={currentReview}
							setCurrentReview={setCurrentReview}
						/>
					</div>
				</div>
			)}
		</>
	)
}

export default ReviewsCarousel
