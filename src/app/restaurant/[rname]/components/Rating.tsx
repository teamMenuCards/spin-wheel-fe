import Image from "next/image"

interface IRating {
	logo: string
	rating: string
	onClick: () => void
}

const Rating = ({ logo, rating, onClick }: IRating) => (
	<div
		onClick={onClick}
		className="flex items-center justify-center gap-2 cursor-pointer"
		aria-label="Scroll to reviews"
	>
		{/* Rating Logo */}
		<Image
			src={logo}
			alt="Rating Logo"
			width={20}
			height={20}
			className="ml-auto rounded"
		/>

		{/* Rating Box */}
		<div className="flex items-center gap-1 bg-green-700 text-white px-1 py-0 rounded text-sm font-bold">
			{rating}
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
	</div>
)

export default Rating
