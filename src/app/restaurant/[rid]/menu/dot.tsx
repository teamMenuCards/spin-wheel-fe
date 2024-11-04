import React from "react"
import { Box } from "@mui/material"

const Dot = ({ size = 3, color = "black" }) => {
	const circleStyle = {
		width: size,
		height: size,
		backgroundColor: color,
		borderRadius: "50%",
		margin: "1px 3px"
	}

	return <Box sx={circleStyle}></Box>
}

export default Dot
