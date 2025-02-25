import Image from "next/image"

function ImageOverlay({
	imageUrl,
	onClose
}: {
	imageUrl: string
	onClose: () => void
}) {
	return (
		<div
			style={{ background: "rgba(0, 0, 0, 0.8)" }}
			className="fixed z-50 inset-0 flex justify-center items-center"
			onClick={onClose}
		>
			<div className="p-4" onClick={onClose}>
				<Image
					className="z-200 rounded-xl"
					src={imageUrl}
					alt="Full View"
					width={300}
					height={300}
					priority
				/>
			</div>
		</div>
	)
}

export default ImageOverlay
