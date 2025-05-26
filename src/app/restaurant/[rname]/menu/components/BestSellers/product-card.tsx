import { useDispatch, useSelector } from "react-redux"
import IncrementOperator from "../../../components/increment-operator"
import {
	decreaseProductQuantity,
	increaseProductQuantity,
	openCart,
	removeProduct,
	selectProduct
} from "@/store/features/cart.slice"
import Image from "next/image"
import { findDetails } from "@/lib/utils"
import { useFeatureList } from "@/hooks/useFeatureList"
import { FEATURES } from "../../../types"
import { useParams } from "next/navigation"
import { RootState } from "@/store/store"
import { ProductType } from "@/types"

function ProductCard({
	product,
	onImgClick
}: {
	product: ProductType
	onImgClick: (img: string) => void
}) {
	const { rname } = useParams<{ rname: string }>()

	const { hasFeature } = useFeatureList(rname)
	const { mode } = useSelector((state: RootState) => state.appState)
	const hasOrderFeature = hasFeature(FEATURES.RESTAURANT_ORDER_MODULE)

	const showAddBtn = hasOrderFeature && mode === "DELIVERY"

	const dispatch = useDispatch()
	const productDetails = findDetails({
		products: product.variants,
		productName: product.name
	})

	const handleIncrement = (e: { stopPropagation: () => void }) => {
		e.stopPropagation()
		dispatch(increaseProductQuantity(product.id))
	}

	const handleDecrement = () => {
		if (product.quantity && product.quantity > 1) {
			dispatch(decreaseProductQuantity(product.id))
		} else dispatch(removeProduct(product.id))
	}

	const getVegIcon = () => (
		<Image src="/ic_veg.webp" alt="veg icon" width={18} height={18} priority />
	)

	const getNonVegIcon = () => (
		<Image
			unoptimized
			src="/ic_nonveg.webp"
			alt="nonveg icon"
			width={18}
			height={18}
			priority
		/>
	)

	const handleAdd = () => {
		dispatch(openCart())
		dispatch(selectProduct(product))
	}

	return (
		<div
			className="relative p-3 rounded-xl flex flex-col cursor-pointer transition-all border border-gray-200 shadow-lg hover:shadow-xl bg-white hover:border-pink-300 flex-shrink-0"
			style={{
				width: "190px",
				height: "220px",
				transition: "all 0.2s ease-in-out"
			}}
		>
			{/* Image - Larger size */}
			<div className="w-full h-[140px] rounded-xl overflow-hidden mb-2 flex items-center justify-center relative">
				{productDetails.image_url && (
					<Image
						fill
						unoptimized
						src={productDetails.image_url}
						alt={product.name}
						style={{ objectFit: "cover" }}
						onClick={() => onImgClick(productDetails.image_url)}
						className="hover:scale-105 transition-transform duration-200"
						priority
					/>
				)}
			</div>

			{/* Dish Name and Price */}
			<div className="flex-grow flex flex-col justify-between">
				<div className="text-gray-900 font-semibold text-sm">
					{product.name}
				</div>

				<div className="flex justify-between items-end">
					<div className="text-gray-900 font-semibold text-sm">
						₹{productDetails.price}
					</div>
					<div>
						{productDetails.is_veg === true || productDetails.is_veg === "true"
							? getVegIcon()
							: getNonVegIcon()}
					</div>
				</div>
			</div>
			{/* <button className="text-white absolute left-1/2 -translate-x-1/2 bottom-[-12px] w-[100px] text-center font-bold rounded border-2 border-primary text-primary-foreground bg-lime-500">
				ADD+
			</button> */}

			{/* If product has quantity, show Increment operator else show ADD button */}

			{product?.quantity ? (
				<div className="left-1/2 -translate-x-1/2 bottom-[-12px] h-[30px] w-[100px] text-center font-bold rounded border-2 border-primary text-primary-foreground bg-lime-500">
					<IncrementOperator
						product={product}
						onClickPlus={handleIncrement}
						onClickMinus={handleDecrement}
					/>
				</div>
			) : (
				showAddBtn && (
					<button
						onClick={handleAdd}
						className="text-white absolute left-1/2 -translate-x-1/2 bottom-[-12px] w-[100px] text-center font-bold rounded border-2 border-primary text-primary-foreground bg-lime-500"
					>
						ADD+
					</button>
				)
			)}
		</div>
	)
}

export default ProductCard
