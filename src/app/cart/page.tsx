"use client"
import {
	Toolbar,
	Link,
	Button,
	FormControlLabel,
	IconButton,
	Checkbox,
	Box,
	Typography,
	styled
} from "@mui/material"
import { useEffect, useState } from "react"
import { useCart } from "@mcc/context"
import ProductCard from "./product-card"
import NextLink from "next/link"
import Navbar from "../../fragments/NavBar"
import ApplyCouponCard from "./apply-coupon-card"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { useSnackbar, useConfetti, useWhatsapp } from "@mcc/context"
import CompleteMealCards from "./complete-meal"
import { useRouter } from "next/navigation"
import { isSafeArray } from "@mcc/helpers/utils"
import Popup from "@mcc/components/elements/Popup"
import { PATHS } from "@mcc/services/paths"

const StyledPopUp = styled(Popup)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	zIndex: "1000",

	"& .mui-146xnm7-MuiPaper-root-MuiDialog-paper": {
		margin: 0,
		top: 0
	}
}))

const ButtonBox = styled(Box)(() => ({
	width: "100%",
	position: "sticky",
	bottom: 0,
	backgroundColor: "white",
	display: "flex",
	flexDirection: "column"
}))

const StyledContainer = styled(Box)(() => ({
	backgroundColor: "whiteSmoke",
	width: "100%",
	height: "100vh",
	display: "flex",
	flexDirection: "column",
	position: "relative"
}))

