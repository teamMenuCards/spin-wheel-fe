import Image from "next/image"
import LineClampTypography from "@/shared/LineClampTypography"
import { ProductType, ProductVariantType } from "@/types"

function MenuItem({
	product
}: {
	product: ProductType & { variants: ProductVariantType[] }
}) {
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
					</div>
				</div>
			</div>
		</div>
	)
}

export default MenuItem
