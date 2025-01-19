import React from "react"

const Dot = ({ size = 3, color = "black" }) => {
	return (
		<div
			className="rounded-full mx-[3px] my-[1px]"
			style={{ width: size, height: size, backgroundColor: color }}
		/>
	)
}

export default Dot
