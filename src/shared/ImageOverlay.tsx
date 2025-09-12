import Image from "next/image"
import { useState } from "react"

function ImageOverlay({
	imageUrl,
	onClose
}: {
	imageUrl: string | null
	onClose: () => void
}) {
	const [imageError, setImageError] = useState(false)

	return (
		<div
			style={{ background: "rgba(0, 0, 0, 0.8)" }}
			className="fixed z-50 inset-0 flex justify-center items-center"
			onClick={onClose}
		>
			{imageUrl && !imageError ? (
				<div className="p-4" onClick={onClose}>
					<Image
						unoptimized
						className="z-200 rounded-xl"
						src={imageUrl.trim()}
						alt="Full View"
						width={300}
						height={300}
						priority
						onError={() => setImageError(true)}
					/>
				</div>
			) : imageUrl && imageError ? (
				<div className="p-4 text-center text-white" onClick={onClose}>
					<div className="bg-gray-800 rounded-xl p-8 flex flex-col items-center">
						<div className="text-6xl mb-4 opacity-40">🍽️</div>
						<p className="text-lg">Image not available</p>
						<p className="text-sm text-gray-400 mt-2">Click to close</p>
					</div>
				</div>
			) : null}
		</div>
	)
}

export default ImageOverlay
