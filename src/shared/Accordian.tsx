import { useState } from "react"
import MenuItem from "@/app/restaurant/[rname]/menu/components/menu-item"
import { ProductType, ProductVariantType } from "@/types"
import {
	ChevronDown_Ic,
	ChevronUp_Ic
} from "@/app/restaurant/[rname]/menu/icons"

interface ProductCategoryType {
	display_name: string
	products: (ProductType & { variants: ProductVariantType[] })[]
}

interface AccordionProps {
	sections?: ProductCategoryType[] // Accepts an array of categories
}

const Accordion: React.FC<AccordionProps> = ({
	sections = [],
	onSectionSelection
}) => {
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	const onClickSection = (index: number, section) => {
		setOpenIndex(openIndex === index ? null : index)
		onSectionSelection(section)
	}

	return (
		<div className="w-full max-w-md mx-auto">
			<div className="space-y-2">
				{sections.map((section, index) => (
					<div key={index} className="border rounded-lg overflow-hidden">
						{/* Accordion Title */}
						<button
							className="w-full text-left py-4 px-4 bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200 flex justify-between items-center"
							onClick={() => onClickSection(index, section)}
						>
							{section.display_name}
							<span>
								{openIndex === index ? (
									<ChevronUp_Ic className="w-4 h-4" />
								) : (
									<ChevronDown_Ic className="w-4 h-4" />
								)}
							</span>
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
