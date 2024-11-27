import { useCart, useWhatsapp } from "@mcc/context"
import { Button } from "@mui/material"
import { getValue, getVariant } from "./utils"
import { useContext } from "react"
import { isSafeArray } from "@mcc/helpers/utils"

function WhatsappConfirmComponent({ checkDisabled = false }) {
	const { products, userAddress, userOptions } = useCart()
	const {
		appliedDiscount,
		passFiftyDiscount,
		greenpassCoupon,
		pickup,
		offerCode,
		couponCode
	} = useWhatsapp

	const { name, phone, addressLine1, addressLine2, comment } = userAddress
	const { dontSendCutlery, dontSendNapkins } = userOptions

	const handleConfirm = () => {
		let message = `/******** NEW ORDER ********/\n`
		isSafeArray(products) &&
			products.forEach((item) => {
				const { itemName, quantity, variant } = item
				message =
					message +
					`${itemName} - (${getVariant(variant)}) - ${getValue(
						variant
					)} X *${quantity} Qty*` +
					"\n"
			})

		if (comment) {
			message += `\n*Comment* - ${comment} \n`
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

			// if (cashbackAmt) {
			// 	message += `**Cashback** (credited in wallet) - Rs.${cashbackAmt}\n`
			// }
		}

		// Coupon code
		if (offerCode) {
			message += `\n*Coupon code* - ${offerCode} \n`
		}

		// Add address
		if (name || addressLine1 || addressLine2 || phone)
			message += `\n${name}\n${phone}\n`

		if (addressLine1) {
			message += `${addressLine1}`
			if (addressLine2) {
				message += `, ${addressLine2}`
			}
		}

		// Handle pickup
		if (pickup) {
			message += `\n*SELF PICKUP*\n`
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
		const whatsappUrl = `https://wa.me/919324995221?text=${encodedMessage}`
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
