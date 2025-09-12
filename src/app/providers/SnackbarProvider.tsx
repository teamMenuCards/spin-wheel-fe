"use client"

import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState
} from "react"
import { createPortal } from "react-dom"

type SnackbarContextType = {
	showSnackbar: (content: ReactNode, duration?: number) => void
	hideSnackbar: () => void
	isVisible: boolean
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
	undefined
)

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
	const [content, setContent] = useState<ReactNode | null>(null)
	const [visible, setVisible] = useState(false)
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
	const [isMounted, setIsMounted] = useState(false)

	// Ensure component is mounted on client side
	useEffect(() => {
		setIsMounted(true)
	}, [])

	const hideSnackbar = useCallback(() => {
		// Clear any existing timeout
		if (timeoutId) {
			clearTimeout(timeoutId)
			setTimeoutId(null)
		}

		setVisible(false)
		setTimeout(() => setContent(null), 300) // delay for exit animation
	}, [timeoutId])

	const showSnackbar = useCallback(
		(newContent: ReactNode, duration?: number) => {
			// Clear any existing timeout first
			if (timeoutId) {
				clearTimeout(timeoutId)
			}

			setContent(newContent)
			setVisible(true)

			if (duration && duration > 0) {
				const newTimeoutId = setTimeout(hideSnackbar, duration)
				setTimeoutId(newTimeoutId)
			}
		},
		[hideSnackbar, timeoutId]
	)

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId)
			}
		}
	}, [timeoutId])

	return (
		<SnackbarContext.Provider
			value={{ showSnackbar, hideSnackbar, isVisible: visible }}
		>
			{children}
			{isMounted &&
				createPortal(
					<div
						className={`fixed bottom-0 left-0 w-full z-[1400] transition-all duration-300 ${
							visible
								? "translate-y-0 opacity-100"
								: "translate-y-full opacity-0"
						}`}
					>
						{content}
					</div>,
					document.body
				)}
		</SnackbarContext.Provider>
	)
}

export const useSnackbar = () => {
	const context = useContext(SnackbarContext)
	if (!context) {
		throw new Error("useSnackbar must be used within a SnackbarProvider")
	}
	return context
}
