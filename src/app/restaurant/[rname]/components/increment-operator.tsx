import { ProductType } from "@/types"

interface IncrementOperatorProps {
	product: ProductType
	onClickPlus: (e: React.MouseEvent<HTMLDivElement>) => void
	onClickMinus: (e: React.MouseEvent<HTMLDivElement>) => void
}

function IncrementOperator({
	product,
	onClickPlus,
	onClickMinus
}: IncrementOperatorProps) {
	return (
		<>
			<div className="flex items-center justify-center text-white bg-lime-500 rounded-md  w-[100px]">
				{/* <div className="flex items-center justify-center bg-lime-500 rounded-md w-[100px]"> */}
				<div onClick={onClickMinus} className="text-2xl/6 px-2 mb-1">
					-
				</div>

				<div className="px-1 text-md font-bold">{product?.quantity || 1}</div>

				<div onClick={onClickPlus} className="text-2xl/6 px-2 mb-1">
					+
				</div>
				{/* </div> */}
			</div>
		</>
	)
}

export default IncrementOperator
