const MenuSkeletonItem = () => {
	return (
		<div className="flex justify-between items-center gap-4 py-4 animate-pulse">
			<div className="flex flex-col gap-2 flex-1">
				<div className="h-4 w-6 bg-gray-300 rounded" /> {/* veg icon */}
				<div className="h-5 w-32 bg-gray-300 rounded" /> {/* item name */}
				<div className="h-4 w-16 bg-gray-300 rounded" /> {/* price */}
			</div>
			<div className="w-24 h-24 rounded-lg bg-gray-300" /> {/* image */}
		</div>
	)
}

export default function Loading() {
	return (
		<div className="p-4 space-y-6">
			{Array.from({ length: 6 }).map((_, index) => (
				<MenuSkeletonItem key={index} />
			))}
		</div>
	)
}
