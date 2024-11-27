import { Card, Box, styled, Link, Typography } from "@mui/material"
import NextLink from "next/link"
import IcDiscount from "@mcc/icons/other/discount.svg"
import { useWhatsapp } from "@mcc/context"
import "../style.css"

const ApplyCouponCard = ({ coupon }) => {
	const { setAppliedDiscount, setCouponcode } = useWhatsapp()

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
		e.preventDefault() // Prevent the default link behavior
		e.stopPropagation() // Prevent the click event from propagating to the Link

		setCouponcode(0)
		setAppliedDiscount("")
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
			</Typography>
		)
	}
	return (
		<>
			{/* <Link href="/coupons" component={NextLink} underline="none"> */}
			<StyledContainer>
				<ApplyCouponBox>
					{/* <IcDiscount /> */}

					<Typography variant="SPP_Caption" ml={1}>
						{!!coupon ? `Applied discount worth Rs.${coupon}` : getTitle()}
					</Typography>
				</ApplyCouponBox>

				{!!coupon ? (
					<Typography variant="SPP_Caption" mr={2} onClick={handleRemove}>
						Remove
					</Typography>
				) : (
					<Link href="/coupons" component={NextLink} underline="none">
						<Typography variant="SPP_Caption" mr={2}>
							Select
						</Typography>
					</Link>
				)}
			</StyledContainer>
			{/* </Link> */}
		</>
	)
}

export default ApplyCouponCard
