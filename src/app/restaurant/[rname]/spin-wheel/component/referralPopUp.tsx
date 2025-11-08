import React, { useState, useRef } from "react"
import Image from "next/image"

interface Props {
	onSubmit: (selectedOptions: string, otherText?: string) => void
	onClose?: () => void
	discountValue?: number | string
}

const options = [
	"Friends & Family",
	"XYZ Blooger",
	"Walk in",
	"Google Search",
	"Others"
]

const ReferralPopup: React.FC<Props> = ({ onSubmit, onClose, discountValue }) => {
	const [selected, setSelected] = useState("")
	const [otherText, setOtherText] = useState("")

	const handleSubmit = () => {
		if (!selected) return
		onSubmit(selected, otherText)
	}

	const handleOptionChange = (option: string) => {
		if (option === selected) {
			setSelected("") 
		} else {
			setSelected(option)
			if (option !== "Others") {
				setOtherText("") 
			}
		}
	}

	const modalRef = useRef<HTMLDivElement>(null)

	// Handle outside click
	const handleOutsideClick = (e: React.MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
			if (onClose) {
				onClose()
			}
		}
	}

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
			onClick={handleOutsideClick}
		>
			<div
				ref={modalRef}
				className="bg-white rounded-2xl shadow-2xl text-black relative max-w-md w-full mx-4 overflow-hidden"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Background decorative gradient */}
				<div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 opacity-30"></div>
				
				<div className="relative z-10 p-6 sm:p-8">
					{/* Close button */}
					<button
						onClick={onClose}
						className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 text-2xl w-8 h-8 flex items-center justify-center rounded-full shadow-sm transition-colors"
					>
						&times;
					</button>

					{/* Congratulations Section */}
					<div className="text-center mb-6 space-y-2">
						<h2 className="text-3xl sm:text-4xl font-bold text-black">
							Congratulations
						</h2>
						<div className="flex items-center justify-center gap-2">
							<p className="text-2xl sm:text-3xl font-bold text-black">
								You Saved {discountValue} %
							</p>
							<span className="text-3xl">🥳</span>
						</div>
					</div>

					{/* Gift Box Illustration */}
					<div className="flex justify-center mb-6 relative">
						<Image
							src="/giftboxopen.png"
							alt="Celebration gift"
							width={120}
							height={120}
							className="object-contain drop-shadow-lg"
						/>
					</div>

					{/* Survey Question */}
					<h3 className="text-lg sm:text-xl font-bold text-black mb-4 text-left">
						How did you come to know about us ?
					</h3>

					{/* Options List */}
					<div className="space-y-3 mb-4">
						{options.map((option) => (
							<label
								key={option}
								className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
							>
								<input
									type="radio"
									name="referral-source"
									checked={selected === option}
									onChange={() => handleOptionChange(option)}
									className="w-5 h-5 border-2 border-gray-300 rounded cursor-pointer text-pink-500 focus:ring-2 focus:ring-pink-200 focus:ring-offset-2"
									style={{
										accentColor: '#ec4899',
									}}
								/>
								<span className="text-base text-black flex-1">{option}</span>
							</label>
						))}
					</div>

					{/* Others Input Field */}
					{selected === "Others" && (
						<div className="mb-4">
							<input
								type="text"
								placeholder="Please specify..."
								value={otherText}
								onChange={(e) => setOtherText(e.target.value)}
								className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-black placeholder-gray-400"
							/>
						</div>
					)}

					{/* Submit Button */}
					<button
						onClick={handleSubmit}
						disabled={!selected || (selected === "Others" && !otherText.trim())}
						className="w-full bg-[#E91E63] hover:bg-[#C2185B] disabled:bg-gray-300 disabled:hover:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 disabled:cursor-not-allowed"
					>
						Submit & Claim discount
					</button>
				</div>
			</div>
		</div>
	)
}

export default ReferralPopup
