import React from "react"
import Image from "next/image"
import { FaWhatsapp } from "react-icons/fa"

const PopupContent = ({
	platformLink,
	directOrderLink,
	platformName = "Zomato"
}: {
	platformLink: string
	directOrderLink: string
	platformName?: "Zomato" | "Swiggy"
}) => {
	const emojiSrc = "/partyingface.webp"

	return (
		<div className="text-center max-w-md mx-auto">
			<div className="flex justify-center mb-2">
				<Image src={emojiSrc} alt="Emoji" width={40} height={40} />
			</div>

			<h2 className="text-2xl text-black font-bold mb-2">
				Save 30% Instantly!
			</h2>

			<p className="text-gray-700 mb-6">
				Order directly on WhatsApp. <br /> Avoid delivery app fees
			</p>

			<a
				href={directOrderLink}
				target="_blank"
				rel="noopener noreferrer"
				className="flex items-start justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 mb-4 rounded-lg transition leading-none"
			>
				<div className="text-base leading-none w-[200px]">
					✔ Save 30% – Order on WhatsApp
				</div>
				<FaWhatsapp className="text-lg inline-block align-middle" size="25px" />
			</a>

			<a
				href={platformLink}
				target="_blank"
				rel="noopener noreferrer"
				className="block bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 rounded-lg transition"
			>
				Continue with {platformName} – Full Price
			</a>
		</div>
	)
}

export default PopupContent
