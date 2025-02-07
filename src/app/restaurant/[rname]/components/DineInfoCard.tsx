"use client"
import Image from "next/image"
import { Users_Ic, Phone_Ic, MapIcon_Tc } from "./icons"
import { useSearchParams } from "next/navigation"
import { useDispatch } from "react-redux"
import { useAppSelector } from "@/store/hooks"
import { CLIENT_APP_MODE, setMode } from "@/store/features/app.slice"
import { useEffect } from "react"
import Rating from "./Rating"
import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"

const RestaurantInfoCard = ({
	restaurantInfo,
	reviewsRef
}: {
	restaurantInfo: RestaurantDetailResponse
	reviewsRef: React.RefObject<HTMLDivElement> // ✅ Use RefObject
}) => {
	const searchParams = useSearchParams()
	const modeFromUrl = searchParams.get("m")
	const dispatch = useDispatch()
	const mode = useAppSelector((state) => state.appState.mode)
	const metaData = restaurantInfo?.detail.details.meta_details

	// Type guard to validate `modeFromUrl`
	const validMode = Object.values(CLIENT_APP_MODE).find(
		(m): m is CLIENT_APP_MODE => m === modeFromUrl
	)

	useEffect(() => {
		if (validMode && mode !== validMode) {
			dispatch(setMode(validMode))
		}
	}, [validMode, dispatch, mode])

	const isDelivery = mode == CLIENT_APP_MODE.DELIVERY
	const DEFAULT_logo = "https://dummyimage.com/100x100/000/fff"

	const ratings = [
		{
			id: 1,
			logo: "/zomato-logo.png",
			rating: "4.5",
			review_count: "442"
		},
		{
			id: 2,
			logo: "/swiggy-logo.png",
			rating: "4.6",
			review_count: "935"
		},
		{
			id: 3,
			logo: "/google-logo.png",
			rating: "4.5",
			review_count: "121"
		}
	]

	const openTime = (metaData && metaData.opening_time) || ""
	const closeTime = (metaData && metaData.closing_time) || ""
	const avgPrice = (metaData && metaData.avg_price) || ""
	const location = (metaData && metaData.location_info) || ""

	return (
		<>
			{/* <div className="flex flex-wrap justify-between items-start font-metropolis "> */}
			<div className="flex items-start md:items-center justify-between w-full max-w-[500px]  mx-auto px-4 font-metropolis font-semibold">
				{/* Logo */}
				<div className="absolute top-[-62.5px] left-1/2 transform -translate-x-1/2 w-[125px] h-[125px] rounded-full overflow-hidden border-2 border-white bg-pink shadow-md transition-transform hover:scale-105">
					<Image
						src={restaurantInfo?.detail?.logo || DEFAULT_logo}
						alt="Restaurant Logo"
						priority
						fill
						style={{ objectFit: "cover", width: "100%" }}
					/>
				</div>

				<div className="m-auto mt-3">
					{/* Restaurant Name */}
					<div className="text-center">
						<h2 className="text-lg font-bold">{restaurantInfo?.name}</h2>
						<p className="text-sm text-gray-600 mb-2">
							{restaurantInfo?.detail.details.meta_details?.category}
						</p>
					</div>

					<div
						className={` flex w-full justify-between items-start mt-4 ${
							isDelivery
								? "grid grid-cols-[1fr_1fr] gap-4 items-start w-full"
								: "flex justify-evenly"
						}`}
					>
						{/* Details Section */}
						{isDelivery && (
							<div className="flex flex-col gap-2 text-left">
								<div className="flex items-center gap-2">
									<Image
										src="/clock-icon.png"
										alt="Time"
										width={14}
										height={14}
									/>
									<span className="text-sm">{`${openTime} - ${closeTime}`}</span>
								</div>

								<div className="flex items-center gap-2">
									<a
										href={`tel:${restaurantInfo?.detail.phone_no}`}
										className="text-black underline flex items-center gap-1"
									>
										<div className="w-4">
											<Phone_Ic className="w-3 h-3" />
										</div>
										<span className="text-sm">
											{restaurantInfo?.detail?.phone_no}
										</span>
									</a>
								</div>

								{!!avgPrice && (
									<div className="flex items-center gap-2">
										<Users_Ic className="w-3 h-3 text-black" />
										<span className="text-sm">₹{avgPrice} for two</span>
									</div>
								)}

								<div className="flex items-center gap-2 w-fit">
									<MapIcon_Tc className="h-3 w-3" />

									<a
										href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
											restaurantInfo?.detail?.address
										)}`}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex text-blue-500 underline  items-center text-sm max-w-[150px] overflow-hidden"
									>
										{location}
									</a>
								</div>
							</div>
						)}

						{/* Ratings Section */}
						<div
							className={` ${
								isDelivery
									? "justify-center text-right grid md:grid-cols-1 gap-1"
									: "max-w-[800px] flex"
							}`}
						>
							{ratings.map((item) => {
								return (
									<div key={item.id} className="ml-2">
										<Rating
											logo={item.logo}
											rating={item.rating}
											reviews={item.review_count}
											onClick={() => {
												if (reviewsRef && reviewsRef?.current) {
													reviewsRef?.current?.scrollIntoView({
														behavior: "smooth"
													})
												}
											}}
										/>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default RestaurantInfoCard
