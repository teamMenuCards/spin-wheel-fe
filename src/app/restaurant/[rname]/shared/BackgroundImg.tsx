import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"
import { DEFAULT_COVER_IMG } from "../constants"
import Image from "next/image"

function BackgroundImageComponent({
	restaurantInfo
}: // imagesRef
{
	restaurantInfo: RestaurantDetailResponse
	// imagesRef: React.RefObject<HTMLDivElement>
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

			{/* "Photos" Button */}
			{/* <button
				className="absolute top-36 right-3 bg-white text-sm text-black px-3 py-1 rounded-md shadow-md font-medium"
				onClick={() => {
					if (imagesRef && imagesRef?.current) {
						imagesRef?.current?.scrollIntoView({
							behavior: "smooth"
						})
					}
				}}
			>
				Photos
			</button> */}
		</>
	)
}

export default BackgroundImageComponent
