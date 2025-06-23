"use client"
import { useState, useEffect, useRef } from "react"
import ThankYouPage from "./ThankyouPage"
import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"

const FeedbackPopup = ({
	rname,
	redirect,
	onClose,
	restaurantInfo
}: {
	rname: string
	redirect: string
	restaurantInfo?: RestaurantDetailResponse | undefined
	onClose: () => void
}) => {
	const otherRef = useRef<HTMLDivElement | null>(null)

	const [step, setStep] = useState(1)
	const [recommend, setRecommend] = useState("")
	const [reason, setReason] = useState("")
	const [showThankYou, setShowThankYou] = useState(false)
	const [formData, setFormData] = useState({
		name: "",
		phone: ""
	})
	const [comment, setComment] = useState("")
	const [commentError, setCommentError] = useState("")

	console.log(formData)

	const isPositive = recommend === "Yes! I will"

	const negativeReasons = [
		"Food was expensive",
		"Service was not up to the mark",
		"Food wasn’t tasty",
		"Slow service",
		"Ambiance was ok",
		"Other"
	]

	const reasons = isPositive ? [] : negativeReasons

	useEffect(() => {
		if (reason === "Other" && otherRef.current) {
			otherRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
		}
	}, [reason])

	const handleSubmit = () => {
		// Validate comment if "Other" is selected
		if (!isPositive && reason === "Other" && comment.trim().length === 0) {
			setCommentError("Please provide additional feedback.")
			return
		}

		if (isPositive) {
			window.location.href = redirect
		} else {
			setShowThankYou(true)
		}
	}

	const handleUserData = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }))
	}

	const disableSubmit =
		(!isPositive && reason === "") || // no reason selected
		(reason === "Other" && comment.trim() === "") // other is selected but comment missing

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center"
			onClick={onClose}
		>
			<div className="bg-white m-8 max-h-[500px] overflow-scroll rounded-xl max-w-md w-full p-6 text-center shadow-xl border border-gray-200 relative">
				<button
					className="absolute top-2 right-3 text-gray-500"
					onClick={onClose}
				>
					✕
				</button>

				{showThankYou ? (
					<ThankYouPage
						rname={rname}
						reason={reason}
						redirect={redirect}
						comment={comment}
						restaurantInfo={restaurantInfo}
						onChange={handleUserData}
					/>
				) : (
					<>
						<h2 className="text-lg font-bold text-gray-900 mb-1">
							Feedback Section
						</h2>
						<p className="text-sm text-gray-500 mb-4">Step {step} / 2</p>

						<p className="text-sm text-gray-800 mb-4">
							Will you visit us again or recommend us to your close friends?
						</p>

						<div className="flex flex-wrap gap-2 mb-4 justify-center">
							{["Yes! I will", "Not Sure"].map((option) => (
								<button
									key={option}
									onClick={() => {
										setRecommend(option)
										setReason("")
										setComment("")
										setStep(2)
										setCommentError("")
									}}
									className={`px-4 py-2 rounded-full border transition-all ${
										recommend === option
											? "bg-red-600 text-white"
											: "bg-gray-100 text-gray-800 hover:bg-gray-200"
									}`}
								>
									{option}
								</button>
							))}
						</div>

						{recommend && (
							<>
								{!isPositive && (
									<>
										<p className="mb-2 text-gray-700">
											That is sad. Can you choose the reason?
										</p>

										<div className="flex flex-wrap gap-2 mb-4 justify-center">
											{reasons.map((item) => (
												<button
													key={item}
													onClick={() => {
														setReason(item)
														if (item !== "Other") setComment("")
														setCommentError("")
													}}
													className={`px-4 py-2 rounded-full border transition-all ${
														reason === item
															? "bg-red-600 text-white"
															: "bg-gray-100 text-gray-800 hover:bg-gray-200"
													}`}
												>
													{item}
												</button>
											))}
										</div>

										{reason === "Other" && (
											<div className="mb-4 w-full text-left" ref={otherRef}>
												<textarea
													className="w-full border rounded p-2 text-sm text-gray-800"
													rows={3}
													placeholder="Please let us know what went wrong..."
													value={comment}
													onChange={(e) => {
														setComment(e.target.value)
														setCommentError("")
													}}
												/>
												{commentError && (
													<p className="text-xs text-red-600 mt-1">
														{commentError}
													</p>
												)}
											</div>
										)}
									</>
								)}
							</>
						)}

						<button
							className={`w-full px-4 py-2 rounded font-semibold ${
								disableSubmit
									? "bg-gray-300 text-gray-500 cursor-not-allowed"
									: "bg-red-600 text-white hover:bg-red-700"
							}`}
							onClick={handleSubmit}
							disabled={disableSubmit}
						>
							Submit →
						</button>
					</>
				)}
			</div>
		</div>
	)
}

export default FeedbackPopup