function CartPage() {
	const router = useRouter()

	const { products, userOptions, setUserOptions, setCartValue } = useCart()
	const { hideSnackbar } = useSnackbar()
	const { showConfetti } = useConfetti()

	const {
		cashbackAmt,
		appliedDiscount,
		passFiftyDiscount,
		couponCode,
		greenpassCoupon,
		pickup,
		setPickup,
		setCashback
	} = useWhatsapp()

	const [showModal, setShowModal] = useState(false)

	const discountValue = couponCode || greenpassCoupon
	let width = "",
		height = ""

	if (typeof window !== "undefined") {
		width = window.innerWidth
		height = window.innerHeight
	}

	useEffect(() => {
		/* Hide snackbar for cart page */
		hideSnackbar()
	}, [])

	useEffect(() => {
		// if (products && products?.length) {
		const sum = 0
		// /* check if variants */
		// products.forEach((prod) => {
		// 	const hasVariant = prod?.variant?.selected
		// 	if (hasVariant) {
		// 		sum += hasVariant?.value * prod?.quantity
		// 	} else {
		// 		sum += prod?.variant?.value * prod?.quantity
		// 	}
		// })
		// setCartValue(sum)
		// const cb = Math.floor(Number(0.1 * Number(sum)))
		// setCashback(cb)
		// }
	}, [products])

	useEffect(() => {
		if (discountValue) {
			showConfetti()
			setTimeout(() => {
				setShowModal(!showModal)
			}, 1000)
		}
	}, [discountValue])

	useEffect(() => {
		/* This is for avoiding page reload, on click of phone's back btn */
		const handlePopState = (event) => {
			event.preventDefault()
			router.push("/dashboard") // Programmatically navigate
		}

		window.addEventListener("popstate", handlePopState)
		window.history.pushState(null, document.title, window.location.href)

		return () => {
			window.removeEventListener("popstate", handlePopState)
		}
	}, [router])

	const goBackBtn = () => {
		return (
			<Button
				style={{ width: "100%" }}
				variant="contained"
				color="primary"
				type="submit"
			>
				<Link
					href={"/dashboard"}
					component={NextLink}
					underline="none"
					color="white"
				>
					Go Back
				</Link>
			</Button>
		)
	}

	const getButton = ({ link, text }) => {
		return (
			<Button
				style={{ width: "100%" }}
				variant="contained"
				color="primary"
				type="submit"
			>
				<Link href={link} component={NextLink} underline="none" color="white">
					{text}
				</Link>
			</Button>
		)
	}

	const getButtonValue = () => {
		if (isSafeArray(products)) {
			return getButton({ link: "/address", text: "Proceed to add Address" })
		} else {
			/* IF CART IS EMPTY */
			return goBackBtn()
		}
	}

	const handleChange = (event) => {
		const { name, checked } = event.target

		setUserOptions((prevFormData: any) => ({
			...prevFormData,
			[name]: checked
		}))
	}

	const handlePickup = () => {
		setPickup(!pickup)
	}

	return (
		<>
			<StyledContainer p={1}>
				<Navbar backLink={PATHS.dashboard} />

				<Box component="main" sx={{ flex: 1 }}>
					<Toolbar />

					<Box
						sx={{ backgroundColor: "white", borderRadius: "10px", flex: 1 }}
						p={1}
					>
						{isSafeArray(products) ? (
							products.map((item: any, index) => {
								const last = index == products.length - 1
								return (
									<Box key={item.id} mb={last ? 0 : 2}>
										<ProductCard product={item} />
									</Box>
								)
							})
						) : (
							<Box>
								<Typography>Your cart is empty!!</Typography>
							</Box>
						)}
					</Box>

					{/* Apply couppons card */}
					{products?.length ? (
						<Box mt={1}>
							<ApplyCouponCard coupon={couponCode || appliedDiscount} />
						</Box>
					) : null}

					{/* Complete meal cards */}
					<Box mt={1} sx={{ backgroundColor: "white" }} p={1}>
						<Typography variant="SPP_Caption" color={"red"} ml={2}>
							Get Extra 20% Off on Smoothies
						</Typography>
						<Typography
							variant="SPP_Caption"
							color={"red"}
							ml={2}
							mb={1}
							style={{ fontSize: 12 }}
						>
							(On cart value above Rs.249)
						</Typography>

						<CompleteMealCards />
					</Box>
				</Box>

				{/*********** Popup component - COUPONS **********/}
				{showModal && discountValue && (
					<StyledPopUp
						dialogProps={{
							open: showModal,
							onClose: () => {
								setShowModal(false)
							}
						}}
					>
						<div style={{ padding: "20px", textAlign: "center" }}>
							<IconButton
								sx={{
									margin: "auto",
									marginBottom: "5px"
								}}
							>
								<CheckCircleIcon color="primary" fontSize="large" />
							</IconButton>
							{/* </Box> */}
							<Typography variant="SPP_H4" color="secondary">
								Congratulations!
							</Typography>

							<Typography variant="SPP_H5" color="secondary">
								You Saved
							</Typography>

							<Typography variant="SPP_H3" color="secondary">
								{/* {`Rs.${Number(discountValue) + Number(cashbackAmt)}`} */}
								{`Rs.${Number(discountValue)}`}
							</Typography>

							<Typography variant="SPP_H6" color="secondary" mt={1}>
								Discount - Rs.{discountValue}
							</Typography>

							{/* <Typography variant="SPP_H6" color="secondary">
								Added Cashback - Rs.{cashbackAmt}
							</Typography> */}

							{/* <Typography
								variant="SPP_Caption"
								color="secondary"
								sx={{ color: "red" }}
								mt={3}
								px={1}
							>
								<span style={{ textDecoration: "underline" }}>Note </span> -
								Discount will be applicable only if you have cashback in your
								Greenbowl wallet
							</Typography> */}

							{/* <Typography mt={1} variant="SPP_Display_2" color="secondary">
								Terms & conditions applied
							</Typography> */}

							<Typography
								variant="SPP_Display_3"
								color="blue"
								mt={3}
								onClick={() => setShowModal(false)}
							>
								Wohoo. Thats Healthy Awesome!
							</Typography>
						</div>
					</StyledPopUp>
				)}

				<ButtonBox pt={1}>
					{/* {pickup && <CutleryCheckbox />} */}
					<FormControlLabel
						sx={{ marginBottom: "10px", paddingLeft: "5px" }}
						key="pickup"
						control={
							<Checkbox
								checked={pickup}
								onChange={handlePickup}
								name="pickup"
							/>
						}
						label={
							<Typography variant="SPP_Caption" color="secondary">
								I WILL PICKUP THE ORDER MYSELF
							</Typography>
						}
						style={{ height: "20px" }}
					/>

					{getButtonValue()}
				</ButtonBox>
			</StyledContainer>
		</>
	)
}

export default CartPage
