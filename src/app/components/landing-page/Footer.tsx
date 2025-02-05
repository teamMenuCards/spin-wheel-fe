import React from "react"
// import NextLink from "next/link"

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
			<a
				href={"/privacy-policy"}
				color="white"
				style={{
					color: "black"
				}}
			>
				<div>
					<u>
						© 2024 MenuCards. All rights reserved by Welnia Food Private Limited
						Policies.
					</u>
				</div>
			</a>
			<div style={{ color: "black" }}>
				<span>getmenucards@gmail.com</span>
				<span style={{ paddingLeft: "15px" }}>9757024944</span>
			</div>
		</div>
	)
}

export default Footer
