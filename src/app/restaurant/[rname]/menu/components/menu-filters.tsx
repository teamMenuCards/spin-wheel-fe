"use client"
import Image from "next/image"

export type FilterType = "all" | "veg" | "non-veg"

interface MenuFiltersProps {
	onFilterChange: (filter: FilterType) => void
	activeFilter: FilterType
}

const MenuFilters: React.FC<MenuFiltersProps> = ({
	onFilterChange,
	activeFilter
}) => {
	const filters = [
		{ type: "all" as FilterType, label: "All", icon: null },
		{ type: "veg" as FilterType, label: "Veg", icon: "/ic_veg.webp" },
		{ type: "non-veg" as FilterType, label: "Non-Veg", icon: "/ic_nonveg.webp" }
	]

	return (
		<div className="sticky top-14 z-40 flex items-center justify-start gap-2 py-1 px-2 bg-white border-b border-gray-200 shadow-sm">
			{filters.map((filter) => (
				<button
					key={filter.type}
					onClick={() => onFilterChange(filter.type)}
					className={`flex items-center gap-1 px-2 py-1 rounded-lg border transition-all duration-200 ${
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
			))}
		</div>
	)
}

export default MenuFilters
