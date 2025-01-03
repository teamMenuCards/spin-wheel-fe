"use client"
import { Box, Typography, Link } from "@mui/material"
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import useMenu from "@mcc/hooks/useMenu"
import MenuItem from "./menu-item"
import Loading from "@mcc/app/loading"
import React, { useCallback, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { isSafeArray } from "@mcc/helpers/utils"
import FloatingMenu from "./floating-menu"
import dynamic from "next/dynamic"
import { useCart } from "@mcc/context"
import { useSnackbar } from "@mcc/context"
import NextLink from "next/link"
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight"

const key = "ADDED_FIRST_ITEM"

const AddToCartDrawer = dynamic(() => import("./add-to-cart-drawer"))

function App() {
	const { rid } = useParams()
	const { showSnackbar } = useSnackbar()

	const {
		addProduct,
		selectedProduct = {},
		closeCart,
		cartValue,
		products,
		total
	} = useCart()

	const {
		menuData: { data } = {},
		isLoadingMenu,
		menuError
	} = useMenu(rid as string)

	const [currentCategory, setCurrentCategory] = useState<string | undefined>(
		undefined
	)

	const getMssg = useCallback((count) => {
		if (count > 1) {
			return "Items added"
		}
		return "Item added"
	}, [])

	useEffect(() => {
		if (products.length) {
			const count = total.productQuantity

			showSnackbar({
				message: (
					<>
						<Link
							href={"/cart"}
							component={NextLink}
							underline="none"
							color="white"
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								padding: 5
							}}
						>
							<Box
								style={{ display: "flex", alignItems: "center", width: "100%" }}
							>
								<Typography
									variant="SPP_H5"
									color="primary.contrastText"
									style={{ width: "100%" }}
								>
									{`${count} ${getMssg(count)}`}
								</Typography>
								<ArrowCircleRightIcon fontSize="small" color="inherit" />
							</Box>
							{/* Optional second line */}
							{/* <Typography variant="SPP_H6" color="primary.contrastText">
							{getSnackbarMssg(cartValue)}
						</Typography> */}
						</Link>
					</>
				),
				variant: "success"
			})
		}
	}, [products.length, cartValue])

	// Clear localStorage on page refresh
	useEffect(() => {
		const handleBeforeUnload = () => {
			localStorage.removeItem(key)
		}

		window.addEventListener("beforeunload", handleBeforeUnload)

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload)
		}
	}, [])

	if (isLoadingMenu) {
		return <Loading />
	}

	if (menuError) {
		return (
			<>
				<Typography>Unable to load data</Typography>
			</>
		)
	}

	const handleAddToCart = (variant) => {
		addProduct({
			...selectedProduct,
			quantity: 1,
			variant
		})

		closeCart()
	}

	return (
		<>
			{/* List Menu main content */}
			<Box mb={8} id="mainMenu" key="mainMenu">
				{isSafeArray(data.categories) &&
					data.categories.map((item) => {
						const categoryId = item.id
						return (
							<Box
								key={categoryId}
								id={categoryId}
								data-category-id={categoryId}
							>
								<Accordion defaultExpanded elevation={0}>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls={`${categoryId}-content`}
										id={categoryId}
										style={{ fontWeight: "bold" }}
										onClick={() => setCurrentCategory(categoryId)}
									>
										{item.display_name}
									</AccordionSummary>
									<AccordionDetails>
										{item.products.map((prd) => {
											return <MenuItem product={prd} key={prd.id} />
										})}
									</AccordionDetails>
								</Accordion>
							</Box>
						)
					})}
			</Box>
			{isSafeArray(data?.categories) && (
				<FloatingMenu
					categories={data.categories}
					currentCategory={currentCategory}
				/>
			)}

			<AddToCartDrawer onClickAdd={handleAddToCart} />
		</>
	)
}

export default App
