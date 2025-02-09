"use client"
import React, { useRef } from "react"
import DineInfoCard from "./DineInfoCard"
import DineInButtons from "./DineInButtons"
// import VerifiedReviews from "./VerifiedReviews"
import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"
import { IOption } from "../types"

function DineInLandingPage({
	rname,
	restaurantInfo
}: {
	rname: string
	restaurantInfo: RestaurantDetailResponse | undefined
}) {
	// const [currentReview, setCurrentReview] = useState(0)
	const reviewsRef = useRef<HTMLDivElement>(null!)
	// const reviews: string[] = [
	// 	"/reviews/p1.jpeg",
	// 	"/reviews/p2.jpeg",
	// 	"/reviews/p3.jpeg"
	// ]

	const DEFAULT_COVER = 'url("/goodFood.png")'

	const getPath = (rid: string, data: RestaurantDetailResponse) => {
		const details = data?.detail?.details || []

		const linksList: Record<string, string> = {}
		details?.platform_details?.forEach((item) => {
			linksList[item.platform_name] = item.platform_uri
		})

		const getMssg = (mssg: string) => {
			return encodeURIComponent(mssg)
		}

		const encodedMessage =
			restaurantInfo &&
			getMssg(
				`Hi team ${restaurantInfo.name}. Please keep me updated on the weekly offers`
			)

		const deliveryOptions = [
			{
				id: 1,
				value: "Menu",
				path: `/restaurant/${rid}/menu`,
				icon: "/menu-icon.png"
			},
			{
				id: 2,
				value: "Find us at",
				path: linksList["locate-us-link"],
				icon: "/google_map.svg"
			},
			{
				id: 3,
				value: "Review us on Zomato",
				path: linksList["zomato-delivery"],
				icon: "/zomato-logo.png"
			},
			{
				id: 4,
				value: "Review us on Swiggy",
				path: linksList["swiggy-link"],
				icon: "/swiggy-logo.png"
			}
		]

		const dineInOptions: IOption[] = [
			{
				id: 1,
				value: "Menu",
				path: `/restaurant/${rid}/menu`,
				icon: "/menu-icon.png"
			},

			{
				id: 2,
				value: "Review us on Google",
				path: linksList["google-review"],
				icon: "/google-logo.png"
			},
			{
				id: 3,
				value: "Say Hello to receive offers",
				path: `${linksList["whatsapp-link"]}${encodedMessage} `,
				icon: "/whatsapp.svg"
			},
			{
				id: 4,
				value: "Instagram",
				path: linksList["insta"],
				icon: "/instagram-icon.png"
			}
		]

		return { deliveryOptions, dineInOptions }
	}

	const options = restaurantInfo && getPath(rname, restaurantInfo)

	// useEffect(() => {
	// 	if (reviewsRef.current) {
	// 		reviewsRef.current.scrollIntoView({ behavior: "smooth" })
	// 	}
	// }, [currentReview])

	return (
		<div className="w-screen min-h-screen relative overflow-hidden bg-black">
			<div
				className="fixed top-0 left-0 w-screen h-[188px] bg-cover bg-center z-[1]"
				style={{
					backgroundImage:
						DEFAULT_COVER || `url(${restaurantInfo?.detail.cover_image})`
				}}
			/>
			<div className="w-full bg-white relative mt-[180px] z-[3] min-h-[calc(100vh-180px)] max-w-100 border-20 border-gray-100 shadow-md rounded-t-[20px] p-[60px_16px_16px]">
				{restaurantInfo && (
					<DineInfoCard
						restaurantInfo={restaurantInfo}
						reviewsRef={reviewsRef}
					/>
				)}
				{options && <DineInButtons options={options} />}
			</div>
		</div>
	)
}

export default DineInLandingPage
