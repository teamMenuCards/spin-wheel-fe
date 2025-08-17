"use client"
import { useFeatureList } from "@/hooks/useFeatureList"
import ImageOverlay from "@/shared/ImageOverlay"
import LineClampTypography from "@/shared/LineClampTypography"
import { CLIENT_APP_MODE } from "@/store/features/app.slice"
import {
	decreaseProductQuantity,
	increaseProductQuantity,
	openCart,
	removeProduct,
	selectProduct
} from "@/store/features/cart.slice"
import { RootState } from "@/store/store"
import { ProductType, ProductVariantType } from "@/types"
import { isSafeArray } from "@/utils/isSafeArray"
import Image from "next/image"
import { useParams } from "next/navigation"
import React, { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import IncrementOperator from "../../components/increment-operator"
import { FEATURES } from "../../types"

/* TODO: Fix type issues */
function MenuItem({
	product
}: {
	product: ProductType & { variants: ProductVariantType[] }
}) {
	const dispatch = useDispatch()
	const { rname } = useParams<{ rname: string }>()
	const [openImg, setIsOpen] = useState(false)

	/* 
		Only specific restarants will have Ordering feature. 
		Not all of them will have. featureList is for handling the same
	*/

	const { hasFeature } = useFeatureList(rname)
	const { mode } = useSelector((state: RootState) => state.appState)
	const isDeliveryMode = mode === CLIENT_APP_MODE.DELIVERY

	const hasOrderFeature = hasFeature(FEATURES.RESTAURANT_ORDER_MODULE)

	const { products } = useSelector((state: RootState) => state.cart)

	const rating: number = Number(product.variants?.[0]?.average_rating) || 4
	const starsArray: number[] = Array.from({ length: rating })

	const updatedProduct = useMemo(
		() => products.find((item) => item.id === product.id),
		[products, product.id]
	)

	const showAddBtn = hasOrderFeature && isDeliveryMode

	const hasVariants = useMemo(
		() => isSafeArray(product.variants) && product.variants.length > 1,
		[product.variants]
	)

	if (!product) {
		return null
	}

	const getVegIcon = () => (
		<Image
			unoptimized
			src="/ic_veg.webp"
			alt="veg/nonveg icon"
			width={15}
			height={15}
			priority
		/>
	)

	const getNonVegIcon = () => (
		<Image
			unoptimized
			src="/ic_nonveg.webp"
			alt="veg/nonveg icon"
			width={15}
			height={15}
			priority
		/>
	)

	const findPrdImage = (variants: ProductVariantType[], prdName: string) => {
		if (!variants) return null
		const found = variants.find((item) => item.variant_name === prdName)
		return found?.image_url || null
	}
	const validatedPrice = (price: string): string => {
		return parseFloat(price) === 0 ? "APS" : `₹${Number(price).toString()}`
	}

	const getProductType = () =>
		product.variants?.[0]?.is_veg ? getVegIcon() : getNonVegIcon()

	const prdImage =
		product.variants?.[0]?.image_url ||
		findPrdImage(product.variants, product.name) ||
		null

	const handleAdd = () => {
		dispatch(openCart())
		dispatch(selectProduct(product))
	}

	const handleIncrement = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation()
		if (updatedProduct) {
			dispatch(increaseProductQuantity(updatedProduct.id))
		}
	}

	const handleDecrement = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation()

		if (
			updatedProduct &&
			updatedProduct.quantity &&
			updatedProduct.quantity > 1
		) {
			dispatch(decreaseProductQuantity(updatedProduct.id))
		} else if (updatedProduct) {
			dispatch(removeProduct(updatedProduct.id))
		}
	}

	/* 
		- If Ordering flow is Disabled, only show image of product & open image in overlay
		- if Ordering flow is Enabled, show image of product and ADD button, opens image in Drawer
	*/

	const handleImgContainerClick = () => {
		if (!showAddBtn) {
			setIsOpen(true)
		} else {
			handleAdd()
		}
	}

	return (
		<div className="mb-4">
			<div className="flex flex-row-reverse items-start">
				{/* Image Container with Button */}
				<div className="relative w-[145px] h-[130px] flex flex-col items-center">
					{!!prdImage ? (
						<div
							className="w-full aspect-square bg-lightSteelBlue rounded-lg overflow-hidden"
							onClick={handleImgContainerClick}
						>
							<Image
								fill
								priority
								unoptimized
								src={prdImage}
								alt="food_img"
								className="object-cover rounded-lg max-w-full h-auto"
							/>

							{/* ADD+ Button or IncrementOperator */}
							<div className="mt-2">
								{(updatedProduct?.quantity ?? 0) > 0 ? (
									// <div className="text-white absolute left-1/2 -translate-x-1/2 bottom-[-14px] w-[100px] text-center font-bold rounded border-2 border-primary text-primary-foreground bg-lime-500">
									<div className="text-white absolute left-1/2 -translate-x-1/2 bottom-[-12px] w-[100px] text-center font-bold rounded border-2 border-primary text-primary-foreground bg-lime-500">
										<IncrementOperator
											product={{
												...product,
												quantity: updatedProduct?.quantity ?? 1
											}}
											onClickPlus={handleIncrement}
											onClickMinus={handleDecrement}
										/>
									</div>
								) : (
									showAddBtn && (
										<button
											className="text-white absolute left-1/2 -translate-x-1/2 bottom-[-12px] w-[100px] text-center font-bold rounded border-2 border-primary text-primary-foreground bg-lime-500"
											// className="text-white absolute left-1/2 -translate-x-1/2 bottom-[-14px] w-[100px] text-center font-bold rounded border-2 border-primary text-primary-foreground bg-lime-500"
											onClick={(e) => {
												e.stopPropagation()
												handleAdd()
											}}
										>
											ADD+
										</button>
									)
								)}
							</div>
						</div>
					) : // when item has Image URL but no image
					(updatedProduct?.quantity ?? 0) > 0 ? (
						<div className="h-[120px]">
							<div className="text-white absolute left-1/2 -translate-x-1/2 bottom-[35px] w-[100px] text-center font-bold rounded border-2 border-primary text-primary-foreground bg-lime-500">
								<IncrementOperator
									product={{
										...product,
										quantity: updatedProduct?.quantity ?? 1
									}}
									onClickPlus={handleIncrement}
									onClickMinus={handleDecrement}
								/>
							</div>
						</div>
					) : (
						<div className="h-[120px]">
							{showAddBtn && (
								<button
									className="text-white absolute left-1/2 -translate-x-1/2 bottom-[35px] w-[100px] text-center font-bold rounded border-2 border-primary text-primary-foreground bg-lime-500"
									onClick={handleAdd}
								>
									ADD+
								</button>
							)}
						</div>
					)}
				</div>

				{/* Product Info */}
				<div className="flex flex-col flex-1 justify-between pr-2">
					<div>
						{!hasVariants && (
							<div className="flex items-center">{getProductType()}</div>
						)}

						{/* Product Name */}
						{product.name && (
							<p className="text-secondary text-sm font-bold mt-1">
								{product.name}
							</p>
						)}

						{/* Product Description */}
						{product.description && (
							<LineClampTypography
								lines={2}
								className="text-secondary text-xs mt-1"
							>
								{product.description}
							</LineClampTypography>
						)}

						{/* Variants or Price */}
						{hasVariants ? (
							<>
								{product.variants.map((item) =>
									!item.variant_name.includes(product.name) ? (
										<div
											className="flex text-secondary text-gray-500 text-sm font-semibold pt-1"
											key={item.id}
										>
											<span className="flex items-center mr-1">
												{item.is_veg ? getVegIcon() : getNonVegIcon()}
											</span>
											<span>{item.variant_name}</span>
											<span className="ml-4 text-black">
												{validatedPrice(item.price)}
											</span>
										</div>
									) : null
								)}
							</>
						) : (
							product?.variants &&
							product?.variants[0]?.price && (
								<p className="text-secondary text-sm font-bold pt-1">
									{validatedPrice(product?.variants[0]?.price)}
								</p>
							)
						)}

						{/* Rating Stars */}
						<div className="flex mt-1">
							{product.variants?.[0]?.average_rating &&
								starsArray.map((_, index) => (
									<svg
										key={index}
										xmlns="http://www.w3.org/2000/svg"
										fill="#ffb101"
										viewBox="0 0 24 24"
										width="18px"
										height="18px"
									>
										<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
									</svg>
								))}
						</div>
					</div>
				</div>
			</div>

			{/* Open Full screen Image on Overlay */}
			{openImg && (
				<ImageOverlay imageUrl={prdImage} onClose={() => setIsOpen(false)} />
			)}
		</div>
	)
}

export default MenuItem
