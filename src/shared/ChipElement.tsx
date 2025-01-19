import Image from "next/image"

interface Props {
	icon?: JSX.Element | null
	img?: string
	color?: string
	text: string
	className?: string
	border?: string
	borderRadius?: string
	fontColor?: string
	font?: string
	glow?: boolean
}

export default function ChipElement({
	icon,
	img,
	color,
	text,
	className = "",
	borderRadius,
	fontColor,
	border,
	font,
	glow = false
}: Props) {
	const chipClasses = `
		flex items-center px-2 py-1 
		${border ? `border ${border}` : ""} 
		${borderRadius ? `rounded-[${borderRadius}]` : "rounded-sm"} 
		${color ? `bg-[${color}]` : "bg-transparent"} 
		${glow ? "glowContainer" : ""}
	`.trim()

	return (
		<div className={`${chipClasses} ${className}`}>
			{icon && <div className="h-[30px] w-[30px] p-[3px]">{icon}</div>}

			{img && (
				<Image src={img} alt="Chip Icon" width={30} height={30} priority />
			)}

			<p
				className={`text-[${fontColor ?? "#FFF"}] text-[${
					font ?? "9px"
				}] font-bold whitespace-nowrap`}
			>
				{text}
			</p>
		</div>
	)
}
