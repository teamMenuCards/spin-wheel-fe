"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import NavBar from "../menu/components/NavBar"
import { validateName, validatePhone } from "@/lib/utils"
import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"
import { IPayload } from "../components/types"
import { submitRestaurantFeedback } from "@/services/submitFeedback"
import { useSnackbar } from "@/app/providers/SnackbarProvider"

const reasonList = [
	"Compliment",
	"Bulk order/ Catering",
	"Complaint",
	"Job enquiry",
	"Special request",
	"Billing / Refund"
	// "Other"
]

function ContactOwner({
	restaurantInfo,
	rname
}: {
	restaurantInfo: RestaurantDetailResponse
	rname: string
}) {
	const otherRef = useRef<HTMLDivElement | null>(null)
	const router = useRouter()
	const { showSnackbar } = useSnackbar()

	const [name, setName] = useState("")
	const [phone, setPhone] = useState("")
	const [nameError, setNameError] = useState("")
	const [phoneError, setPhoneError] = useState("")
	const [reason, setReason] = useState("")
	const [comment, setComment] = useState("")
	const [commentError, setCommentError] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)

	// const whatsappNumber =
	// 	restaurantInfo?.detail.details.wa_api_details?.wa_number

	const { phone_no } = restaurantInfo?.detail

	const handleSubmit = async () => {
		if (isSubmitting) return
		setIsSubmitting(true)

		const payload: IPayload = {
			apiKey: process.env.NEXT_PUBLIC_SERRI_API_KEY,
			campaignName: "reach_owner",
			destination: String(phone_no),
			userName: rname,
			templateParams: [name, phone, reason],
			source: "new-landing-page form",
			media: {},
			buttons: [],
			carouselCards: [],
			location: {},
			attributes: {}
		}

		try {
			await submitRestaurantFeedback(payload)
			showSnackbar(<div>Your message has been sent!</div>, 3000)
			router.push(`/restaurant/${rname}/dine-in`)
		} catch (err) {
			console.error("Feedback submission failed", err)
			showSnackbar(<div>Failed to send message. Try again later!</div>, 3000)
		} finally {
			setIsSubmitting(false)
		}
	}

	useEffect(() => {
		if (reason === "Other" && otherRef.current) {
			otherRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
		}
	}, [reason])

	const disableSubmit =
		validateName(name) !== "" ||
		validatePhone(phone) !== "" ||
		reason === "" ||
		(reason === "Other" && comment.trim() === "")

	return (
		<div className="flex flex-col h-[90vh]">
			<NavBar
				link={`/restaurant/${rname}/dine-in`}
				showCart={false}
				rname={rname}
				restaurantInfo={restaurantInfo}
			/>

			<div className="flex-1 p-4">
				<p className="text-center font-semibold text-black">Contact owner</p>
				{/* Name input */}
				<div className="h-[77px]">
					<input
						type="text"
						placeholder="eg. Anika Sharma"
						value={name}
						onChange={(e) => {
							const val = e.target.value
							setName(val)
							setNameError(validateName(val))
						}}
						className="w-full mb-1 mt-4 px-4 py-2 border border-gray-300 rounded text-base text-black"
					/>
					{nameError && (
						<p className="text-xs text-red-600 text-left mb-2">{nameError}</p>
					)}
				</div>

				{/* Phone input */}
				<div className="h-[77px]">
					<input
						type="text"
						placeholder="10-digit mobile"
						value={phone}
						onChange={(e) => {
							const val = e.target.value
							setPhone(val)
							setPhoneError(validatePhone(val))
						}}
						className="w-full mb-1 px-4 py-2 border border-gray-300 rounded text-base text-black"
					/>
					{phoneError && (
						<p className="text-xs text-red-600 text-left mb-2">{phoneError}</p>
					)}
				</div>

				<p className="my-3 text-gray-700">Can you choose the reason?</p>

				<div className="flex flex-wrap gap-2 mb-4 justify-left">
					{reasonList.map((item) => (
						<button
							key={item}
							onClick={() => {
								setReason(item)
								if (item !== "Other") setComment("")
								setCommentError("")
							}}
							className={`px-4 py-1 rounded-full border transition-all ${
								reason === item
									? "bg-red-600 text-white"
									: "bg-gray-100 text-gray-800 hover:bg-gray-200"
							}`}
						>
							{item}
						</button>
					))}
				</div>

				{/* Conditional textarea */}
				{reason === "Other" && (
					<div className="mb-4 w-full text-left" ref={otherRef}>
						<textarea
							className="w-full border rounded p-2 text-base text-gray-800"
							rows={3}
							placeholder="Please share the reason..."
							value={comment}
							onChange={(e) => {
								setComment(e.target.value)
								setCommentError("")
							}}
						/>
						{commentError && (
							<p className="text-xs text-red-600 mt-1">{commentError}</p>
						)}
					</div>
				)}
			</div>

			{/* Bottom aligned Submit button */}
			<div className="p-4 border-t bg-white">
				<button
					className={`w-full px-4 py-2 rounded font-semibold ${
						disableSubmit || isSubmitting
							? "bg-gray-300 text-gray-500 cursor-not-allowed"
							: "bg-red-600 text-white hover:bg-red-700"
					}`}
					onClick={handleSubmit}
					disabled={disableSubmit || isSubmitting}
				>
					{isSubmitting ? "Sending..." : "Submit →"}
				</button>
			</div>
		</div>
	)
}

export default ContactOwner
