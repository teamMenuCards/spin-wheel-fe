import React from "react"
import { FaInstagram } from "react-icons/fa"
import Link from "next/link"
import { navLinks } from "@/app/constants"

const Footer = () => {
	return (
		<>
			<footer className="bg-pink-100 text-center text-gray-800 py-8 px-4">
				<div className="max-w-2xl mx-auto space-y-4">
					<p>
						You can also reach out to us through our social channels or the
						contact form on our website.
					</p>
					<p className="font-medium">Let’s grow your restaurant—together.</p>

					{/* Social Media Icons */}
					<div className="flex justify-center gap-4 text-[#E53888] text-xl mt-4">
						<a
							href="https://www.instagram.com/menucards"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaInstagram className="hover:text-pink-600" />
						</a>
					</div>

					{/* Desktop Links */}

					<div className="md:flex space-x-6 text-black justify-center font-medium">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="relative text-sm text-black  hover:text-[#E53888] transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#E53888] after:transition-all after:duration-300 hover:after:w-full"
							>
								{link.label}
							</Link>
						))}
					</div>

					{/* Footer Text */}
					<p className="text-sm text-gray-800">
						<span className="text-black font-medium">MenuCards</span> – Powered
						by{" "}
						<span className="font-bold text-black">Welina Foods Pvt. Ltd.</span>
					</p>
				</div>
			</footer>
		</>
	)
}

export default Footer
