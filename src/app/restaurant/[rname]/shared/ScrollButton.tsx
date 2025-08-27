"use client"

import {
	ChevronDown_Ic,
	ChevronUp_Ic
} from "@/app/restaurant/[rname]/menu/icons"
import React, { useCallback } from "react"
import { useScrollContext } from "@/app/providers/ProgressbarProvider"

const ScrollButton: React.FC = () => {
	const { isAtBottom } = useScrollContext()

	const smoothScroll = useCallback(
		(targetPosition: number, duration: number) => {
			const startPosition = window.scrollY
			const distance = targetPosition - startPosition
			let startTime: number | null = null

			const easeInOutQuad = (t: number) =>
				t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

			const animation = (currentTime: number) => {
				if (startTime === null) startTime = currentTime
				const timeElapsed = currentTime - startTime
				const progress = Math.min(timeElapsed / duration, 1)
				const run = startPosition + distance * easeInOutQuad(progress)

				window.scrollTo(0, run)

				if (timeElapsed < duration) requestAnimationFrame(animation)
			}

			requestAnimationFrame(animation)
		},
		[]
	)

	const handleScrollClick = useCallback(() => {
		const targetPosition = isAtBottom ? 0 : document.body.scrollHeight
		smoothScroll(targetPosition, 1000)
	}, [isAtBottom, smoothScroll])

	return (
		<button
			className="fixed bottom-[30px] right-[20px] p-2 bg-red-500 text-white rounded-full z-50 shadow-lg hover:bg-red-600 transition-all duration-300"
			onClick={handleScrollClick}
		>
			{isAtBottom ? (
				<ChevronUp_Ic className="w-5 h-5 stroke-3" />
			) : (
				<ChevronDown_Ic className="w-5 h-5 stroke-3" />
			)}
		</button>
	)
}

export default ScrollButton
