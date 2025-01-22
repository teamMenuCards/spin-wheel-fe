import Image from "next/image"
import NutrientComponent from "./nutrients"
import LineClampTypography from "@/shared/LineClampTypography"
import ChipElement from "@/shared/ChipElement"

function MenuItem({ product }) {
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
		product?.variants[0].is_veg ? getVegIcon() : getNonVegIcon()

	const prdImage =
		product?.variants[0]?.image_url ||
		"https://res.cloudinary.com/dftbnws8k/image/upload/v1710440807/Cheese_Extravaganza_ru4k8h.jpg"

	return (
		<div className="mb-4">
			<div className="flex flex-row-reverse">
				{prdImage ? (
					<div className="relative w-[145px] h-[145px] bg-lightSteelBlue rounded-lg">
						<Image
							fill
							priority
							src={prdImage}
							alt="food_img"
							className="object-cover rounded-lg"
						/>
					</div>
				) : (
					<></>
				)}

				<div className="flex flex-col flex-1 justify-between pr-2">
					<div>
						<div className="flex items-center">
							{getProductType()}

							{/* Bestseller Tag */}
							{product.tag && (
								<div className="ml-2">
									<ChipElement color="red" text={product.tag} />
								</div>
							)}
						</div>

						{/* Product Name */}
						<p className="text-secondary text-sm font-bold mt-1">{product.name}</p>

						{/* Product Description */}
						{product.description && (
							<LineClampTypography lines={2} className="text-secondary text-xs mt-1">
								{product.description}
							</LineClampTypography>
						)}

						{/* Price */}
						<p className="text-secondary text-sm font-bold pt-1">
							Rs.{product.variants[0]?.price}
						</p>

						{/* Nutrients */}
						{product.info && <NutrientComponent info={product.info} />}
					</div>
				</div>
			</div>
		</div>
	)
}

export default MenuItem
