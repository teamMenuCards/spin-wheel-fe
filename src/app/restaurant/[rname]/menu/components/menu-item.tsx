import Image from "next/image"
import LineClampTypography from "@/shared/LineClampTypography"
import { ProductType, ProductVariantType } from "@/types"

function MenuItem({
	product
}: {
	product: ProductType & { variants: ProductVariantType[] }
}) {
	const rating: number = Number(product.variants?.[0]?.average_rating) || 4
	const starsArray: number[] = Array.from({ length: rating })

	if (!product) {
		return null
	}

	const getVegIcon = () => (
		<Image
			src="/ic_veg.png"
			alt="veg/nonveg icon"
			width={15}
			height={15}
			priority
		/>
	)

	const getNonVegIcon = () => (
		<Image
			src="/ic_nonveg.png"
			alt="veg/nonveg icon"
			width={15}
			height={15}
			priority
		/>
	)

	const getProductType = () =>
		product.variants?.[0]?.is_veg ? getVegIcon() : getNonVegIcon()

	const prdImage = product.variants?.[0]?.image_url || ""

	return (
		<div className="mb-4">
			<div className="flex flex-row-reverse">
				{prdImage && (
					<div className="relative w-[145px] h-[145px] bg-lightSteelBlue rounded-lg">
						<Image
							fill
							priority
							src={prdImage}
							alt="food_img"
							className="object-cover rounded-lg"
						/>
					</div>
				)}

				<div className="flex flex-col flex-1 justify-between pr-2">
					<div>
						<div className="flex items-center">{getProductType()}</div>

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

						{/* Price */}
						{product.variants?.[0]?.price && (
							<p className="text-secondary text-sm font-bold pt-1">
								₹{product.variants[0].price}
							</p>
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
		</div>
	)
}

export default MenuItem
