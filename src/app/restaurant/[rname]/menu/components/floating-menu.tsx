"use client"
import { useState } from "react"
import { Dialog } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/solid"

interface Category {
	id: string
	name: string
	display_name: string
	products?: []
}

interface FloatingMenuProps {
	categories: Category[]
	currentCategory?: string
}

const FloatingMenu = ({ categories, currentCategory }: FloatingMenuProps) => {
	const [open, setOpen] = useState(false)

	const handleClick = (categoryId: string) => {
		setOpen(false)
		const element = document.getElementById(categoryId)
		if (element) {
			element.scrollIntoView({ behavior: "smooth" })
		}
	}

	const toggleMenu = () => {
		setOpen((prev) => !prev) // Correct state toggling
	}

	return (
		<>
			<button
				className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-800 transition z-50"
				onClick={toggleMenu}
			>
				<span className="text-sm">MENU</span>
				{/* {open ? (
					<XMarkIcon className="w-5 h-5" />
				) : (
					<span className="text-sm">MENU</span>
				)} */}
			</button>

			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				className="fixed inset-0 flex items-end justify-end z-50"
			>
				<div className="bg-black text-white w-72 max-h-96 overflow-y-auto absolute bottom-4 right-4 rounded-lg shadow-lg p-2">
					{/* Close Button */}
					<div className="w-full flex justify-end ">
						<button
							onClick={toggleMenu}
							className=" right-2 rounded-full p-1 hover:bg-gray-800 transition bg-white "
						>
							<XMarkIcon className="w-4 h-4 text-black bold" />
						</button>
					</div>

					<ul>
						{categories.map((category) => (
							<li
								key={category.id}
								onClick={() => handleClick(category.id)}
								className={`flex justify-between items-center py-2 px-4 cursor-pointer hover:bg-gray-900 rounded-md transition ${
									category.id === currentCategory
										? "text-red-400"
										: "text-white"
								}`}
							>
								<span className="text-sm">{category.display_name}</span>
								<span className="text-xs text-gray-400">
									{category?.products?.length || 0}
								</span>
							</li>
						))}
					</ul>
				</div>
			</Dialog>
		</>
	)
}

export default FloatingMenu
