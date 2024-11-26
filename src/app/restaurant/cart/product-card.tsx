import { Box, styled, Typography } from "@mui/material"
import Image from "next/image"
import IncrementOperator from "../dashboard/increment-operator"
import { useCart } from "@spp/context/cart-context"
import { isSafeArray } from "@spp/helpers/Utils"
import { Ic_nonveg, Ic_veg } from "@spp/icons"
import { getValue, getVariant } from "./utils"

const StyledContainer = styled(Box)({
	flex: 1,
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between"
})

function ProductCard({ product }) {
	const { increaseProductQuantity, decreaseProductQuantity, removeProduct } =
		useCart()

	const getTotalAmount = (product) => {
		const { variant = "", quantity = "" } = product

		const total = getValue(variant) * quantity
		return total
	}

	const handleIncrement = () => {
		increaseProductQuantity(product)
	}

	const handleDecrement = () => {
		if (product.quantity > 1) {
			decreaseProductQuantity(product)
		} else removeProduct(product)
	}

	const getVegIcon = () => {
		return (
			<Image
				src={Ic_veg}
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
				src={Ic_nonveg}
				alt="veg/nonveg icon"
				width={15}
				height={15}
				priority
			/>
		)
	}

	const getProductType = () => {
		/* If product is superbowl/ Pasta then return both icons */
		if (product.categoryType == 2 || product.categoryType == 20) {
			return null
		}
		return product.veg ? getVegIcon() : getNonVegIcon()
	}

	return (
		<>
			<Box sx={{ display: "flex", flex: 1 }}>
				<StyledContainer pr={1}>
					<Box>
						<Box sx={{ display: "flex" }}>
							<Box
								sx={{
									display: "flex",
									flexDirection: "row-reverse",
									justifyContent: "space-between"
								}}
							>
								<>{getProductType()}</>
							</Box>

							<Box ml={1}>
								<Typography variant="SPP_Caption" color="secondary">
									{product.itemName}
								</Typography>
								{isSafeArray(product.price) && (
									<Box sx={{ display: "flex" }}>
										<Typography variant="SPP_Body_2" color="secondary">
											{getVariant(product.variant)}
										</Typography>

										<Typography variant="SPP_Body_2" color="secondary" ml={2}>
											{`Rs.${getValue(product.variant)}`}
										</Typography>
									</Box>
								)}
							</Box>
						</Box>
					</Box>
				</StyledContainer>

				{/* stepper */}
				<Box>
					<Box>
						<IncrementOperator
							product={product}
							size="small"
							onClickPlus={handleIncrement}
							onClickMinus={handleDecrement}
						/>
					</Box>

					<Box sx={{ marginTop: "5px", display: "flex" }}>
						<Typography
							color="secondary"
							variant="SPP_Display_2"
							fontWeight="bold"
						>
							Rs.{getTotalAmount(product)}
						</Typography>
					</Box>
				</Box>
			</Box>
		</>
	)
}

export default ProductCard
