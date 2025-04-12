"use client"
import { useState, useEffect, useRef } from "react"
import { Dialog } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { Category } from "@/services/product/get-menu-list"

interface FloatingMenuProps {
	categories: Category[]
}

const FloatingMenu = ({ categories }: FloatingMenuProps) => {
	const currentCategory =
		categories && categories.length > 0 ? categories[0].id : ""
	const [open, setOpen] = useState(false)
	const menuRef = useRef<HTMLDivElement>(null)
	const [scrollTarget, setScrollTarget] = useState<string | null>(null)
	const [selectedCategory, setSelectedcategory] = useState(currentCategory)

	useEffect(() => {
		setSelectedcategory(currentCategory)
	}, [currentCategory])

	const handleClick = (categoryId: string) => {
		setOpen(false) // Close the menu first
		setTimeout(() => {
			setSelectedcategory(categoryId)

			const targetSection = document.getElementById(categoryId)

			if (targetSection) {
				const elementPosition =
					targetSection.getBoundingClientRect().top + window.scrollY

				// Scroll smoothly to the element
				window.scrollTo({
					top: elementPosition - 60, // Adjust for fixed navbar if needed
					behavior: "smooth"
				})
			}
		}, 300) // Slight delay to allow layout adjustments
	}

	const handleOutsideClick = (event: MouseEvent) => {
		if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
			setOpen(false)
		}
	}

	useEffect(() => {
		if (!open && scrollTarget) {
			const element = document.getElementById(scrollTarget)
			if (element) {
				element.scrollIntoView({ behavior: "smooth" })
			}
			setScrollTarget(null) // Reset after scrolling
		}
	}, [open, scrollTarget])

	useEffect(() => {
		if (open) {
			document.addEventListener("mousedown", handleOutsideClick)
		} else {
			document.removeEventListener("mousedown", handleOutsideClick)
		}

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick)
		}
	}, [open])

	const toggleMenu = () => {
		setOpen((prev) => !prev)
	}

	return (
		<>
			<button
				className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-800 transition z-50"
				onClick={() => setOpen(!open)}
			>
				{open ? (
					<XMarkIcon className="w-5 h-5" />
				) : (
					<span className="text-sm">MENU</span>
				)}
			</button>

			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				className="fixed inset-0 flex items-end justify-end p-4 z-50"
			>
				<div
					ref={menuRef}
					className="bg-black text-white w-72 max-h-96 overflow-y-auto rounded-lg shadow-lg px-2"
				>
					{/* Close Button */}
					<div className="w-full sticky top-0  flex justify-end p-2 ">
						<button
							onClick={toggleMenu}
							className="right-2 rounded-full p-1 hover:bg-gray-800 transition bg-white "
						>
							<XMarkIcon className="w-4 h-4 text-black bold" />
						</button>
					</div>

					<ul>
						{categories?.map((category) => {
							return category.active ? (
								<li
									id={category.id}
									key={category.id}
									onClick={() => handleClick(category.id)}
									className={`flex justify-between items-center py-2 px-4 cursor-pointer hover:bg-gray-900 rounded-md transition ${
										category.id === selectedCategory
											? "text-red-400"
											: "text-white"
									}`}
								>
									<span className="text-sm">{category.display_name}</span>
									<span className="text-xs text-gray-400">
										{category?.products?.length || 0}
									</span>
								</li>
							) : null
						})}
					</ul>
				</div>
			</Dialog>
		</>
	)
}

export default FloatingMenu
