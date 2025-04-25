import NextLink from "next/link"
import { sendGTMEvent } from "@next/third-parties/google"
import Image from "next/image"
import { toSentenceCase } from "@/utils/toSentenceCase"
import { URL_PATTERNS } from "../constants"

interface Props {
	icon?: string
	value: string
	href: string
}

const InfoButton: React.FC<Props> = (props) => {
	const matchedKey = Object.keys(URL_PATTERNS).find((key) =>
		props.href.toLowerCase().includes(key)
	) as keyof typeof URL_PATTERNS | undefined

	const iconValue =
		props.icon || (matchedKey ? URL_PATTERNS[matchedKey] : undefined)

	return (
		<>
			<NextLink href={props?.href} prefetch={true} rel="noopener noreferrer">
				<div
					onClick={() =>
						sendGTMEvent({
							event: "buttonClicked",
							value: `xyz-${props.value}`
						})
					}
					className="flex items-center px-6 py-4 bg-white rounded-lg mb-4 shadow-md w-[80vw] md:max-w-[500px] mx-auto cursor-pointer relative border border-gray-200 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-gray-50"
				>
					{iconValue ? (
						<Image
							unoptimized
							src={iconValue}
							alt={props.value}
							width={24}
							height={24}
							className="mr-4 drop-shadow-sm rounded"
						/>
					) : null}

					{/* Button Text */}
					<div className="text-gray-800 font-semibold text-sm text-center flex justify-center items-center">
						{toSentenceCase(props.value)}
					</div>
				</div>
			</NextLink>
		</>
	)
}

export default InfoButton
