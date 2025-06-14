import React from "react"

const solutions = [
	{
		icon: "⭐",
		title: "Real-Time Ratings",
		description:
			"Automatically show ratings from Zomato, Swiggy, and Google to build instant trust with customers."
	},
	{
		icon: "🖼️",
		title: "Visual Menus",
		description:
			"Showcase beautiful, image-based menus that drive cravings and boost conversion."
	},
	{
		icon: "💬",
		title: "Customer Reviews",
		description:
			"Highlight what customers love with real-time testimonials and review widgets."
	},
	{
		icon: "🔗",
		title: "Smart Ordering Links",
		description:
			"Direct traffic to your Swiggy, Zomato, or in-house ordering system—no middlemen."
	},
	{
		icon: "📊",
		title: "Engagement Dashboard",
		description:
			"Track clicks, views, and customer behavior from one easy-to-use dashboard."
	},
	{
		icon: "🧠",
		title: "Brand-First Approach",
		description:
			"Empower restaurants to grow their own brand and reduce reliance on aggregators."
	}
]

const OurSolutions = () => {
	return (
		<div className="bg-[#F7CFD8] py-10 px-4 pt-0 md:px-16">
			<h2 className="text-xl sm:text-2xl font-bold text-[#E53888] mt-10 mb-6 text-center">
				What Makes MenuCards Different?
			</h2>
			<div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
				{solutions.map((item, index) => (
					<div
						key={index}
						className="bg-white rounded-xl p-4 md:p-5 border border-green-100 shadow hover:shadow-md transition"
					>
						<div className="flex items-start gap-3 mb-2">
							<span className="text-xl">{item.icon}</span>
							<h3 className="text-black font-semibold leading-tight">
								{item.title}
							</h3>
						</div>
						<p className="text-sm text-gray-700 leading-snug">
							{item.description}
						</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default OurSolutions
