"use client"
import Image from "next/image"
import { useCallback, useMemo } from "react"

export type FilterType = "all" | "veg" | "non-veg" | string

interface MenuFiltersProps {
	onFilterChange: (filter: FilterType) => void
	activeFilter: FilterType
	availableAllergens?: string[]
	isPureVegRestaurant?: boolean
}

const MenuFilters: React.FC<MenuFiltersProps> = ({
	onFilterChange,
	activeFilter,
	availableAllergens = [],
	isPureVegRestaurant = false
}) => {
	// Memoized filters array to prevent recreation on every render
	const filters = useMemo(
		() => [
			{ type: "all" as FilterType, label: "All", icon: null },
			// Add allergen-free filter if allergens are present
			...(availableAllergens.length > 0
				? [
						{
							type: "allergen-free" as FilterType,
							label: "Allergen-Free",
							icon: null
						}
				  ]
				: []),
			// Only show veg filter if restaurant is Nonveg
			...(!isPureVegRestaurant
				? [{ type: "veg" as FilterType, label: "Veg", icon: "/ic_veg.webp" }]
				: []),
			// Only show non-veg filter if restaurant is Nonveg
			...(!isPureVegRestaurant
				? [
						{
							type: "non-veg" as FilterType,
							label: "Non-Veg",
							icon: "/ic_nonveg.webp"
						}
				  ]
				: []),
			// Add individual allergen filters receievd from api
			...availableAllergens.map((allergen) => ({
				type: allergen as FilterType,
				label: allergen,
				icon: null
			}))
		],
		[availableAllergens, isPureVegRestaurant]
	)

	// Memoized filter click handler
	const handleFilterClick = useCallback(
		(filterType: FilterType) => {
			onFilterChange(filterType)
		},
		[onFilterChange]
	)

	// Memoized filter button renderer
	const renderFilterButton = useCallback(
		(filter: { type: FilterType; label: string; icon: string | null }) => (
			<button
				key={filter.type}
				onClick={() => handleFilterClick(filter.type)}
				className={`flex items-center gap-1 px-2 py-1 rounded-lg border transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
					activeFilter === filter.type
						? "border-green-500 bg-green-50 text-green-700"
						: "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
				}`}
			>
				{filter.icon && (
					<Image
						src={filter.icon}
						alt={filter.label}
						width={14}
						height={14}
						className="w-3.5 h-3.5"
					/>
				)}
				<span className="text-xs font-medium">{filter.label}</span>
			</button>
		),
		[activeFilter, handleFilterClick]
	)

	return (
		<div className="sticky top-14 z-40 flex items-center justify-start gap-2 py-1 px-2 bg-white border-b border-gray-200 shadow-sm overflow-x-auto">
			{filters.map(renderFilterButton)}
		</div>
	)
}

export default MenuFilters
