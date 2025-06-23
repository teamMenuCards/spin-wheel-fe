import NextLink from "next/link"
import { sendGTMEvent } from "@next/third-parties/google"
import Image from "next/image"
import { ICON_MAP, URL_PATTERNS, IconKey } from "../constants"
import clsx from "clsx"

interface Props {
	icon?: string
	value: string
	href: string
	premium?: boolean
	onClick?: (e: React.MouseEvent) => void
}

const Default_Icon = "/star.webp"

const InfoButton: React.FC<Props> = (props) => {
	const matchedKey = Object.keys(URL_PATTERNS).find((key) =>
		props.href.toLowerCase().includes(key)
	) as keyof typeof URL_PATTERNS | undefined

	const iconKey = matchedKey ? URL_PATTERNS[matchedKey] : undefined
	const iconValue =
		props.icon || (iconKey ? ICON_MAP[iconKey as IconKey] : Default_Icon)

	const premiumBtn = () => (
		<NextLink href={props?.href} prefetch={true} rel="noopener noreferrer">
			<div
				className={clsx(
					"mb-4 shadow-md w-[80vw] md:max-w-[500px] border border-gray-200 rounded-lg",
					props.premium ? "bg-lime-200" : "bg-white"
				)}
			>
				<div
					onClick={(e) => {
						sendGTMEvent({
							event: "buttonClicked",
							value: `xyz-${props.value}`
						})
						if (props.onClick) {
							props.onClick(e)
						}
					}}
					className={clsx(
						"flex items-center px-6 py-4 md:max-w-[500px] rounded-tl-lg rounded-tr-lg mx-auto cursor-pointer relative backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
					)}
				>
					{iconValue ? (
						<Image
							unoptimized
							src={iconValue}
							alt={props.value}
							width={24}
							height={24}
							className="mr-4 w-6 h-6 drop-shadow-sm rounded"
						/>
					) : null}
					{/* Button textname value */}

					<div className="font-semibold text-sm text-black text-left flex justify-center items-center">
						{props.value}
					</div>
				</div>

				<div className="font-semibold text-white rounded-bl-lg rounded-br-lg bg-lime-500 text-xs text-center flex justify-center items-center">
					For first 20 customers only
				</div>
			</div>
		</NextLink>
	)

	const defaultBtn = () => (
		<NextLink href={props?.href} prefetch={true} rel="noopener noreferrer">
			<div
				onClick={(e) => {
					props.onClick?.(e)
					sendGTMEvent({
						event: "buttonClicked",
						value: `xyz-${props.value}`
					})
				}}
				className="flex items-center px-6 py-4 bg-white rounded-lg mb-4 shadow-md w-[80vw] md:max-w-[500px] mx-auto cursor-pointer relative border border-gray-200 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-gray-50"
			>
				{iconValue ? (
					<Image
						unoptimized
						src={iconValue}
						alt={props.value}
						width={24}
						height={24}
						className="mr-4 w-6 h-6 drop-shadow-sm rounded"
					/>
				) : null}

				{/* Button Text */}
				<div className="text-gray-800 font-semibold text-sm text-left flex justify-center items-center">
					{props.value}
				</div>
			</div>
		</NextLink>
	)
	return <>{props.premium ? premiumBtn() : defaultBtn()}</>
}

export default InfoButton
