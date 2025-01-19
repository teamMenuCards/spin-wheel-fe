import { useState } from "react"
import MenuItem from "@/app/restaurant/[rname]/menu/menu-item"
import { ProductType, ProductVariantType } from "@/types"

interface ProductCategoryType {
	display_name: string
	products: (ProductType & { variants: ProductVariantType[] })[]
}

interface AccordionProps {
	sections?: ProductCategoryType[] // Accepts an array of categories
}

const Accordion: React.FC<AccordionProps> = ({ sections = [] }) => {
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	const toggleAccordion = (index: number) => {
		setOpenIndex(openIndex === index ? null : index)
	}

	return (
		<div className="w-full max-w-md mx-auto">
			<div className="space-y-2">
				{sections.map((section, index) => (
					<div key={index} className="border rounded-lg overflow-hidden">
						{/* Accordion Title */}
						<button
							className="w-full text-left py-3 px-4 bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200 flex justify-between items-center"
							onClick={() => toggleAccordion(index)}
						>
							{section.display_name}
							<span>{openIndex === index ? "▲" : "▼"}</span>
						</button>

						{/* Accordion Items */}
						{openIndex === index && (
							<div className="py-2 px-4 bg-gray-50 text-gray-700">
								<ul className="list-disc pl-5 space-y-1">
									{section.products.map((item) => (
										<MenuItem product={item} key={item.id} />
									))}
								</ul>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default Accordion
