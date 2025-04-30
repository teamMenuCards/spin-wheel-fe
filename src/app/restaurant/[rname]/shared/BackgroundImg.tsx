import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"
import { DEFAULT_COVER_IMG } from "../constants"
import Image from "next/image"

function BackgroundImageComponent({
	restaurantInfo
}: {
	restaurantInfo: RestaurantDetailResponse
}) {
	return (
		<>
			<div
				className=" fixed top-0 w-screen h-[250px]"
				style={{ filter: "brightness(0.8)" }}
			>
				<Image
					unoptimized
					alt="first image"
					src={restaurantInfo?.detail?.cover_image || DEFAULT_COVER_IMG}
					width={250}
					loading="lazy"
					height={500}
					sizes="100vw"
					quality={50}
					// placeholder="blur"
					// blurDataURL={restaurantInfo.detail.cover_image}
					style={{
						width: "100%",
						height: "100%",
						objectFit: "cover"
					}}
					draggable={false}
				/>
			</div>
		</>
	)
}

export default BackgroundImageComponent
