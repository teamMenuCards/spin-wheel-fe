import Image from "next/image"
import { Users_Ic, Phone_Ic, MapIcon_Tc } from "./icons"

const RestaurantInfoCard = ({ restaurantInfo, reviewsRef }) => (
	<>
		{/* <div className="flex flex-wrap justify-between items-start font-metropolis "> */}
		<div className="flex flex-wrap items-start md:items-center justify-between w-full max-w-[500px]  mx-auto px-4 font-metropolis">
			{/* Logo */}
			<div className="absolute top-[-62.5px] left-1/2 transform -translate-x-1/2 w-[125px] h-[125px] rounded-full overflow-hidden border-2 border-white bg-pink shadow-md transition-transform hover:scale-105">
				<Image
					src="/coco.jpg"
					alt="Restaurant Logo"
					width={125}
					height={125}
					priority
				/>
			</div>

			{/* Restaurant Name */}
			<div className="col-span-2">
				<h2 className="text-lg font-bold truncate">{restaurantInfo.name}</h2>
				<p className="text-sm text-gray-600 flex flex-wrap gap-1 mb-2">
					{restaurantInfo.cuisine.join(", ")}
				</p>
			</div>

			<div className="grid grid-cols-[1fr_150px] gap-4 items-start w-full">
				{/* Details Section */}
				<div className="flex flex-col gap-2 pr-4  text-left">
					<div className="flex items-center gap-2">
						<Image src="/clock-icon.png" alt="Time" width={14} height={14} />
						<span className="text-xs">{restaurantInfo.timing}</span>
					</div>

					<div className="flex items-center gap-2">
						<a
							href={`tel:${restaurantInfo.phone}`}
							className="text-black underline flex items-center gap-1"
						>
							<div className="w-4">
								<Phone_Ic className="w-3 h-3" />
							</div>
							<span className="text-xs">{restaurantInfo.phone}</span>
						</a>
					</div>

					<div className="flex items-center gap-2">
						<Users_Ic className="w-3 h-3 text-black" />
						<span className="text-xs">
							₹{restaurantInfo.priceForTwo} for two
						</span>
					</div>

					<div className="flex items-center gap-2 w-fit">
						<MapIcon_Tc className="h-3 w-3" />

						<a
							href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
								restaurantInfo.location
							)}`}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center text-black text-xs truncate"
						>
							{restaurantInfo.location}
						</a>
					</div>
				</div>

				{/* Ratings Section */}
				<div className="text-right w-[150px]">
					{["zomato", "swiggy", "google"].map((platform) => (
						<div
							key={platform}
							className="flex items-center gap-2 mb-1 cursor-pointer"
							onClick={() =>
								reviewsRef.current?.scrollIntoView({ behavior: "smooth" })
							}
						>
							<Image
								src={`/${platform}-logo.png`}
								alt={platform}
								width={20}
								height={20}
								className="rounded-md"
							/>
							<span className="text-xs text-black">
								{restaurantInfo.reviews[platform].rating} (
								{restaurantInfo.reviews[platform].count} reviews)
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	</>
)

export default RestaurantInfoCard
