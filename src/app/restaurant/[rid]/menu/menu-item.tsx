import { Box, styled, Typography } from "@mui/material"
import ChipElement from "@mcc/components/elements/ChipElement"
import LineClampTypography from "@mcc/components/elements/LineClampTypography"
import Image from "next/image"
import { Ic_nonveg, Ic_veg } from "@mcc/icons"
import NutrientComponent from "./nutrients"

const StyledContainer = styled(Box)({
	flex: 1,
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between"
})

const StyledImageBox = styled(Box)({
	height: "150px",
	width: "150px",
	background: "lightSteelBlue",
	position: "relative",
	borderRadius: "15px"
})

function MenuItem({ product }) {
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
		return product.veg ? getVegIcon() : getNonVegIcon()
	}

	const prdImage = product?.variants[0]?.image_url

	console.log("prdImagekk---", prdImage)

	return (
		<>
			<Box mb={4}>
				<Box sx={{ display: "flex", flex: 1, flexDirection: "row-reverse" }}>
					{prdImage && (
						<StyledImageBox>
							<Image
								fill
								priority
								src={prdImage}
								alt="food_img"
								style={{ objectFit: "cover", borderRadius: "15px" }}
							/>
						</StyledImageBox>
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

							{/* Taste */}
							{/* <Typography mt={1} variant="SPP_Display_3" color="secondary">
								TANGY
							</Typography> */}

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
