import Image from "next/image"
import { Users_Ic, Phone_Ic, MapIcon_Tc } from "./icons"
import { useSearchParams } from "next/navigation"
import { useDispatch } from "react-redux"
import { useAppSelector } from "@/store/hooks"
import { CLIENT_APP_MODE, setMode } from "@/store/features/app.slice"
import { useEffect } from "react"
import Rating from "./Rating"

const RestaurantInfoCard = ({ restaurantInfo, reviewsRef }) => {
	const searchParams = useSearchParams()
	const modeFromUrl = searchParams.get("m")
	const dispatch = useDispatch()
	const mode = useAppSelector((state) => state.appState.mode)

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
			rating: "4.2"
		},
		{
			id: 2,
			logo: "/swiggy-logo.png",
			rating: "4.7"
		},
		{
			id: 3,
			logo: "/google-logo.png",
			rating: "4"
		}
	]

	const openTime =
		restaurantInfo?.detail.details.meta_details.opening_time || ""
	const closeTime =
		restaurantInfo?.detail.details.meta_details.closing_time || ""
	const avgPrice = restaurantInfo?.detail.details.meta_details.avg_price || ""
	const location =
		restaurantInfo?.detail.details.meta_details.location_info || ""

	return (
		<>
			{/* <div className="flex flex-wrap justify-between items-start font-metropolis "> */}
			<div className="flex flex-wrap items-start md:items-center justify-between w-full max-w-[500px]  mx-auto px-4 font-metropolis ">
				{/* Logo */}
				<div className="absolute top-[-62.5px] left-1/2 transform -translate-x-1/2 w-[125px] h-[125px] rounded-full overflow-hidden border-2 border-white bg-pink shadow-md transition-transform hover:scale-105">
					<Image
						src={restaurantInfo?.detail?.logo || DEFAULT_logo}
						alt="Restaurant Logo"
						width={125}
						height={125}
						priority
					/>
				</div>

				{/* Restaurant Name */}
				<div className="col-span-2">
					<h2 className="text-lg font-bold truncate">{restaurantInfo?.name}</h2>
					<p className="text-sm text-gray-600 flex flex-wrap gap-1 mb-2">
						{restaurantInfo?.cuisine?.join(", ")}
					</p>
				</div>

				<div
					className={` flex w-full justify-between items-start ${
						isDelivery
							? "grid grid-cols-[1fr_150px] gap-4 items-start w-full"
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
								<span className="text-xs">{`${openTime} - ${closeTime}`}</span>
							</div>

							<div className="flex items-center gap-2">
								<a
									href={`tel:${restaurantInfo?.phone_no}`}
									className="text-black underline flex items-center gap-1"
								>
									<div className="w-4">
										<Phone_Ic className="w-3 h-3" />
									</div>
									<span className="text-xs">
										{restaurantInfo?.detail?.phone_no}
									</span>
								</a>
							</div>

							{!!avgPrice && (
								<div className="flex items-center gap-2">
									<Users_Ic className="w-3 h-3 text-black" />
									<span className="text-xs">₹{avgPrice} for two</span>
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
									className="inline-flex text-blue-500 underline text-xs items-centertext-xs truncate max-w-[150px] overflow-hidden whitespace-nowrap"
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
								? "justify-center text-right grid md:grid-cols-1 gap-2"
								: "max-w-[800px] flex"
						}`}
					>
						{ratings.map((item) => {
							return (
								<div key={item.id} className="mr-4">
									<Rating
										logo={item.logo}
										rating={item.rating}
										onClick={() =>
											reviewsRef.current?.scrollIntoView({ behavior: "smooth" })
										}
									/>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</>
	)
}
export default RestaurantInfoCard
