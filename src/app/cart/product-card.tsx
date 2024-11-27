import { Box, styled, Typography } from "@mui/material"
import Image from "next/image"
import { Ic_nonveg, Ic_veg } from "@mcc/icons"
import { getValue, getVariant } from "./utils"
import { isSafeArray } from "@mcc/helpers/utils"
import { useCart } from "@mcc/context"
import IncrementOperator from "@mcc/fragments/IncrDecrementOperator"

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
		const { variants = [], quantity = "" } = product

		const total = Number(variants[0].price) * quantity
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

		return product.variants[0].is_veg ? getVegIcon() : getNonVegIcon()
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
									{product.name}
								</Typography>
								{product.variants[0].price && (
									<Box sx={{ display: "flex" }}>
										<Typography variant="SPP_Body_2" color="secondary" ml={2}>
											{`Rs.${product.variants[0].price}`}
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
