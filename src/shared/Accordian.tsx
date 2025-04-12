"use client"
import { useState, useEffect } from "react"
import MenuItem from "@/app/restaurant/[rname]/menu/components/menu-item"
import {
	ChevronDown_Ic,
	ChevronUp_Ic
} from "@/app/restaurant/[rname]/menu/icons"
import { Category } from "@/services/product/get-menu-list"
import ChefRecommendation from "@/app/restaurant/[rname]/menu/components/ChefRecommendation"
import { isSafeArray } from "@/utils/isSafeArray"

interface AccordionProps {
	sections?: Category[]
	onSectionSelection: (category: Category) => void
}

const Accordion: React.FC<AccordionProps> = ({
	sections = [],
	onSectionSelection
}) => {
	const [openIndexes, setOpenIndexes] = useState<number[]>([])

	// Extract featured products from all sections
	const featuredProducts = sections.flatMap((section) =>
		section.products
			.filter((product) => product.is_featured)
			.map((product) => {
				const variant = product.variants?.[0] || {}
				return {
					name: product.name,
					is_veg: variant.is_veg ?? false,
					image_url: variant.image_url || "",
					description: product.description || "",
					price: variant.price || product.price || ""
				}
			})
	)

	// Ensure all sections are open when sections data is available
	useEffect(() => {
		if (sections.length) {
			setOpenIndexes(sections.map((_, index) => index))
		}
	}, [sections])

	const onClickSection = (index: number, section: Category) => {
		setOpenIndexes((prevIndexes) =>
			prevIndexes.includes(index)
				? prevIndexes.filter((i) => i !== index)
				: [...prevIndexes, index]
		)
		onSectionSelection(section)
	}

	return (
		<div className="w-full max-w-md mx-auto">
			<div className="space-y-2">
				{/* Chef recommendation */}
				{isSafeArray(featuredProducts) && (
					<ChefRecommendation recommendations={featuredProducts} />
				)}

				{/* Menu list */}
				{sections && sections.length
					? sections.map((section, index) => {
							return section.active ? (
								<>
									<div
										key={section.id}
										id={section.id}
										className="border rounded-lg overflow-hidden"
									>
										{/* Accordion Title */}
										<button
											className="w-full text-left py-4 px-4 bg-gray-100 text-black font-semibold hover:bg-gray-200 flex justify-between items-center"
											onClick={() => onClickSection(index, section)}
										>
											{section.display_name}
											<span>
												{openIndexes.includes(index) ? (
													<ChevronUp_Ic className="w-4 h-4" />
												) : (
													<ChevronDown_Ic className="w-4 h-4" />
												)}
											</span>
										</button>

										{/* Accordion Items */}
										{openIndexes.includes(index) && (
											<div className="py-2 px-4 bg-gray-50 text-gray-700">
												<ul className="list-disc pl-5 space-y-1">
													{section.products.map((item) => (
														<MenuItem product={item} key={item.id} />
													))}
												</ul>
											</div>
										)}
									</div>
								</>
							) : null
					  })
					: null}
			</div>
		</div>
	)
}

export default Accordion
