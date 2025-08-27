"use client"

import { usePathname } from "next/navigation"
import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState
} from "react"

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

interface ScrollProviderProps {
	children: React.ReactNode
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
	const [scrollProgress, setScrollProgress] = useState(0)
	const [isAtBottom, setIsAtBottom] = useState(false)
	const pathname = usePathname()

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
		const newIsAtBottom =
			window.innerHeight + scrollPosition >= document.body.scrollHeight - 10
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

	// Reset scroll state when pathname changes (navigation)
	useEffect(() => {
		setScrollProgress(0)
		setIsAtBottom(false)
		scrollRef.current = 0
		isAtBottomRef.current = false

		// Re-initialize measurements after navigation
		const timer = setTimeout(() => {
			updateMeasurements()
			requestAnimationFrame(handleScroll)
		}, 150)

		return () => clearTimeout(timer)
	}, [pathname, updateMeasurements, handleScroll])

	useEffect(() => {
		// Initial measurements with a small delay to ensure DOM is ready
		const initMeasurements = () => {
			updateMeasurements()
			// Force a scroll calculation after measurements
			requestAnimationFrame(handleScroll)
		}

		// Small delay to ensure DOM is fully rendered
		const timer = setTimeout(initMeasurements, 100)

		// Update measurements on resize
		const handleResize = () => {
			updateMeasurements()
			// Recalculate progress after resize
			requestAnimationFrame(handleScroll)
		}

		// Add event listeners
		window.addEventListener("scroll", throttledHandleScroll, { passive: true })
		window.addEventListener("resize", handleResize, { passive: true })

		// Cleanup function
		return () => {
			clearTimeout(timer)
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

export const useScrollContext = () => {
	const context = useContext(ScrollContext)
	if (!context) {
		throw new Error("useScrollContext must be used within a ScrollProvider")
	}
	return context
}
