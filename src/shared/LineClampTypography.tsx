interface LineClampTypographyProps {
	lines: number
	children: React.ReactNode
	className?: string
}

const LineClampTypography: React.FC<LineClampTypographyProps> = ({
	lines,
	children,
	className = "",
	...props
}) => {
	return (
		<p
			className={`overflow-hidden line-clamp-${lines} ${className}`}
			style={{
				display: "-webkit-box",
				WebkitLineClamp: lines,
				WebkitBoxOrient: "vertical",
				...props
			}}
		>
			{children}
		</p>
	)
}

export default LineClampTypography
