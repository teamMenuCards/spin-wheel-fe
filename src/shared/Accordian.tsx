"use client"
import ChefRecommendation from "@/app/restaurant/[rname]/menu/components/BestSellers"
import MenuFilters, {
	FilterType
} from "@/app/restaurant/[rname]/menu/components/menu-filters"
import MenuItem from "@/app/restaurant/[rname]/menu/components/menu-item"
import {
	ChevronDown_Ic,
	ChevronUp_Ic
} from "@/app/restaurant/[rname]/menu/icons"
import { Category } from "@/services/product/get-menu-list"
import { isSafeArray } from "@/utils/isSafeArray"
import { useState } from "react"

interface AccordionProps {
	sections?: Category[]
	onSectionSelection: (category: Category) => void
}

const Accordion: React.FC<AccordionProps> = ({
	sections = [],
	onSectionSelection
}) => {
	// Initialize with all sections open to match server-side rendering
	const [openIndexes, setOpenIndexes] = useState<number[]>(() =>
		sections.map((_, index) => index)
	)

	// Filter state
	const [activeFilter, setActiveFilter] = useState<FilterType>("all")

	// Extract featured products from all sections
	const featuredProducts = sections.flatMap((section) =>
		section.products
			.filter((product) => product.is_featured)
			.map((product) => product)
	)

	// Filter products based on active filter
	const filterProducts = (products: Category["products"]) => {
		if (activeFilter === "all") return products

		return products.filter((product) => {
			const isVeg = product.variants?.[0]?.is_veg
			return activeFilter === "veg" ? isVeg : !isVeg
		})
	}

	// Filter sections that have products matching the current filter
	const filteredSections = sections.filter((section) => {
		const filteredProducts = filterProducts(section.products)
		return filteredProducts.length > 0
	})

	const onClickSection = (index: number, section: Category) => {
		setOpenIndexes((prevIndexes) =>
			prevIndexes.includes(index)
				? prevIndexes.filter((i) => i !== index)
				: [...prevIndexes, index]
		)
		onSectionSelection(section)
	}

	const handleFilterChange = (filter: FilterType) => {
		setActiveFilter(filter)
		// Open all sections when filter changes to show filtered results
		// Use the original sections array to get all possible indexes
		setOpenIndexes(sections.map((_, index) => index))
	}

	return (
		<div className="w-full max-w-md mx-auto">
			{/* Filter Component */}
			<MenuFilters
				onFilterChange={handleFilterChange}
				activeFilter={activeFilter}
			/>

			<div className="space-y-2">
				{/* Chef recommendation - only show if has featured products matching filter */}
				{isSafeArray(featuredProducts) && (
					<ChefRecommendation
						recommendations={filterProducts(featuredProducts)}
					/>
				)}

				{/* Menu list */}
				{filteredSections && filteredSections.length ? (
					filteredSections.map((section, index) => {
						return section.active ? (
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
											{filterProducts([...section.products])
												.sort((a, b) => a.display_order - b.display_order)
												.map((item) =>
													item?.active ? (
														<MenuItem product={item} key={item.id} />
													) : null
												)}
										</ul>
									</div>
								)}
							</div>
						) : null
					})
				) : (
					<div className="text-center py-8 text-gray-500">
						No items found for the selected filter.
					</div>
				)}
			</div>
		</div>
	)
}

export default Accordion
