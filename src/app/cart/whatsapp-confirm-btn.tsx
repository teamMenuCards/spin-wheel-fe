import { useCart, useRestaurantDetails, useWhatsapp } from "@mcc/context"
import { Button } from "@mui/material"
import { isSafeArray } from "@mcc/helpers/utils"

function WhatsappConfirmComponent({ checkDisabled = false }) {
	const { products, userOptions } = useCart()
	const {
		appliedDiscount,
		passFiftyDiscount,
		greenpassCoupon,
		offerCode,
		couponCode
	} = useWhatsapp()

	const { dontSendCutlery, dontSendNapkins } = userOptions

	const { restaurantDetails } = useRestaurantDetails()

	const handleConfirm = () => {
		let message = `/******** NEW ORDER ********/\n`

		if (isSafeArray(products)) {
			products.forEach((item) => {
				const { name, quantity, variants } = item

				message =
					message +
					`${name} - Rs.${variants[0].price} X *${quantity} Qty*` +
					"\n"
			})
		}

		// Add cashbacks
		if (appliedDiscount || couponCode || greenpassCoupon || passFiftyDiscount) {
			message += "\n***Cashbacks***\n"

			if (appliedDiscount || couponCode) {
				message += `*Discount* (from cashback wallet) - Rs.${
					appliedDiscount || couponCode
				}\n`
			} else if (passFiftyDiscount || greenpassCoupon) {
				message += `*GreenPass Member Extra Discount* (from cashback wallet) - Rs.${
					passFiftyDiscount || greenpassCoupon
				}\n`
			}
		}

		// Coupon code
		if (offerCode) {
			message += `\n*Coupon code* - ${offerCode} \n`
		}

		message += `\n`

		if (dontSendCutlery || dontSendNapkins) {
			message =
				message +
				"\n" +
				`***Note***` +
				"\n" +
				(dontSendCutlery ? `Do not send cutlery & napkins` + "\n" : "") +
				(dontSendNapkins ? `Do not send Brown bag` + "\n" : "")
		}

		const encodedMessage = encodeURIComponent(message)
		const whatsappUrl = `https://wa.me/${restaurantDetails?.detail?.phone_no}?text=${encodedMessage}`
		window.open(whatsappUrl, "_blank")
	}

	return (
		<Button
			style={{ width: "100%" }}
			onClick={handleConfirm}
			variant="contained"
			color="primary"
			type="submit"
			disabled={checkDisabled}
		>
			Confirm over whatsapp
		</Button>
	)
}

export default WhatsappConfirmComponent
