import { styled } from "@mui/system"
import Typography from "@mui/material/Typography"

interface LineClampTypographyProps {
	lines: number
	children: React.ReactNode
	[key: string]: unknown
}

const StyledTypography = styled(Typography, {
	shouldForwardProp: (prop) => prop !== "lines"
})(({ lines }: { lines: number }) => ({
	display: "-webkit-box",
	"-webkit-line-clamp": `${lines}`,
	"-webkit-box-orient": "vertical",
	overflow: "hidden"
}))

const LineClampTypography: React.FC<LineClampTypographyProps> = ({
	lines,
	children,
	...props
}) => {
	return (
		<StyledTypography lines={lines} {...props}>
			{children}
		</StyledTypography>
	)
}

export default LineClampTypography
