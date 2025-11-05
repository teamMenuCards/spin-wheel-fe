import { IReviews } from "@/types"
import DecorativeLine from "../shared/DecorativeLine"
import Swipable from "@/shared/Swipable"

interface IReviewsCarousel {
	reviews: IReviews[]
}
function ReviewsCarousel({ reviews }: IReviewsCarousel) {
	const reviewList = reviews[0]?.review_image_url?.split(",").map((url: string) => url.trim()).filter((url: string) => url.length > 0)

	return (
		<>
			{/* VerifiedReviews */}
			{reviewList && reviewList.length && (
				<div className="relative">
					<div className="my-4">
						<DecorativeLine />
					</div>

					<div className="my-4 px-4 text-md text-black font-metropolis font-semibold text-center">
						Featured Reviews
					</div>

					<div className="relative w-full max-w-[400px] min-h-[400px] mx-auto px-4">
						<Swipable reviews={reviewList} />
					</div>
				</div>
			)}
		</>
	)
}

export default ReviewsCarousel
