"use client"
import React, { useEffect, useState } from "react"
import {
	Drawer,
	Radio,
	Grid,
	Button,
	Box,
	Typography,
	styled,
	List,
	ListItem,
	FormControlLabel,
	IconButton
} from "@mui/material"
import Image from "next/image"
import CloseIcon from "@mui/icons-material/Close"
import NutrientComponent from "./nutrients"
import { Ic_nonveg, Ic_veg } from "@mcc/icons"
import { isSafeArray } from "@mcc/helpers/utils"
import { useCart } from "@mcc/context"

const StyledContainer = styled(Box)(() => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	width: "100%"
}))

const Wrapper = styled(Box)(() => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center"
}))

function AddToCartDrawer({ onClickAdd }) {
	const {
		setCartValue,
		selectedProduct = {},
		isOpen,
		closeCart,
		products
	} = useCart()

	const prdDetails =
		(selectedProduct &&
			isSafeArray(selectedProduct.variants) &&
			selectedProduct?.variants[0]) ||
		[]

	console.log("isOpen--", prdDetails)

	useEffect(() => {
		if (products.length) {
			let sum = 0
			products.forEach((prod) => {
				const hasVariant = prod?.variant?.selected
				if (hasVariant) {
					sum += hasVariant.value * prod.quantity
				} else {
					sum += prod?.variant?.value * prod.quantity
				}
			})
			setCartValue(sum)
		}
	}, [products])

	const [variant, setVariant] = useState()
	const [selectedOption, setSelectedOption] = useState()

	const handleChange = (event, option, index, variant = {}) => {
		setSelectedOption(event.target.value)
		if (Object.keys(variant).length) {
			setVariant({
				...variant,
				id: `${index}_${variant.name}`,
				selected: {
					...option
				}
			})
		} else {
			setVariant({
				...option,
				id: `${index}_${option.name}`,
				selected: {
					...option
				}
			})
		}
	}

	useEffect(() => {
		const handlePopState = () => {
			if (isOpen) {
				closeCart()
			}
		}

		window.addEventListener("popstate", handlePopState)

		return () => {
			window.removeEventListener("popstate", handlePopState)
		}
	}, [closeCart, isOpen])

	useEffect(() => {
		if (isOpen) {
			window.history.pushState({ drawer: true }, "")
		}
	}, [isOpen])

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
		/* TODO: add condition */
		if (true) {
			return (
				<Box sx={{ display: "flex" }}>
					{getVegIcon()}
					{getNonVegIcon()}
				</Box>
			)
		}
	}

	return (
		<>
			<Drawer
				anchor="bottom"
				open={isOpen}
				onClose={closeCart}
				sx={{ zIndex: 1500, position: "relative" }}
			>
				<Box sx={{ marginLeft: "auto" }} mr={1}>
					<IconButton
						onClick={closeCart}
						sx={{
							color: "#000",
							borderRadius: "50%",
							zIndex: 1
						}}
					>
						<CloseIcon fontSize="small" />
					</IconButton>
				</Box>

				<Box sx={{ background: "transparent" }}>
					<Box>
						{prdDetails?.image && (
							<Box
								sx={{
									border: "1px solid lightgrey",
									borderRadius: "5px",
									height: "200px",
									position: "relative"
								}}
								m={1}
							>
								<Image
									fill
									src={prdDetails?.image}
									alt="App Logo"
									style={{ objectFit: "cover" }}
									priority
								/>
							</Box>
						)}

						<Box m={1}>
							<Box sx={{ display: "flex", alignItems: "flex-start" }}>
								{getProductType()}

								<Typography variant="SPP_Caption" color="secondary" ml={1}>
									{selectedProduct?.name}
								</Typography>
							</Box>
							<Typography mt={1} variant="SPP_Body_2" color="secondary" ml={3}>
								{selectedProduct?.description}
							</Typography>

							<Typography mt={1} variant="SPP_Body_2" color="secondary" ml={3}>
								Rs.{prdDetails && prdDetails?.price}
							</Typography>
						</Box>
					</Box>

					<Box
						sx={{
							display: "flex",
							justifyContent: "end",
							alignItems: "center"
						}}
						p={1}
					>
						<Button
							onClick={() => onClickAdd(variant)}
							variant="contained"
							color="primary"
							type="submit"
						>
							Add to cart
						</Button>
					</Box>
				</Box>
			</Drawer>
		</>
	)
}

export default React.memo(AddToCartDrawer)
