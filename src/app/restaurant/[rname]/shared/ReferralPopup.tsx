import React, { useState, useRef } from "react"

interface Props {
	onSubmit: (selectedOptions: string) => void
	onClose?: () => void
}
const options = [
	"Friends & Family 🧑‍🤝‍🧑",
	"Social Media 📱",
	"Food Bloggers 📝",
	"Walk in 🚶‍♂️",
	"Other ✍️"
]

const ReferralPopup: React.FC<Props> = ({ onSubmit, onClose }) => {
	const [selected, setSelected] = useState("")

	const handleSubmit = () => {
		onSubmit(selected)
		/* if (onClose) {
			onClose()
		} */
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
			className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
			onClick={handleOutsideClick}
		>
			<div
				ref={modalRef}
				className="bg-white pt-12 pr-8 pb-4 pl-4 rounded-lg shadow-lg text-black relative"
			>
				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute top-1 right-4 bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-gray-900 text-xl w-8 h-8 flex items-center justify-center rounded-full shadow"
				>
					&times;
				</button>
				<h2 className="font-semibold text-center mb-4">
					How did you come to know about us?
				</h2>
				<div className="space-y-2">
					{options.map((option) => (
						<label key={option} className="flex items-center space-x-2">
							<input
								type="checkbox"
								checked={selected.includes(option)}
								onChange={() => setSelected(option)}
								className="accent-red-500"
							/>
							<span>{option}</span>
						</label>
					))}
				</div>
				<button
					onClick={handleSubmit}
					className="mt-6 w-full bg-red-500 text-white font-semibold py-2 rounded"
				>
					Submit & Proceed
				</button>
			</div>
		</div>
	)
}

export default ReferralPopup
