"use client"
import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

export type FilterType = "all" | "veg" | "non-veg" | string

interface MenuFiltersProps {
	onFilterChange: (filter: FilterType) => void
	activeFilter: FilterType | FilterType[]
	availableAllergens?: string[]
	isPureVegRestaurant?: boolean
}

const MenuFilters: React.FC<MenuFiltersProps> = ({
	onFilterChange,
	activeFilter,
	availableAllergens = [],
	isPureVegRestaurant = false
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	// Convert single filter to array for consistency
	const activeFilters = Array.isArray(activeFilter)
		? activeFilter
		: [activeFilter]

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
			// Add Jain filter if Jain allergen is present (only for non-pure veg restaurants)
			...(!isPureVegRestaurant && availableAllergens.includes("Jain")
				? [
						{
							type: "Jain" as FilterType,
							label: "Jain",
							icon: null
						}
				  ]
				: []),
			// Add Non-Jain filter if Jain allergen is present (only for non-pure veg restaurants)
			...(!isPureVegRestaurant && availableAllergens.includes("Jain")
				? [
						{
							type: "non-jain" as FilterType,
							label: "Non-Jain",
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
			// Add individual allergen filters (excluding Jain since it's handled separately)
			...availableAllergens
				.filter((allergen) => allergen !== "Jain")
				.map((allergen) => ({
					type: allergen as FilterType,
					label: allergen,
					icon: null
				}))
		],
		[availableAllergens, isPureVegRestaurant]
	)

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [])

	// Memoized filter click handler
	const handleFilterClick = useCallback(
		(filterType: FilterType) => {
			// Handle Jain and Non-Jain as mutually exclusive
			if (filterType === "Jain" || filterType === "non-jain") {
				// If clicking on Jain, remove non-jain and vice versa
				const otherFilter = filterType === "Jain" ? "non-jain" : "Jain"
				onFilterChange(filterType)
				// Also remove the other filter if it's currently selected
				if (activeFilters.includes(otherFilter)) {
					onFilterChange(otherFilter)
				}
			} else {
				onFilterChange(filterType)
			}

			// Close dropdown only when "All" is clicked
			if (filterType === "all") {
				setIsOpen(false)
			}
		},
		[onFilterChange, activeFilters]
	)

	// Clear all filters handler
	const handleClearAll = useCallback(() => {
		onFilterChange("all")
	}, [onFilterChange])

	// Get selected filters count for display (excluding Jain and Non-Jain since they're upfront buttons)
	const selectedCount = activeFilters.filter(
		(f) => f !== "all" && f !== "Jain" && f !== "non-jain"
	).length

	return (
		<div className="sticky top-14 z-40 flex items-center justify-start gap-2 py-1 px-2 bg-white border-b border-gray-200 shadow-sm overflow-visible">
			{/* Filter Dropdown Button */}
			<div className="relative flex-shrink-0" ref={dropdownRef}>
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="flex items-center gap-1 px-1 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-600 hover:border-gray-400 transition-all duration-200 min-w-0"
				>
					<Image
						src="/filter-icon.svg"
						alt="filter icon"
						width={6}
						height={6}
						className="w-5 h-5"
					/>
					<span className="text-xs font-medium whitespace-nowrap min-w-0">
						{selectedCount > 0
							? `${selectedCount} Filter${selectedCount > 1 ? "s" : ""}`
							: "Filters"}
					</span>
					<Image
						src="/arrow-down.webp"
						alt="dropdown arrow"
						width={16}
						height={16}
						className={`transition-transform duration-200 flex-shrink-0 ${
							isOpen ? "rotate-180" : ""
						}`}
					/>
				</button>

				{/* Dropdown Menu */}
				{isOpen && (
					<div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-[9999] max-h-80 overflow-y-auto">
						<div className="p-2 border-b border-gray-100 flex justify-between items-center">
							<h3 className="text-sm font-semibold text-gray-700">
								Filter Options
							</h3>
							<button
								onClick={handleClearAll}
								className="text-xs text-red-600 hover:text-red-700 font-medium"
							>
								Clear All
							</button>
						</div>
						<div className="p-1">
							{filters.map((filter) => (
								<label
									key={filter.type}
									className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 rounded cursor-pointer"
								>
									<input
										type="checkbox"
										checked={activeFilters.includes(filter.type)}
										onChange={() => handleFilterClick(filter.type)}
										className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
									/>
									<div className="flex items-center gap-1.5">
										{filter.icon && (
											<Image
												src={filter.icon}
												alt={filter.label}
												width={14}
												height={14}
												className="w-3.5 h-3.5"
											/>
										)}
										<span className="text-sm text-gray-700">
											{filter.label}
										</span>
									</div>
								</label>
							))}
						</div>
					</div>
				)}
			</div>

			{/* Scrollable container for all filter buttons */}
			<div className="flex items-center gap-2 overflow-x-auto scrollbar-hide min-w-0">
				{/* Jain and Non-Jain buttons for pure veg restaurants */}
				{isPureVegRestaurant && availableAllergens.includes("Jain") && (
					<>
						<button
							onClick={() => handleFilterClick("Jain")}
							className={`px-1 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
								activeFilters.includes("Jain")
									? "border-green-500 bg-green-50 text-green-700"
									: "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
							}`}
						>
							Jain
						</button>
						<button
							onClick={() => handleFilterClick("non-jain")}
							className={`px-1 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
								activeFilters.includes("non-jain")
									? "border-green-500 bg-green-50 text-green-700"
									: "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
							}`}
						>
							Non-Jain
						</button>
					</>
				)}

				{/* Active Filters Display */}
				{selectedCount > 0 && (
					<>
						{activeFilters
							.filter((f) => f !== "all" && f !== "Jain" && f !== "non-jain")
							.map((filter) => {
								console.log("activeFiltersk--", activeFilters)
								const filterInfo = filters.find((f) => f.type === filter)
								return (
									<button
										key={filter}
										onClick={() => handleFilterClick(filter)}
										className={`px-1 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
											activeFilters.includes(filter)
												? "border-green-500 bg-green-50 text-green-700"
												: "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
										}`}
									>
										{filterInfo?.label}
									</button>
								)
							})}
					</>
				)}
			</div>
		</div>
	)
}

export default MenuFilters
