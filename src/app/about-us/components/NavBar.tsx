"use client"
import Link from "next/link"
import { useState } from "react"
import { X, Menu } from "lucide-react"
import Image from "next/image"

const navLinks = [
	{ label: "Home", href: "/" },
	{ label: "About Us", href: "/about-us" },
	{ label: "Contact Us", href: "/contact-us" },
	{ label: "Terms and Conditions", href: "/terms-and-conditions" }
]

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false)

	return (
		<nav className="fixed top-0 left-0 w-full bg-white z-50 shadow-md px-4 py-3">
			<div className="flex justify-between items-center max-w-5xl mx-auto">
				{/*    <h1 className="text-2xl font-bold text-green-800">MenuCards</h1> */}
				<Link href={`/`}>
					<Image
						src="/menu-cards-logo.webp"
						alt="Profile"
						width={40}
						height={30}
						/* className="w-24 h-24 rounded-full border-4 border-blue-300 shadow-md" */
					/>
				</Link>

				{/* Desktop Links */}

				<div className="hidden md:flex space-x-6 text-black font-medium">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="relative text-black hover:text-[#E53888] transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#E53888] after:transition-all after:duration-300 hover:after:w-full"
						>
							{link.label}
						</Link>
					))}
				</div>

				{/* Mobile Menu Icon */}
				<div className="md:hidden">
					<button
						onClick={() => setMenuOpen(!menuOpen)}
						aria-label="Toggle Menu"
					>
						{menuOpen ? (
							<X className="text-black" />
						) : (
							<Menu className="text-black" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			{menuOpen && (
				<div className="md:hidden pt-4 space-y-3 transition-all duration-300">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							onClick={() => setMenuOpen(false)}
							className="block max-w-xs mx-auto px-4 py-2 rounded-lg  text-black font-medium hover:bg-[#E53888] hover:text-white transition-all duration-300"
						>
							{link.label}
						</Link>
					))}
				</div>
			)}
		</nav>
	)
}
