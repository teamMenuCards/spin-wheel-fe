"use client"
import { useState, useEffect } from "react"
import MenuItem from "@/app/restaurant/[rname]/menu/components/menu-item"
import {
	ChevronDown_Ic,
	ChevronUp_Ic
} from "@/app/restaurant/[rname]/menu/icons"
import { Category } from "@/services/product/get-menu-list"

interface AccordionProps {
	sections?: Category[]
	onSectionSelection: (category: Category) => void
}

const Accordion: React.FC<AccordionProps> = ({
	sections = [],
	onSectionSelection
}) => {
	const [openIndexes, setOpenIndexes] = useState<number[]>([])

	// Ensure all sections are open when sections data is available
	useEffect(() => {
		if (sections.length) {
			setOpenIndexes(sections.map((_, index) => index))
		}
	}, [sections])

	const onClickSection = (index: number, section: Category) => {
		setOpenIndexes(
			(prevIndexes) =>
				prevIndexes.includes(index)
					? prevIndexes.filter((i) => i !== index) // Close if already open
					: [...prevIndexes, index] // Open if closed
		)
		onSectionSelection(section)
	}

	return (
		<div className="w-full max-w-md mx-auto">
			<div className="space-y-2">
				{sections && sections.length
					? sections.map((section, index) => {
							return (
								<>
									<div
										key={section.id}
										id={section.id}
										className="border rounded-lg overflow-hidden"
									>
										{/* Accordion Title */}
										<button
											className="w-full text-left py-4 px-4 bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200 flex justify-between items-center"
											onClick={() => onClickSection(index, section)}
										>
											{section.display_name}
											<span>
												{openIndexes.includes(index) ? (
													<ChevronUp_Ic className="w-4 h-4" />
												) : (
													<ChevronDown_Ic className="w-4 h-4" />
												)}
											</span>
										</button>

										{/* Accordion Items */}
										{openIndexes.includes(index) && (
											<div className="py-2 px-4 bg-gray-50 text-gray-700">
												<ul className="list-disc pl-5 space-y-1">
													{section.products.map((item) => (
														<MenuItem product={item} key={item.id} />
													))}
												</ul>
											</div>
										)}
									</div>
								</>
							)
					  })
					: null}
			</div>
		</div>
	)
}

export default Accordion
