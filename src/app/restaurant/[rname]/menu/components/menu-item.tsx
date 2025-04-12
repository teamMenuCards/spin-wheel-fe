"use client"
import { useMemo, useState } from "react"
import Image from "next/image"
import LineClampTypography from "@/shared/LineClampTypography"
import { ProductType, ProductVariantType } from "@/types"
import ImageOverlay from "@/shared/ImageOverlay"
import { isSafeArray } from "@/utils/isSafeArray"

function MenuItem({
	product
}: {
	product: ProductType & { variants: ProductVariantType[] }
}) {
	const [isOpen, setIsOpen] = useState(false)
	const rating: number = Number(product.variants?.[0]?.average_rating) || 4
	const starsArray: number[] = Array.from({ length: rating })

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

	const validatedPrice = (price: string): string => {
		return parseFloat(price) === 0 ? "APS" : `₹${price}`
	}

	const getProductType = () =>
		product.variants?.[0]?.is_veg ? getVegIcon() : getNonVegIcon()

	const prdImage = product.variants?.[0]?.image_url || ""

	return (
		<div className="mb-4">
			<div className="flex flex-row-reverse">
				{prdImage && (
					<div className="relative w-[145px] h-[145px] bg-lightSteelBlue rounded-lg">
						{prdImage ? (
							<Image
								fill
								priority
								unoptimized
								src={prdImage}
								alt="food_img"
								onClick={() => setIsOpen(true)}
								className="object-cover rounded-lg"
							/>
						) : null}
					</div>
				)}

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

						{/* Show variants with price else show only price */}
						{hasVariants ? (
							<>
								{product.variants.map((item) => {
									return !item.variant_name.includes(product.name) ? (
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
								})}
							</>
						) : (
							product?.variants[0]?.price && (
								<p className="text-secondary text-sm font-bold pt-1">
									{validatedPrice(product?.variants[0]?.price)}
								</p>
							)
						)}

						<div className="flex">
							{product.variants?.[0]?.average_rating &&
								starsArray.map((_, index) => {
									return (
										<div key={index}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="#ffb101"
												viewBox="0 0 24 24"
												width="18px"
												height="18px"
											>
												<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
											</svg>
										</div>
									)
								})}
						</div>
					</div>
				</div>
			</div>

			{isOpen ? (
				<ImageOverlay imageUrl={prdImage} onClose={() => setIsOpen(false)} />
			) : null}
		</div>
	)
}

export default MenuItem
