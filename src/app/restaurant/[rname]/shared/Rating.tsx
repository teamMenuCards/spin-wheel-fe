"use client"
import Image from "next/image"

interface IRating {
	logo: string
	rating: number
	onClick: () => void
	reviews: number
}

const Rating = ({ logo, rating, onClick, reviews }: IRating) => (
	<div
		onClick={onClick}
		className="flex items-start justify-center gap-1 cursor-pointer"
		aria-label="Scroll to reviews"
	>
		{/* social icons logo */}
		{logo ? (
			<Image
				unoptimized
				src={logo}
				alt="Rating Logo"
				width={20}
				height={20}
				className="ml-auto rounded"
			/>
		) : null}

		{/* Rating Box */}
		<div>
			<div className="flex gap-1 bg-green-700 text-white px-1 py-0 rounded text-sm font-bold items-center justify-center">
				{rating}
				{/* star icon */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="white"
					viewBox="0 0 24 24"
					width="16px"
					height="16px"
				>
					<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
				</svg>
			</div>
			<div className="flex items-center text-[10px] font-semibold text-stone-500 md:mt-1 underline ">
				{`(${reviews}) reviews`}
			</div>
		</div>
	</div>
)

export default Rating
