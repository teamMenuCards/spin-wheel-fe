import { Box, Typography, IconButton } from "@mui/material"
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
	className,
	borderRadius,
	fontColor,
	border,
	font,
	glow = false
}: Props) {
	if (glow) {
		className += "glowContainer"
	}

	return (
		<Box
			pl={0.5}
			pr={0.5}
			sx={{
				borderRadius: borderRadius ?? "2px",
				backgroundColor: color ? color : "none",
				borderWidth: border ? "1px" : undefined,
				borderStyle: border ? "solid" : undefined,
				borderColor: border
			}}
			display="flex"
			alignItems="center"
			className={glow ? "glowContainer" : className}
		>
			{icon ? (
				<IconButton sx={{ height: "30px", width: "30px", padding: "3px" }}>
					{icon}
				</IconButton>
			) : null}

			{img && (
				<Image src={img} alt="App Logo" width={30} height={30} priority />
			)}

			<Typography
				color={fontColor ?? "#FFF"}
				sx={{ fontSize: font ?? "9px", whiteSpace: "nowrap" }}
			>
				<strong>{text}</strong>
			</Typography>
		</Box>
	)
}
