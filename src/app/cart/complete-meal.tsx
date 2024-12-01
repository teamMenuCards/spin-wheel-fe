import React, { useState } from "react"
import { Box, styled, Snackbar } from "@mui/material"
import LineClampTypography from "@mcc/components/elements/LineClampTypography"
import Typography from "@mui/material/Typography"
import { list } from "./smoothieDetails"
import Image from "next/image"
import { useCart } from "@mcc/context"
import theme from "@mcc/components/ThemeRegistry/theme"

const StyledAdd = styled(Box)({
	textAlign: "center",
	borderRadius: "3px",
	paddingTop: "2px",
	border: `2px solid ${theme.palette.primary.main}`,
	color: theme.palette.primary.main,
	marginTop: "10px",
	height: "20px",
	fontSize: "14px",
	fontWeight: "bold",
	display: "flex",
	alignItems: "center"
})

const StyledBox = styled(Box)({
	width: "545px",
	borderRadius: "10px",
	marginRight: "2px",
	backgroundColor: "white",
	position: "relative"
})

function CompleteMealCards() {
	const [showAlert, setShowAlert] = useState(false)
	const { addProduct, cartValue } = useCart()

	const handleAdd = (product) => {
		if (cartValue > 249) {
			addProduct({ ...product, quantity: 1, variant: product?.price[0] })
			window.scrollTo({ top: 0, behavior: "smooth" })
		} else {
			setShowAlert(true)
		}
	}

	const handleClose = () => {
		setShowAlert(false)
	}

	return (
		<>
			<Box
				sx={{
					display: "flex",
					overflow: "scroll",
					overflowX: "auto"
				}}
			>
				{list.map((item) => {
					return (
						<StyledBox p={1} key={item.id}>
							<Image
								src={item.image}
								alt="App Logo"
								width={140}
								height={120}
								priority
							/>
							<Box>
								<Typography variant="SPP_Caption" color="secondary" mt={1}>
									{item.itemName}
								</Typography>

								{!!item.description && (
									<LineClampTypography
										lines={2}
										variant="SPP_Display_3"
										color="secondary"
										mt={1}
									>
										{item.description}
									</LineClampTypography>
								)}

								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "end"
									}}
								>
									<Box>
										<Typography
											pt={1}
											variant="SPP_Caption"
											color={theme.palette.customColors.slateGrey}
											sx={{ textDecoration: "line-through" }}
										>
											Rs.{item.price[0]?.strikePrice}
										</Typography>

										<Typography variant="SPP_Caption" color="secondary">
											Rs.{item.price[0]?.value}
										</Typography>
									</Box>
									<StyledAdd onClick={() => handleAdd(item)} px={2}>
										ADD+
									</StyledAdd>
								</Box>
							</Box>
						</StyledBox>
					)
				})}
			</Box>

			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				sx={{
					"& .MuiSnackbarContent-root": {
						backgroundColor: "orange",
						fontWeight: "bold",
						fontSize: "16px",
						color: "#ffffff"
					}
				}}
				open={showAlert}
				autoHideDuration={6000}
				onClose={handleClose}
				message="Your cart value is below Rs.249 "
			/>
		</>
	)
}

export default CompleteMealCards
