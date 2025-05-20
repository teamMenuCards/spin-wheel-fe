import { isSafeArray } from "@/utils/isSafeArray"
import Image from "next/image"
import IncrementOperator from "./increment-operator"
import {
	increaseProductQuantity,
	decreaseProductQuantity,
	removeProduct
} from "@/store/features/cart.slice"
import { useDispatch } from "react-redux"
import { useMemo } from "react"
import { ProductType } from "@/types"

function ProductCard({ product }: { product: ProductType }) {
	const dispatch = useDispatch()
	// const { product } = useSelector((state) => state.cart)

	const getVegIcon = () => {
		return (
			<Image
				src="/ic_veg.webp"
				alt="veg/nonveg icon"
				width={15}
				height={15}
				priority
			/>
		)
	}

	const getNonVegIcon = () => {
		return (
			<Image
				src="/ic_nonveg.webp"
				alt="veg/nonveg icon"
				width={15}
				height={15}
				priority
			/>
		)
	}

	const getProductType = (isVeg: boolean) => {
		return isVeg ? getVegIcon() : getNonVegIcon()
	}

	const handleIncrement = () => {
		dispatch(increaseProductQuantity(product.id))
	}

	const handleDecrement = () => {
		if (product.quantity && product.quantity > 1) {
			dispatch(decreaseProductQuantity(product.id))
		} else dispatch(removeProduct(product.id))
	}

	const getProductDetail = useMemo(() => {
		return (
			isSafeArray(product.variants) &&
			product.variants.find((item) => item.variant_name === product.name)
		)
	}, [product.name, product.variants])

	return (
		<div className="flex justify-between items-baseline px-2 py-1 rounded-md shadow-md m-2">
			{/* Left Section */}
			<div className="flex items-center">
				{getProductDetail && (
					<div className="mr-4">{getProductType(getProductDetail.is_veg)}</div>
				)}
				<div>
					<div className="text-sm w-40 font-semibold text-gray-800">
						{product.name}
					</div>
				</div>
			</div>

			{/* Right Section */}
			<div className="flex flex-col items-start">
				<IncrementOperator
					product={product}
					onClickPlus={handleIncrement}
					onClickMinus={handleDecrement}
				/>
				{isSafeArray(product.variants) && (
					<div className="text-sm font-semibold text-gray-600 mt-1">
						{getProductDetail && `Rs.${getProductDetail.price}`}
					</div>
				)}
			</div>
		</div>
	)
}

export default ProductCard
