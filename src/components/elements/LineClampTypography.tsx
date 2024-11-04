import React from "react"
import { Typography, styled } from "@mui/material"

const StyledTypography = styled(Typography)(({ theme, lines }) => {
	return {
		display: "-webkit-box",

		"-webkit-line-clamp": `${Number(lines)}`, // Use numberOfLines prop here
		"-webkit-box-orient": "vertical",
		overflow: "hidden"
	}
})

const LineClampTypography = ({ lines, children, ...props }) => {
	return (
		<StyledTypography lines={lines} {...props}>
			{children}
		</StyledTypography>
	)
}

export default LineClampTypography
