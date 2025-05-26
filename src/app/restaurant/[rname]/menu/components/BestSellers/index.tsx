import React, { useState } from "react"
import ImageOverlay from "@/shared/ImageOverlay"
import ProductCard from "./product-card"
import { ProductType } from "@/types"

// interface Dish {
// 	name: string
// 	is_veg: string | boolean
// 	image_url: string
// 	price: string | number
// }

interface ChefRecommendationProps {
	recommendations: ProductType[]
}

const ChefRecommendation: React.FC<ChefRecommendationProps> = ({
	recommendations
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedImg, setSelectedImg] = useState("")

	const handleImgClick = (img: string) => {
		setSelectedImg(img)
		setIsOpen(true)
	}

	return (
		<div className="px-4">
			<h2 className="font-semibold text-md text-gray-800 my-2">Bestsellers</h2>
			<div
				className="overflow-x-auto flex gap-3 no-scrollbar relative z-10"
				style={{ height: "235px" }}
			>
				{recommendations.map((item, key) => {
					return (
						<ProductCard key={key} product={item} onImgClick={handleImgClick} />
					)
				})}
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

			{isOpen ? (
				<ImageOverlay imageUrl={selectedImg} onClose={() => setIsOpen(false)} />
			) : null}
		</div>
	)
}

export default ChefRecommendation
