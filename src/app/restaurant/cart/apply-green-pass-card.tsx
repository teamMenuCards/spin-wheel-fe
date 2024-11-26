import { Card, Box, Link, styled, Typography } from "@mui/material"
import NextLink from "next/link"
import { useContext } from "react"
import { WhatsappMssgContext } from "@spp/context/whatsapp-context/WhatsappMssgProvider"
import IcDiscount from "@spp/icons/discount.svg"

function ApplyGreenPass({ coupon }) {
	const { setGreenpassCoupon, setPassFiftyDiscount } =
		useContext(WhatsappMssgContext)

	const StyledContainer = styled(Card)(() => ({
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "8px 15px"
	}))

	const ApplyCouponBox = styled(Box)(() => ({
		backgroundColor: "white",
		display: "flex",
		alignItems: "center",
		borderRadius: "10px"
	}))
	const handleRemove = (e) => {
		console.log("handleRemove--", handleRemove)
		e.preventDefault() // Prevent the default link behavior
		e.stopPropagation() // Prevent the click event from propagating to the Link

		setGreenpassCoupon(0)
		setPassFiftyDiscount("")
	}

	const getTitle = () => {
		return (
			<Typography
				variant="SPP_Caption"
				mr={2}
				style={{ fontWeight: 700 }}
				color="secondary"
			>
				Apply discount
				<Typography
					color="secondary"
					variant="SPP_Caption"
					style={{ fontSize: 12 }}
				>
					(GreenPass member)
				</Typography>
			</Typography>
		)
	}

	return (
		// <Link href="/green-pass-coupons" component={NextLink} underline="none">
		<StyledContainer>
			<ApplyCouponBox>
				<IcDiscount />

				<Typography variant="SPP_Caption" ml={1} style={{ fontWeight: 700 }}>
					{!!coupon ? `Applied discount worth Rs.${coupon}` : getTitle()}
				</Typography>
			</ApplyCouponBox>

			{!!coupon ? (
				<Typography variant="SPP_Caption" mr={2} onClick={handleRemove}>
					Remove
				</Typography>
			) : (
				<Link href="/green-pass-coupons" component={NextLink} underline="none">
					<Typography variant="SPP_Caption" mr={2}>
						Select
					</Typography>
				</Link>
			)}
		</StyledContainer>
		// </Link>
	)
}

export default ApplyGreenPass
