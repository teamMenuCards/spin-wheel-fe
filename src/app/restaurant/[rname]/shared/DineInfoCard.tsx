"use client"
import Image from "next/image"
import { Users_Ic, Phone_Ic, MapIcon_Tc } from "./icons"
import Rating from "./Rating"
import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"
import { IMetaData } from "@/types"

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
		address,
		phone_no,
		logo,
		details: {
			meta_details: metaData = {} as IMetaData,
			platform_reviews: platformReviews = []
		} = {},
		order_count_display = 500
	} = restaurantInfo?.detail || {}

	const DEFAULT_logo = "https://dummyimage.com/100x100/000/fff"

	const socialIcons: Record<"google" | "swiggy" | "zomato", string> = {
		google: "/google-logo.webp",
		swiggy: "/swiggy-logo.webp",
		zomato: "/zomato-logo.webp"
	}

	const openTime: string = metaData.opening_time || ""
	const closeTime: string = metaData.closing_time || ""
	const avgPrice: string | number = metaData.avg_price || 0
	const locationLink: string = metaData.location_info || ""

	return (
		<>
			<div className="flex items-start md:items-center justify-between w-full max-w-[500px]  mx-auto px-4 font-metropolis font-semibold">
				{/* Logo */}
				<div className="absolute top-[-62.5px] left-1/2 transform -translate-x-1/2 w-[125px] h-[125px] rounded-full overflow-hidden border-2 border-white bg-pink shadow-md transition-transform hover:scale-105">
					<Image
						unoptimized
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
						<h2 className="text-lg font-bold text-black">
							{restaurantInfo?.name}
						</h2>
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

						{/* This Section would be seen only for DELIVERY PAGE */}
						{!isDineIn && (
							<div className="flex flex-col gap-2 text-left text-black">
								<div className="flex items-center gap-2">
									<Image
										unoptimized
										src="/clock-icon.webp"
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
									<MapIcon_Tc className="h-4 w-4" />

									<a
										href={locationLink}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex text-blue-500 underline  items-center text-sm max-w-[150px] overflow-hidden"
									>
										{address}
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
			{!isDineIn && (
				<div className="w-full flex justify-center my-3">
					<div
						className="bg-gradient-to-r from-green-500 to-emerald-400 text-white px-4  rounded-full shadow-lg
							 transform transition-transform hover:scale-105 flex items-center font-metropolis"
					>
						<div className="mr-2">
							<Image
								unoptimized
								src="/order-icon.png"
								alt="Orders"
								width={20}
								height={20}
								className="text-green-500"
							/>
						</div>
						<div>
							{order_count_display ? (
								<span className="font-bold text-md">{order_count_display}</span>
							) : (
								<span className="font-bold text-md">300+</span>
							)}
							<span className="ml-1 text-md font-semibold">
								People ordered last week
							</span>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
export default RestaurantInfoCard
