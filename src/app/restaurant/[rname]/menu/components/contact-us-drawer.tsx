import React from "react"

interface FullPageDrawerProps {
	isOpen: boolean
	onClose: () => void
}

const FullPageDrawerComponent = ({ isOpen, onClose }: FullPageDrawerProps) => {
	const menuItems = [
		{ value: "Monday", timing: "10:00 AM - 10:00 PM" },
		{ value: "Tuesday", timing: "10:00 AM - 10:00 PM" },
		{ value: "Wednesday", timing: "10:00 AM - 10:00 PM" },
		{ value: "Thursday", timing: "10:00 AM - 10:00 PM" },
		{ value: "Friday", timing: "10:00 AM - 10:00 PM" },
		{ value: "Saturday", timing: "10:00 AM - 10:00 PM" },
		{ value: "Sunday", timing: "10:00 AM - 10:00 PM" }
	]

	const handleChat = () => {
		const encodedMessage = encodeURIComponent("Hi. I want to know more!")
		const whatsappUrl = `https://wa.me/919324995221?text=${encodedMessage}`
		window.open(whatsappUrl, "_blank")
	}

	return (
		<div
			className={`fixed top-0 right-0 w-full h-full bg-white transition-transform transform ${
				isOpen ? "translate-x-0" : "translate-x-full"
			}`}
		>
			<button
				onClick={onClose}
				className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full text-xl"
			>
				x
			</button>

			<div className="mt-16 p-4 font-semibold">
				<div className="flex items-center space-x-2">
					📞
					<a href="tel:9324995221" className="underline text-gray-700">
						9324995221
					</a>
				</div>

				<div
					className="flex items-center space-x-2 mt-2 cursor-pointer"
					onClick={handleChat}
				>
					<span className="text-green-600">💬Chat with us!</span>
				</div>

				<h3 className="text-gray-700 mt-6">Opening hours</h3>

				<table className="mt-4 w-full">
					<tbody>
						{menuItems.map((item) => (
							<tr key={item.value} className="border-b">
								<td className="py-2 text-gray-700">{item.value}</td>
								<td className="py-2 text-gray-500">{item.timing}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default FullPageDrawerComponent
