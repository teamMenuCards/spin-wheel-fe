"use client"
import React, { useEffect, useState } from "react"

export default function Home() {
	const [htmlContent, setHtmlContent] = useState("")

	useEffect(() => {
		// Fetch the HTML file from the public folder
		fetch("/policies.html")
			.then((response) => response.text())
			.then((data) => {
				setHtmlContent(data)
			})
			.catch((error) => {
				console.error("Error fetching the HTML file:", error)
			})
	}, [])

	if (!htmlContent) {
		// Show a loader or placeholder until the content is loaded
		return <p>Loading HTML content...</p>
	}

	return (
		<div>
			{/* Render the fetched HTML content */}
			<div dangerouslySetInnerHTML={{ __html: htmlContent }} />
		</div>
	)
}
