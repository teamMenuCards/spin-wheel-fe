import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"
import { DEFAULT_COVER_IMG } from "../constants"

function BackgroundImageComponent({
	restaurantInfo
}: {
	restaurantInfo: RestaurantDetailResponse
}) {
	return (
		<>
			<div
				className="fixed top-0 left-0 w-screen h-[188px] bg-cover bg-center z-[1]"
				style={{
					backgroundImage:
						`url(${restaurantInfo?.detail.cover_image})` || DEFAULT_COVER_IMG
				}}
			/>
		</>
	)
}

export default BackgroundImageComponent
