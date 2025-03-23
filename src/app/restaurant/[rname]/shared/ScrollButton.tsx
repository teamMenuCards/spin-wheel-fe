"use client"

import React, { useState, useEffect } from "react"
import {
	ChevronDown_Ic,
	ChevronUp_Ic
} from "@/app/restaurant/[rname]/menu/icons"

const ScrollButton: React.FC = () => {
	const [isAtBottom, setIsAtBottom] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsAtBottom(
				window.innerHeight + window.scrollY >= document.body.scrollHeight - 10
			)
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	const smoothScroll = (targetPosition: number, duration: number) => {
		const startPosition = window.scrollY
		const distance = targetPosition - startPosition
		let startTime: number | null = null

		const easeInOutQuad = (t: number) =>
			t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

		const animation = (currentTime: number) => {
			if (startTime === null) startTime = currentTime
			const timeElapsed = currentTime - startTime
			const progress = Math.min(timeElapsed / duration, 1) // Ensure it stops exactly at target
			const run = startPosition + distance * easeInOutQuad(progress)

			window.scrollTo(0, run)

			if (timeElapsed < duration) requestAnimationFrame(animation)
		}

		requestAnimationFrame(animation)
	}

	const handleScroll = () => {
		const targetPosition = isAtBottom ? 0 : document.body.scrollHeight
		smoothScroll(targetPosition, 1000)
	}

	return (
		<button
			className="fixed bottom-[30px] right-[20px]  p-2 bg-red-500 text-white rounded-full z-50 shadow-lg hover:bg-red-600 transition-all duration-300"
			onClick={handleScroll}
		>
			{isAtBottom ? (
				<ChevronUp_Ic className="w-4 h-4 stroke-3" />
			) : (
				<ChevronDown_Ic className="w-4 h-4 stroke-3" />
			)}
		</button>
	)
}

export default ScrollButton
