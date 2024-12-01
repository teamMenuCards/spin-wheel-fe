"use client"
import {
	Toolbar,
	Button,
	Link,
	TextField,
	Typography,
	IconButton,
	styled,
	Box
} from "@mui/material"
import Navbar from "@mcc/fragments/NavBar"
import Card from "./card"
import { useCart, useWhatsapp } from "@mcc/context"
import Popup from "@mcc/components/elements/Popup"
import { useState, useRef } from "react"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { useRouter } from "next/navigation"
import NextLink from "next/link"
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

const StyledContainer = styled(Box)(({ theme }) => ({
	backgroundColor: "whiteSmoke",
	width: "100%",
	height: "100vh",
	display: "flex",
	flexDirection: "column",
	position: "relative"
}))

function Coupons() {
	const router = useRouter()
	const { cartValue } = useCart()
	const [couponSuccess, setCouponSuccess] = useState(false)
	const [openOffer, setOpenOffer] = useState(false)
	const {
		setAppliedDiscount,
		setGreenpassCoupon,
		setPassFiftyDiscount,
		setCouponcode,
		offerCode,
		setOfferCode
	} = useWhatsapp
	const inputRef = useRef(null)

	const optionsList = [
		{
			label: "10% off upto 15rs on orders above 149",
			name: "t1",
			value: 15,
			id: "0",
			active: cartValue > 149
		},
		{
			label: "15% off upto 20rs on orders above 199",
			name: "t2",
			value: 25,
			id: "1",
			active: cartValue > 199
		},
		{
			label: "15% off upto 25rs on orders above 249",
			name: "t3",
			value: 25,
			id: "2",
			active: cartValue > 249
		},
		{
			label: "20% off upto 35rs on orders above 349",
			name: "t4",
			value: 35,
			id: "3",
			active: cartValue > 349
		},
		{
			label: "30% off upto 45rs on orders above 499",
			name: "t5",
			value: 45,
			id: "4",
			active: cartValue > 499
		}
	]

	/* Called when any discount card is selected other than 50% off card */
	const handleSendData = (value) => {
		setCouponcode(value)

		// reset values of greenpass coupon
		setGreenpassCoupon(0)
		setPassFiftyDiscount("")
		router.push("/cart")
	}

	const openFiftypercentOfferFn = () => {
		setOpenOffer(true)
	}

	const handleCouponCode = (event) => {
		const { value } = event.target
		/* to see the code entered */
		setOfferCode(value)

		/* reset other coupon discount */
		setCouponcode(0)
		setGreenpassCoupon(0)
		setPassFiftyDiscount("")
	}

	const handleSubmitCoupon = () => {
		/* After user submits the coupon code, only then apply 50% discount */
		setCouponSuccess(true)
		const val = (Number(cartValue) / 2).toFixed(2)
		setAppliedDiscount(val)
	}

	return (
		<>
			<StyledContainer p={1}>
				<Navbar backLink={PATHS.cart} />

				<Box component="main" sx={{ flex: 1 }} px={1}>
					<Toolbar />

					{optionsList.map((item) => (
						<Box mt={2} key={item.id}>
							<Card
								onClick={() => handleSendData(item.value)}
								text={item.label}
								linkText="Apply discount"
								disabled={item.active}
								{...item}
							/>
						</Box>
					))}

					<Box mt={2}>
						<Card
							onClick={openFiftypercentOfferFn}
							bgColor="customColors.caramel"
							text="Get 20% off on your first order"
							linkText="Apply discount"
							disabled={true}
						/>
					</Box>
				</Box>

				{openOffer && (
					<StyledPopUp
						dialogProps={{
							open: openOffer,
							onClose: () => {
								if (couponSuccess) {
									setOpenOffer(false)
									router.push("/cart")
								}
								setOpenOffer(false)
							}
						}}
					>
						{couponSuccess ? (
							<div style={{ padding: "20px", textAlign: "center" }}>
								<IconButton
									sx={{
										margin: "auto",
										marginBottom: "5px"
									}}
								>
									<CheckCircleIcon color="primary" fontSize="large" />
								</IconButton>
								<Typography variant="SPP_H4" color="secondary">
									Thanks for applying the code!
								</Typography>

								{/* <Typography variant="SPP_H5" color="secondary">
									You get 50% off on your first offer!
								</Typography> */}

								<Typography mt={1} variant="SPP_H6" color="secondary" mb={1}>
									Our team will verify & get back to you
								</Typography>

								<Button
									style={{ width: "100%" }}
									variant="contained"
									color="info"
									type="submit"
								>
									<Link
										href={"/cart"}
										component={NextLink}
										underline="none"
										color="white"
									>
										Okay. Proceed!
									</Link>
								</Button>
							</div>
						) : (
							<div style={{ padding: "20px", textAlign: "center" }}>
								<Typography variant="SPP_Caption" mb={2}>
									Enter coupon code on pamphlet
								</Typography>

								<TextField
									fullWidth
									label="Coupon Code"
									variant="outlined"
									name="offerCode"
									value={offerCode}
									onChange={handleCouponCode}
									inputRef={inputRef}
									error={!offerCode}
									helperText={!offerCode ? "Code cannot be blank" : ""}
								/>

								<Box mt={1}>
									<Button
										onClick={handleSubmitCoupon}
										variant="contained"
										color="primary"
										type="submit"
										disabled={!offerCode}
									>
										Submit
									</Button>
								</Box>
							</div>
						)}
					</StyledPopUp>
				)}
			</StyledContainer>
		</>
	)
}

export default Coupons
