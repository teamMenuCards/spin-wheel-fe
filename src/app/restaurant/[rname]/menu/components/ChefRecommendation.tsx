import Image from "next/image"
import React from "react"

const getVegIcon = () => (
	<Image src="/ic_veg.webp" alt="veg icon" width={18} height={18} priority />
)

const getNonVegIcon = () => (
	<Image
		src="/ic_nonveg.webp"
		alt="nonveg icon"
		width={18}
		height={18}
		priority
	/>
)

interface Dish {
	name: string
	is_veg: string | boolean
	image_url: string
	price: string | number
}

interface ChefRecommendationProps {
	recommendations: Dish[]
}

const ChefRecommendation: React.FC<ChefRecommendationProps> = ({
	recommendations
}) => {
	return (
		<div className="px-4">
			<h2 className="font-semibold text-md text-gray-800 my-2">Bestsellers</h2>
			<div
				className="overflow-x-auto flex gap-3 no-scrollbar relative z-10"
				style={{ height: "235px" }}
			>
				{recommendations.map((item, key) => (
					<div
						key={key}
						className="p-3 rounded-xl flex flex-col cursor-pointer transition-all border border-gray-200 shadow-lg hover:shadow-xl bg-white hover:border-pink-300 flex-shrink-0"
						style={{
							width: "190px",
							height: "220px",
							transition: "all 0.2s ease-in-out"
						}}
					>
						{/* Image - Larger size */}
						<div className="w-full h-[140px] rounded-xl overflow-hidden mb-2 flex items-center justify-center relative">
							{item.image_url && (
								<Image
									src={item.image_url}
									alt={item.name}
									fill
									style={{ objectFit: "cover" }}
									className="hover:scale-105 transition-transform duration-200"
									priority
								/>
							)}
						</div>

						{/* Dish Name and Price */}
						<div className="flex-grow flex flex-col justify-between">
							<div className="text-gray-900 font-semibold text-sm">
								{item.name}
							</div>

							<div className="flex justify-between items-end">
								<div className="text-gray-900 font-semibold text-sm">
									₹{item.price}
								</div>
								<div>
									{item.is_veg === true || item.is_veg === "true"
										? getVegIcon()
										: getNonVegIcon()}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
			<style jsx>{`
				.no-scrollbar::-webkit-scrollbar {
					display: none;
				}
				.no-scrollbar {
					-ms-overflow-style: none;
					scrollbar-width: none;
				}
			`}</style>
		</div>
	)
}

export default ChefRecommendation
