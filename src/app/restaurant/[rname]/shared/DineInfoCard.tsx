"use client"
import Image from "next/image"
import { Users_Ic, Phone_Ic, MapIcon_Tc } from "./icons"
import Rating from "./Rating"
import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"

const RestaurantInfoCard = ({
	isDineIn = false,
	restaurantInfo,
	reviewsRef
}: {
	isDineIn?: boolean
	restaurantInfo: RestaurantDetailResponse
	reviewsRef: React.RefObject<HTMLDivElement>
}) => {
	const {
		phone_no,
		logo,
		details: { meta_details: metaData, platform_reviews: platformReviews }
	} = restaurantInfo?.detail

	const DEFAULT_logo = "https://dummyimage.com/100x100/000/fff"

	const socialIcons: Record<"google" | "swiggy" | "zomato", string> = {
		google: "/google-logo.png",
		swiggy: "/swiggy-logo.png",
		zomato: "/zomato-logo.png"
	}

	const openTime = (metaData && metaData.opening_time) || ""
	const closeTime = (metaData && metaData.closing_time) || ""
	const avgPrice = (metaData && metaData.avg_price) || ""
	const location = (metaData && metaData.location_info) || ""

	return (
		<>
			<div className="flex items-start md:items-center justify-between w-full max-w-[500px]  mx-auto px-4 font-metropolis font-semibold">
				{/* Logo */}
				<div className="absolute top-[-62.5px] left-1/2 transform -translate-x-1/2 w-[125px] h-[125px] rounded-full overflow-hidden border-2 border-white bg-pink shadow-md transition-transform hover:scale-105">
					<Image
						src={logo || DEFAULT_logo}
						alt="Restaurant Logo"
						priority
						fill
						style={{ objectFit: "contain", width: "100%", background: "white" }}
					/>
				</div>

				<div className="m-auto mt-3">
					{/* Restaurant Name */}
					<div className="text-center">
						<h2 className="text-lg font-bold">{restaurantInfo?.name}</h2>
						<p className="text-sm text-gray-600 mb-2">{metaData?.category}</p>
					</div>

					<div
						className={` flex w-full justify-between items-start mt-4 ${
							isDineIn
								? "flex justify-evenly"
								: "grid grid-cols-[1fr_1fr] gap-4 items-start w-full"
						}`}
					>
						{/* Restaurant Details Section */}
						{!isDineIn && (
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
										href={`tel:${phone_no}`}
										className="text-black underline flex items-center gap-1"
									>
										<div className="w-4">
											<Phone_Ic className="w-3 h-3" />
										</div>
										<span className="text-sm">{phone_no}</span>
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
										// href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
										// 	address
										// )}`}
										href={location}
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
								isDineIn
									? "max-w-[800px] flex"
									: "justify-center text-right grid md:grid-cols-1 gap-1"
							}`}
						>
							{platformReviews &&
								platformReviews?.map((item) => {
									const platformName =
										item.platform_name as keyof typeof socialIcons

									return (
										<div key={item.platform_name} className="ml-2">
											<Rating
												logo={socialIcons[platformName]}
												rating={item.average_rating}
												reviews={item.total_reviews}
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
