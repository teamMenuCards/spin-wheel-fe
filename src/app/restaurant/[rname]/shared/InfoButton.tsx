import NextLink from "next/link"
import { sendGTMEvent } from "@next/third-parties/google"
import Image from "next/image"
import { toSentenceCase } from "@/utils/toSentenceCase"
import { ICON_MAP } from "../constants"

function InfoButton(props) {
	console.log("heyye--", ICON_MAP["swiggy"])

	const iconValue = props.icon || ICON_MAP[props.value.toLowerCase()]

	return (
		<>
			<NextLink
				passHref
				prefetch={true}
				target="_blank"
				rel="noopener noreferrer"
				{...props}
			>
				<div
					onClick={() =>
						sendGTMEvent({
							event: "buttonClicked",
							value: `xyz-${props.value}`
						})
					}
					className="flex justify-center items-center px-6 py-4 bg-white rounded-lg mb-4 shadow-md w-[80vw] md:max-w-[500px] mx-auto cursor-pointer relative border border-gray-200 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-gray-50"
				>
					{iconValue ? (
						<Image
							src={iconValue}
							alt={props.value}
							width={24}
							height={24}
							className="mr-4 drop-shadow-sm rounded"
						/>
					) : null}
					{/* Button Text */}
					<div className="text-gray-800 font-semibold text-sm">
						{toSentenceCase(props.value)}
					</div>
				</div>
			</NextLink>
		</>
	)
}

export default InfoButton
