import { navLinks } from "@/app/constants"
import React from "react"
import Link from "next/link"

const Footer: React.FC = () => {
	return (
		<div
			style={{
				textAlign: "center",
				padding: "1rem",
				backgroundColor: "#f5f5f5",
				borderTop: "1px solid #ddd"
			}}
		>
			<div>
				<div className="md:flex space-x-6 text-black justify-center font-medium">
					{navLinks &&
						navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="relative text-sm text-black  hover:text-[#E53888] transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#E53888] after:transition-all after:duration-300 hover:after:w-full"
							>
								{link.label}
							</Link>
						))}
				</div>

				<a
					href={"/privacy-policy"}
					color="white"
					style={{
						color: "black"
					}}
				>
					<u>
						© 2024 MenuCards. All rights reserved by Welnia Food Private Limited
						Policies.
					</u>
				</a>
			</div>
			{/* </a> */}
			<div style={{ color: "black" }}>
				<span>getmenucards@gmail.com</span>
				<span style={{ paddingLeft: "15px" }}>9757024944</span>
			</div>
		</div>
	)
}

export default Footer
