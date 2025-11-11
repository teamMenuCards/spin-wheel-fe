"use client"
import React, { useState, useEffect, useRef } from "react"

interface SpinButtonProps {
	canSpin: boolean
	isSpinning: boolean
	closeModal: boolean
	onClick: () => void
}

export const SpinButton: React.FC<SpinButtonProps> = ({
	canSpin,
	isSpinning,
	closeModal,
	onClick
}) => {
	const [isClicked, setIsClicked] = useState(false)
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	const handleClick = () => {
		if (!canSpin || closeModal || isSpinning) return
		setIsClicked(true)
		onClick()
		// Keep animation until isSpinning takes over, or reset after 2 seconds
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}
		timeoutRef.current = setTimeout(() => {
			if (!isSpinning) {
				setIsClicked(false)
			}
		}, 2000)
	}

	// Reset isClicked when isSpinning becomes false
	useEffect(() => {
		if (!isSpinning && isClicked) {
			setIsClicked(false)
		}
	}, [isSpinning, isClicked])

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [])
	return (
		<div className="flex flex-col items-center space-y-3 mt-6">
			<button
				className={`relative overflow-hidden font-black py-5 px-12 rounded-3xl transition-all duration-200 group text-lg min-w-[200px] touch-manipulation ${
					!canSpin || closeModal || isSpinning
						? "bg-gradient-to-r from-gray-400 to-gray-500 text-gray-200 cursor-not-allowed shadow-lg"
						: "bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white shadow-2xl active:scale-[0.97] active:bg-gradient-to-r active:from-purple-600 active:via-pink-600 active:to-red-600 focus:bg-gradient-to-r focus:from-purple-600 focus:via-pink-600 focus:to-red-600 focus:outline-none focus-visible:outline-none"
				}`}
				style={{
					boxShadow: !canSpin || closeModal || isSpinning
						? "0 10px 25px rgba(0, 0, 0, 0.2), 0 4px 10px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
						: "0 20px 40px rgba(147, 51, 234, 0.4), 0 10px 20px rgba(236, 72, 153, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
					...( (!canSpin || closeModal || isSpinning) ? {} : {
						WebkitTapHighlightColor: 'transparent',
						WebkitTouchCallout: 'none',
						userSelect: 'none',
					})
				}}
				onClick={(!canSpin || closeModal || isSpinning) ? undefined : handleClick}
				disabled={!canSpin || closeModal || isSpinning}
				onMouseDown={(e) => {
					// Prevent default browser grey background on click
					if (!canSpin || closeModal || isSpinning) return
					e.currentTarget.style.background = 'linear-gradient(to right, rgb(147, 51, 234), rgb(236, 72, 153), rgb(220, 38, 38))'
				}}
				onMouseUp={(e) => {
					// Ensure gradient is maintained
					if (!canSpin || closeModal || isSpinning) return
					e.currentTarget.style.background = 'linear-gradient(to right, rgb(147, 51, 234), rgb(236, 72, 153), rgb(220, 38, 38))'
				}}
				onTouchStart={(e) => {
					// Prevent default grey background on mobile touch
					if (!canSpin || closeModal || isSpinning) return
					e.currentTarget.style.background = 'linear-gradient(to right, rgb(147, 51, 234), rgb(236, 72, 153), rgb(220, 38, 38))'
				}}
				onTouchEnd={(e) => {
					// Ensure gradient is maintained after touch
					if (!canSpin || closeModal || isSpinning) return
					e.currentTarget.style.background = 'linear-gradient(to right, rgb(147, 51, 234), rgb(236, 72, 153), rgb(220, 38, 38))'
				}}
			>
				<span className="relative z-10 flex items-center justify-center gap-3">
					<span className="tracking-wider text-lg font-black transform group-active:scale-95 transition-transform duration-150">SPIN TO WIN</span>
					<svg 
						className={`w-6 h-6 transform transition-all duration-300 ${
							isSpinning || isClicked
								? "animate-spin" 
								: "group-active:scale-110 group-active:rotate-180"
						}`}
						fill="none" 
						stroke="currentColor" 
						viewBox="0 0 24 24"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
					</svg>
				</span>
			</button>
		</div>
	)
}

