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
	const mutationObserverRef = useRef<MutationObserver | null>(null)

	// Cache DOM measurements to avoid repeated queries
	const updateMeasurements = useCallback(() => {
		try {
			// Check if DOM is available
			if (typeof document === "undefined" || typeof window === "undefined")
				return

			// Get the most accurate height by checking multiple sources
			const docHeight = document.documentElement?.scrollHeight || 0
			const bodyHeight = document.body?.scrollHeight || 0
			const clientHeight = document.documentElement?.clientHeight || 0

			// Use the maximum of all height sources to ensure accuracy
			const fullHeight = Math.max(docHeight, bodyHeight, clientHeight)

			measurementsRef.current = {
				windowHeight: window.innerHeight,
				fullHeight: fullHeight
			}
		} catch (error) {
			console.warn("Error updating measurements:", error)
		}
	}, [])

	// Force recalculation of measurements and progress
	const forceRecalculation = useCallback(() => {
		updateMeasurements()
		requestAnimationFrame(() => {
			handleScroll()
		})
	}, [updateMeasurements])

	// Optimized scroll handler with throttling
	const handleScroll = useCallback(() => {
		try {
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
		} catch (error) {
			console.warn("Error in handleScroll:", error)
		}
	}, [])

	// Throttled scroll handler
	const throttledHandleScroll = useCallback(
		throttle(() => {
			requestAnimationFrame(handleScroll)
		}, 16), // ~60fps
		[handleScroll]
	)

	// Setup MutationObserver to watch for DOM changes
	useEffect(() => {
		if (typeof window !== "undefined" && window.MutationObserver) {
			mutationObserverRef.current = new MutationObserver((mutations) => {
				try {
					// Check if any mutations affect the document height
					const hasHeightChanges = mutations.some((mutation) => {
						// Add null checks to prevent errors
						if (!mutation.target || !document.body) return false

						return (
							mutation.type === "childList" ||
							mutation.type === "attributes" ||
							mutation.type === "characterData"
						)
					})

					if (hasHeightChanges) {
						// Debounce the recalculation to avoid excessive updates
						setTimeout(forceRecalculation, 100)
					}
				} catch (error) {
					console.warn("MutationObserver error:", error)
				}
			})

			// Start observing the document body for changes
			if (document.body) {
				try {
					mutationObserverRef.current.observe(document.body, {
						childList: true,
						subtree: true,
						attributes: true,
						attributeFilter: ["style", "class"]
					})
				} catch (error) {
					console.warn("Failed to observe document body:", error)
				}
			}
		}

		return () => {
			if (mutationObserverRef.current) {
				mutationObserverRef.current.disconnect()
			}
		}
	}, [forceRecalculation])

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
			try {
				updateMeasurements()
				// Force a scroll calculation after measurements
				requestAnimationFrame(handleScroll)
			} catch (error) {
				console.warn("Error in initMeasurements:", error)
			}
		}

		// Small delay to ensure DOM is fully rendered
		const timer = setTimeout(initMeasurements, 100)

		// Update measurements on resize
		const handleResize = () => {
			try {
				updateMeasurements()
				// Recalculate progress after resize
				requestAnimationFrame(handleScroll)
			} catch (error) {
				console.warn("Error in handleResize:", error)
			}
		}

		// Handle menu content changes
		const handleMenuContentChange = () => {
			try {
				// Force recalculation when menu content changes
				setTimeout(forceRecalculation, 50)
			} catch (error) {
				console.warn("Error in handleMenuContentChange:", error)
			}
		}

		// Add event listeners
		try {
			window.addEventListener("scroll", throttledHandleScroll, {
				passive: true
			})
			window.addEventListener("resize", handleResize, { passive: true })
			window.addEventListener("menuContentChanged", handleMenuContentChange)
		} catch (error) {
			console.warn("Error adding event listeners:", error)
		}

		// Cleanup function
		return () => {
			clearTimeout(timer)
			try {
				window.removeEventListener("scroll", throttledHandleScroll)
				window.removeEventListener("resize", handleResize)
				window.removeEventListener(
					"menuContentChanged",
					handleMenuContentChange
				)
			} catch (error) {
				console.warn("Error removing event listeners:", error)
			}
		}
	}, [
		throttledHandleScroll,
		updateMeasurements,
		handleScroll,
		forceRecalculation
	])

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
