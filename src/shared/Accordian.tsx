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
import { useCallback, useMemo, useState } from "react"

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

	// Extract all available allergens from menu items
	const availableAllergens = useMemo(() => {
		const allergenSet = new Set<string>()

		sections.forEach((section) => {
			section.products.forEach((product) => {
				const allergens = product.variants?.[0]?.allergens
				if (allergens && allergens.trim() !== "" && allergens !== "null") {
					const allergenList = allergens.split(",").map((a) => a.trim())
					allergenList.forEach((allergen) => {
						if (allergen) allergenSet.add(allergen)
					})
				}
			})
		})

		return Array.from(allergenSet)
	}, [sections])

	// Memoized featured products extraction
	const featuredProducts = useMemo(
		() =>
			sections.flatMap((section) =>
				section.products
					.filter((product) => product.is_featured)
					.map((product) => product)
			),
		[sections]
	)

	// Memoized filter function
	const filterProducts = useCallback(
		(products: Category["products"]) => {
			if (activeFilter === "all") return products

			return products.filter((product) => {
				const isVeg = product.variants?.[0]?.is_veg

				if (activeFilter === "veg") return isVeg
				if (activeFilter === "non-veg") return !isVeg

				// Check if activeFilter is allergen-free
				if (activeFilter === "allergen-free") {
					// Show products that have NO allergens
					const allergens = product.variants?.[0]?.allergens
					return !allergens || allergens.trim() === "" || allergens === "null"
				}

				// Check if activeFilter is an allergen name
				if (availableAllergens.includes(activeFilter)) {
					// Show products that DO contain this specific allergen
					const allergens = product.variants?.[0]?.allergens
					if (!allergens || allergens.trim() === "" || allergens === "null") {
						return false // No allergens, so don't show
					}
					const productAllergens = allergens.split(",").map((a) => a.trim())
					return productAllergens.includes(activeFilter)
				}

				return true
			})
		},
		[activeFilter, availableAllergens]
	)

	// Memoized pure veg restaurant check
	const isPureVegRestaurant = useMemo(
		() =>
			sections.every((section) =>
				section.products.every((product) => product.variants?.[0]?.is_veg)
			),
		[sections]
	)

	// Memoized filtered sections
	const filteredSections = useMemo(
		() =>
			sections.filter((section) => {
				const filteredProducts = filterProducts(section.products)
				return filteredProducts.length > 0
			}),
		[sections, filterProducts]
	)

	// Memoized filtered featured products
	const filteredFeaturedProducts = useMemo(
		() => filterProducts(featuredProducts),
		[featuredProducts, filterProducts]
	)

	// Memoized section click handler
	const onClickSection = useCallback(
		(index: number, section: Category) => {
			setOpenIndexes((prevIndexes) =>
				prevIndexes.includes(index)
					? prevIndexes.filter((i) => i !== index)
					: [...prevIndexes, index]
			)
			onSectionSelection(section)
		},
		[onSectionSelection]
	)

	// Memoized filter change handler
	const handleFilterChange = useCallback(
		(filter: FilterType) => {
			setActiveFilter(filter)
			// Use the original sections array to get all possible indexes
			setOpenIndexes(sections.map((_, index) => index))
		},
		[sections]
	)

	// Memoized sorted products for each section
	const getSortedProducts = useCallback(
		(products: Category["products"]) => {
			return filterProducts([...products]).sort(
				(a, b) => a.display_order - b.display_order
			)
		},
		[filterProducts]
	)

	// Memoized render function for menu items
	const renderMenuItem = useCallback((item: Category["products"][0]) => {
		return item?.active ? <MenuItem product={item} key={item.id} /> : null
	}, [])

	return (
		<div className="w-full max-w-md mx-auto">
			{/* Filter Component */}
			{(!isPureVegRestaurant || availableAllergens.length > 0) && (
				<MenuFilters
					onFilterChange={handleFilterChange}
					activeFilter={activeFilter}
					availableAllergens={availableAllergens}
					isPureVegRestaurant={isPureVegRestaurant}
				/>
			)}

			<div className="space-y-2">
				{/* Chef recommendation - only show if has featured products matching filter */}
				{isSafeArray(filteredFeaturedProducts) && (
					<ChefRecommendation recommendations={filteredFeaturedProducts} />
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
											{getSortedProducts(section.products).map(renderMenuItem)}
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
