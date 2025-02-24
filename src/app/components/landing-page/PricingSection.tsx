"use client"

import { useState } from "react"
import Image from "next/image"

// Define types
type PlanType = "pro" | "advanced" | "premium"

// Features array
const features = [
	"Homepage (10x Better than linktree)",
	"Free QR code",
	"Menu Management",
	"Analytics",
	"Customer Support",
	"Tipping Waiter/Kitchen Staff",
	"Online Ordering",
	"Marketing ROI",
	"Food Rating & Feedback",
	"Social Media Integration",
	"Payment Gateway Integration",
	"Queue Breaker",
	"Custom Domain",
	"Complete Branding Control",
	"Advance Analytics",
	"POS Integrations"
]

// Helper function for feature highlighting
const featureHighlight = (index: number, plan: PlanType): boolean => {
	if (plan === "pro") return index < 4
	if (plan === "advanced") return index < 6
	return true // premium plan gets all features
}

const PricingSectionComponent = () => {
	const [hovered, setHovered] = useState<PlanType | null>(null)

	return (
		<section id="pricing" className="pt-10 pb-12 bg-gray-50">
			<h4 className="text-4xl font-bold text-center mb-8">Our Pricing Plans</h4>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{/* Pro Plan */}
				<div
					className={`p-6 bg-white rounded-2xl shadow-lg transform transition-all duration-300 ${
						hovered === "pro" ? "scale-100" : "scale-90"
					}`}
					onMouseEnter={() => setHovered("pro")}
					onMouseLeave={() => setHovered(null)}
				>
					<div className="bg-green-600 text-white p-2 rounded-xl mb-4">
						<h6 className="text-xl">Pro</h6>
					</div>
					<h4 className="text-4xl font-bold text-center flex items-center justify-center">
						Free
						<Image
							src="/prize-icon.webp"
							alt="Prize Icon"
							width={40}
							height={40}
							className="ml-2"
						/>
					</h4>
					<p className="text-sm mt-1 text-center">Billed annually</p>
					<p className="mt-4 text-gray-700 text-center">
						Transition from paper menus to beautiful mobile menus with QR codes.
					</p>
					<ul className="mt-4 space-y-2 text-left">
						{features.map((item, index) => (
							<li
								key={index}
								className="flex items-center text-gray-600 text-sm"
							>
								<span
									className={`mr-2 ${
										featureHighlight(index, "pro")
											? "text-green-600"
											: "text-gray-300"
									}`}
								>
									✓
								</span>
								<span
									className={featureHighlight(index, "pro") ? "font-bold" : ""}
								>
									{item}
								</span>
							</li>
						))}
					</ul>
					<div className="flex justify-center mt-6">
						<button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
							Select
						</button>
					</div>
				</div>

				{/* Advanced Plan */}
				<div
					className={`p-6 bg-white rounded-2xl shadow-lg border-4 border-orange-500 transform transition-all duration-300 ${
						hovered === "advanced" ? "scale-100" : "scale-100"
					}`}
					onMouseEnter={() => setHovered("advanced")}
					onMouseLeave={() => setHovered(null)}
				>
					<div className="bg-orange-500 text-white p-2 rounded-xl mb-4">
						<h6 className="text-xl">Advanced</h6>
					</div>
					<h4 className="text-4xl font-bold text-center flex items-center justify-center">
						1 Large Pizza
						<Image
							src="/pizza-icon.webp"
							alt="Pizza Icon"
							width={40}
							height={40}
							className="ml-2"
						/>
					</h4>
					<p className="text-sm mt-1 text-center">Billed annually</p>
					<p className="mt-4 text-gray-700 text-center">
						Get your online ordering site integrated with logistics partners.
					</p>
					<ul className="mt-4 space-y-2 text-left">
						{features.map((item, index) => (
							<li
								key={index}
								className="flex items-center text-gray-600 text-sm"
							>
								<span
									className={`mr-2 ${
										featureHighlight(index, "advanced")
											? "text-green-600"
											: "text-gray-300"
									}`}
								>
									✓
								</span>
								<span
									className={
										featureHighlight(index, "advanced") ? "font-bold" : ""
									}
								>
									{item}
								</span>
							</li>
						))}
					</ul>
					<div className="flex justify-center mt-6">
						<button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
							Selected
						</button>
					</div>
				</div>

				{/* Premium Plan */}
				<div
					className={`p-6 bg-white rounded-2xl shadow-lg transform transition-all duration-300 ${
						hovered === "premium" ? "scale-100" : "scale-90"
					}`}
					onMouseEnter={() => setHovered("premium")}
					onMouseLeave={() => setHovered(null)}
				>
					<div className="bg-red-600 text-white p-2 rounded-xl mb-4">
						<h6 className="text-xl">Premium</h6>
					</div>
					<h4 className="text-4xl font-bold text-center flex items-center justify-center">
						1 kg Biryani
						<Image
							src="/biryani-icon.webp"
							alt="Biryani Icon"
							width={40}
							height={40}
							className="ml-2"
						/>
					</h4>
					<p className="text-sm mt-1 text-center">Billed annually</p>
					<p className="mt-4 text-gray-700 text-center">
						For brands that want it all! Full customization and advanced
						features.
					</p>
					<ul className="mt-4 space-y-2 text-left">
						{features.map((item, index) => (
							<li
								key={index}
								className="flex items-center text-gray-600 text-sm"
							>
								<span
									className={`mr-2 ${
										featureHighlight(index, "premium")
											? "text-green-600"
											: "text-gray-300"
									}`}
								>
									✓
								</span>
								<span
									className={
										featureHighlight(index, "premium") ? "font-bold" : ""
									}
								>
									{item}
								</span>
							</li>
						))}
					</ul>
					<div className="flex justify-center mt-6">
						<button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
							Select
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default PricingSectionComponent
