"use client"

import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"
// import { useSubmitRestaurantFeedbackMutation } from "@/services/feedback/get-feedback"
import { submitRestaurantFeedback } from "@/services/submitFeedback"
import { useState } from "react"
import { IPayload } from "./types"

const ThankYouPage = ({
	rname,
	reason,
	comment = "No subreason",
	restaurantInfo,
	redirect
}: {
	rname: string
	reason: string
	comment?: string
	redirect?: string
	restaurantInfo: RestaurantDetailResponse | undefined
}) => {
	let payload = {} as IPayload
	const [name, setName] = useState("")
	const [phone, setPhone] = useState("")
	const [nameError, setNameError] = useState("")
	const [phoneError, setPhoneError] = useState("")
	const [submitted, setSubmitted] = useState(false)

	const whatsappNumber =
		restaurantInfo?.detail.details.wa_api_details?.wa_number

	// 👇 Validation functions
	const validateName = (name: string) => {
		if (!name.trim()) return "Please enter your name."
		if (name.trim().length < 2) return "Name must be at least 2 characters."
		if (!/^[A-Za-z\s]+$/.test(name.trim()))
			return "Only letters and spaces allowed."
		return ""
	}

	const validatePhone = (phone: string) => {
		if (!phone.trim()) return "Please enter your phone number."
		if (!/^\d{10}$/.test(phone))
			return "Phone number must be exactly 10 digits."
		return ""
	}

	const handleSubmit = async () => {
		/* Final submit of feedback */
		const nameErr = validateName(name)
		const phoneErr = validatePhone(phone)

		setNameError(nameErr)
		setPhoneError(phoneErr)

		if (nameErr || phoneErr) return

		const basePayload: IPayload = {
			apiKey: process.env.NEXT_PUBLIC_SERRI_API_KEY,
			campaignName: "negative_review_without_comment",
			destination: String(whatsappNumber),
			// destination: "917738540352",
			userName: rname,
			templateParams: [rname, name, phone, reason],
			source: "new-landing-page form",
			media: {},
			buttons: [],
			carouselCards: [],
			location: {},
			attributes: {}
		}

		if (comment) {
			payload = {
				...basePayload,
				campaignName: "negative_review_2",
				templateParams: [rname, name, phone, reason, comment],
				paramsFallbackValue: {
					SubReason: comment ?? "No subreason"
				},
				buttons: []
			} as IPayload
		} else {
			payload = basePayload
		}

		try {
			const res = await submitRestaurantFeedback(payload)
			console.log("Feedback submitted successfully", res)
			setSubmitted(true)
		} catch (err) {
			console.error("Failed to submit feedback", err)
			alert("Something went wrong. Please try again later.")
		}
	}

	const isFormValid = !validateName(name) && !validatePhone(phone)

	//

	return (
		<div className="flex items-center justify-center bg-gray-50  flex-col">
			<div className="bg-white w-full max-w-sm  text-center relative p-6 pb-0">
				{submitted ? (
					<div className="pb-6">
						<h2 className="text-xl text-black font-semibold mb-5">
							Thanks for your feedback
						</h2>

						<a
							href={redirect}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-blue-600 underline hover:text-blue-800 transition"
						>
							Go to Google reviews
						</a>
						<p className="text-sm mt-4 font-medium text-gray-800">
							Do visit us again{" "}
							{/* <span className="inline-block animate-bounce">🤝</span> */}
						</p>
					</div>
				) : (
					<>
						<h2 className="text-xl font-bold text-gray-800">
							We regret your experience with us 😔
						</h2>
						<p className="text-sm text-gray-600">
							<br />
							Can we get in touch to make things right?
						</p>

						<div className="h-[75px]">
							<input
								type="text"
								placeholder="eg. Anika Sharma"
								value={name}
								onChange={(e) => {
									const val = e.target.value
									setName(val)
									setNameError(validateName(val))
								}}
								className="w-full mb-1 mt-4 px-4 py-2 border border-gray-300 rounded text-sm text-black"
							/>
							{nameError && (
								<p className="text-xs text-red-600 text-left mb-2">
									{nameError}
								</p>
							)}
						</div>

						<div className="h-[75px]">
							<input
								type="text"
								placeholder="10-digit mobile"
								value={phone}
								onChange={(e) => {
									const val = e.target.value
									setPhone(val)
									setPhoneError(validatePhone(val))
								}}
								className="w-full mb-1 px-4 py-2 border border-gray-300 rounded text-sm text-black"
							/>
							{phoneError && (
								<p className="text-xs text-red-600 text-left mb-2">
									{phoneError}
								</p>
							)}
						</div>

						<p className="text-xs text-gray-500 mt-2 mb-2">
							We&apos;ll only use these details to address today&apos;s issue —
							never for spam.
						</p>
					</>
				)}
			</div>

			{!submitted && (
				<div className="sticky bottom-0 p-2 bg-white w-full">
					<button
						onClick={handleSubmit}
						disabled={!isFormValid}
						className={`w-full py-2 rounded font-semibold text-sm text-white transition ${
							isFormValid
								? "bg-red-600 hover:bg-red-700"
								: "bg-red-300 cursor-not-allowed"
						}`}
					>
						Submit
					</button>
				</div>
			)}
		</div>
	)
}

export default ThankYouPage
