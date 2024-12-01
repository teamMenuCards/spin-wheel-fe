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
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { useSnackbar, useConfetti, useWhatsapp } from "@mcc/context"
import { useRouter } from "next/navigation"
import { isSafeArray } from "@mcc/helpers/utils"
import Popup from "@mcc/components/elements/Popup"
import { PATHS } from "@mcc/services/paths"
import WhatsappConfirmComponent from "./whatsapp-confirm-btn"

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

	const { couponCode, greenpassCoupon } = useWhatsapp()

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

				{/* <ButtonBox pt={1}>{getButtonValue()}</ButtonBox> */}
				<WhatsappConfirmComponent />
			</StyledContainer>
		</>
	)
}

export default CartPage
