import { Box, Typography } from "@mui/material"
import Dot from "./dot"

function NutrientComponent({ info }) {
	const { carbs, energy, fats, fibre, protein } = info
	return (
		<Box
			sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
			mt={1}
		>
			{energy && (
				<Typography variant="SPP_Display_3" sx={{ fontWeight: "bold" }}>
					{energy}
				</Typography>
			)}

			{protein && (
				<>
					<Dot />
					<Typography variant="SPP_Display_3" color="secondary">
						{protein} Protein
					</Typography>
				</>
			)}

			{carbs && (
				<>
					<Dot />
					<Typography variant="SPP_Display_3" color="secondary">
						{carbs} Carbs
					</Typography>
				</>
			)}

			<Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
				{fats && (
					<>
						<Dot />
						<Typography variant="SPP_Display_3" color="secondary">
							{fats} Fat
						</Typography>
					</>
				)}

				{fibre && (
					<>
						<Dot />
						<Typography variant="SPP_Display_3" color="secondary">
							{fibre} Fiber
						</Typography>
					</>
				)}
			</Box>
		</Box>
	)
}

export default NutrientComponent
