"use client"

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react"


interface ScrollContextType {
	scrollProgress: number
	isAtBottom: boolean
}
// Modern throttle function with arrow functions and better typing
const throttle = <T extends (...args: unknown[]) => void>(
	func: T,
	limit: number
): ((...args: Parameters<T>) => void) => {
	let inThrottle = false
	return (...args: Parameters<T>) => {
		if (!inThrottle) {
			func(...args)
			inThrottle = true
			setTimeout(() => {
				inThrottle = false
			}, limit)
		}
	}
}


const ScrollContext = createContext<ScrollContextType | undefined>(undefined)

export const useScrollContext = () => {
	const context = useContext(ScrollContext)
	if (!context) {
		throw new Error("useScrollContext must be used within a ScrollProvider")
	}
	return context
}

interface ScrollProviderProps {
	children: React.ReactNode
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
	const [scrollProgress, setScrollProgress] = useState(0)
	const [isAtBottom, setIsAtBottom] = useState(false)
	
	const scrollRef = useRef<number>(0)
	const isAtBottomRef = useRef(false)
	const measurementsRef = useRef({
		windowHeight: 0,
		fullHeight: 0
	})

	// Cache DOM measurements to avoid repeated queries
	const updateMeasurements = useCallback(() => {
		measurementsRef.current = {
			windowHeight: window.innerHeight,
			fullHeight: document.documentElement.scrollHeight
		}
	}, [])

	// Optimized scroll handler with throttling
	const handleScroll = useCallback(() => {
		const { windowHeight, fullHeight } = measurementsRef.current
		const scrollPosition = window.scrollY
		
		// Calculate progress
		const progress = (scrollPosition / (fullHeight - windowHeight)) * 100
		const clampedProgress = Math.min(Math.max(progress, 0), 100)
		
		// Only update state if progress changed significantly (avoid micro-updates)
		if (Math.abs(clampedProgress - scrollRef.current) > 0.5) {
			scrollRef.current = clampedProgress
			setScrollProgress(clampedProgress)
		}

		// Check if at bottom
		const newIsAtBottom = window.innerHeight + scrollPosition >= document.body.scrollHeight - 10
		if (newIsAtBottom !== isAtBottomRef.current) {
			isAtBottomRef.current = newIsAtBottom
			setIsAtBottom(newIsAtBottom)
		}
	}, [])

	// Throttled scroll handler
	const throttledHandleScroll = useCallback(
		throttle(() => {
			requestAnimationFrame(handleScroll)
		}, 16), // ~60fps
		[handleScroll]
	)

	useEffect(() => {
		// Initial measurements
		updateMeasurements()
		
		// Update measurements on resize
		const handleResize = () => {
			updateMeasurements()
			// Recalculate progress after resize
			requestAnimationFrame(handleScroll)
		}

		window.addEventListener("scroll", throttledHandleScroll, { passive: true })
		window.addEventListener("resize", handleResize, { passive: true })

		return () => {
			window.removeEventListener("scroll", throttledHandleScroll)
			window.removeEventListener("resize", handleResize)
		}
	}, [throttledHandleScroll, updateMeasurements, handleScroll])

	return (
		<ScrollContext.Provider value={{ scrollProgress, isAtBottom }}>
			{children}
		</ScrollContext.Provider>
	)
}
