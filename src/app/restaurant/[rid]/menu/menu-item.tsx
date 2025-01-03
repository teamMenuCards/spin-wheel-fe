import { Box, styled, Typography } from "@mui/material"
import ChipElement from "@mcc/components/elements/ChipElement"
import LineClampTypography from "@mcc/components/elements/LineClampTypography"
import Image from "next/image"
import { Ic_nonveg, Ic_veg } from "@mcc/icons"
import NutrientComponent from "./nutrients"
import theme from "@mcc/components/ThemeRegistry/theme"
import React from "react"
import { useCart } from "@mcc/context"

const StyledContainer = styled(Box)({
	flex: 1,
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between"
})
const StyledAdd = styled(Box)({
	zIndex: 999,
	position: "absolute",
	left: "50%",
	transform: "translateX(-50%)",
	bottom: "-12px",
	width: "70px",
	textAlign: "center",
	fontWeight: "bold",
	borderRadius: "2px",
	border: `2px solid ${theme.palette.primary.main}`,
	color: theme.palette.primary.contrastText,
	background: theme.palette.primary.main
})

const StyledImageBox = styled(Box)({
	height: "105px",
	width: "105px",
	background: "lightSteelBlue",
	position: "relative",
	borderRadius: "5px"
})

const AddButton = styled(Box)({
	width: "100px",
	borderRadius: "2px",
	textAlign: "center",
	fontWeight: "bold",
	border: `2px solid ${theme.palette.primary.main}`,
	color: theme.palette.primary.contrastText,
	background: theme.palette.primary.main
})

function MenuItem({ product }) {
	console.log("productkk-", product)

	const { openCart, setSelectedProduct } = useCart()

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

	const getNonVegIcon = () => (
		<Image
			src={Ic_nonveg}
			alt="veg/nonveg icon"
			width={15}
			height={15}
			priority
		/>
	)

	const getProductType = () => {
		return product?.variants[0].is_veg ? getVegIcon() : getNonVegIcon()
	}

	const prdImage = product?.variants[0]?.image_url

	const handleAdd = () => {
		openCart()
		setSelectedProduct(product)
	}

	return (
		<>
			<Box mb={4}>
				<Box sx={{ display: "flex", flex: 1, flexDirection: "row-reverse" }}>
					{prdImage ? (
						<StyledImageBox onClick={() => handleAdd()}>
							<Image
								fill
								priority
								src={prdImage}
								alt="food_img"
								style={{ objectFit: "cover", borderRadius: "15px" }}
							/>

							<StyledAdd onClick={() => handleAdd()}>ADD+</StyledAdd>
						</StyledImageBox>
					) : (
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<AddButton onClick={() => handleAdd()}>ADD+</AddButton>
						</Box>
					)}

					<StyledContainer pr={1}>
						<Box>
							<Box
								sx={{
									display: "flex",
									alignItems: "center"
								}}
							>
								{/* veg/ non veg icon */}
								<>{getProductType()}</>

								{/* bestseller tag */}
								<Box visibility={product.tag ? "visible" : "hidden"} ml={1}>
									<ChipElement color="red" text={product.tag} />
								</Box>
							</Box>

							{/* product name */}
							<Typography variant="SPP_Caption" color="secondary" mt={1}>
								{product.name}
							</Typography>

							{/* product description */}
							{!!product.description && (
								<LineClampTypography
									lines={2}
									variant="SPP_Display_3"
									color="secondary"
									mt={1}
								>
									{product.description}
								</LineClampTypography>
							)}

							{/* price */}
							<Typography pt={1} variant="SPP_Caption" color="secondary">
								Rs.{product.variants[0]?.price}
							</Typography>

							{/* nutrients */}
							{product.info && <NutrientComponent info={product.info} />}
						</Box>
					</StyledContainer>
				</Box>
			</Box>
		</>
	)
}

export default MenuItem
