import Dot from "./dot"

function NutrientComponent({ info }) {
	const { carbs, energy, fats, fibre, protein } = info

	return (
		<div className="flex flex-wrap items-center mt-1">
			{energy && <span className="font-bold text-sm">{energy}</span>}

			{protein && (
				<>
					<Dot />
					<span className="text-secondary text-sm">{protein} Protein</span>
				</>
			)}

			{carbs && (
				<>
					<Dot />
					<span className="text-secondary text-sm">{carbs} Carbs</span>
				</>
			)}

			<div className="flex flex-wrap items-center">
				{fats && (
					<>
						<Dot />
						<span className="text-secondary text-sm">{fats} Fat</span>
					</>
				)}

				{fibre && (
					<>
						<Dot />
						<span className="text-secondary text-sm">{fibre} Fiber</span>
					</>
				)}
			</div>
		</div>
	)
}

export default NutrientComponent
