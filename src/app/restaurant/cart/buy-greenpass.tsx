import { Card, Box, Link, styled, Typography } from "@mui/material"
import NextLink from "next/link"
import { useContext } from "react"
import { WhatsappMssgContext } from "@spp/context/whatsapp-context/WhatsappMssgProvider"
import IcDiscount from "@spp/icons/discount.svg"

function ApplyGreenPass() {
	const { setGreenpassCoupon, setAppliedDiscount } =
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

	return (
		<NextLink
			href={{
				pathname: "/green-pass-banner",
				query: { backLink: "/cart" } // Pass the coupon as a query parameter
			}}
			passHref
		>
			<Link underline="none">
				<StyledContainer>
					<ApplyCouponBox>
						<IcDiscount />

						<Box>
							<Typography
								color="secondary"
								variant="SPP_Caption"
								ml={1}
								style={{ fontWeight: 700 }}
							>
								Buy GreenPass
							</Typography>

							<Typography
								color="secondary"
								variant="SPP_Caption"
								ml={1}
								style={{ fontWeight: 700, fontSize: 12 }}
							>
								Save upto Rs.50 on each order
							</Typography>
						</Box>
					</ApplyCouponBox>

					<Typography variant="SPP_Caption" mr={2}>
						Select
					</Typography>
				</StyledContainer>
			</Link>
		</NextLink>
	)
}

export default ApplyGreenPass
