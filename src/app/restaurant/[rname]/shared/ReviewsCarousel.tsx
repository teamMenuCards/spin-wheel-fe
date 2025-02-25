import { IReviews } from "@/types"
import DecorativeLine from "../shared/DecorativeLine"
import Swipable from "@/shared/Swipable"

interface IReviewsCarousel {
	reviews: IReviews[]
}
function ReviewsCarousel({ reviews }: IReviewsCarousel) {
	const reviewList = reviews[0]?.review_image_url?.split(",")

	return (
		<>
			{/* VerifiedReviews */}
			{reviewList && reviewList.length && (
				<div className="relative">
					<div className="my-4">
						<DecorativeLine />
					</div>

					<div className="relative w-full max-w-[400px] mx-auto px-4 h-[250px]">
						<Swipable reviews={reviewList} />
					</div>
				</div>
			)}
		</>
	)
}

export default ReviewsCarousel
