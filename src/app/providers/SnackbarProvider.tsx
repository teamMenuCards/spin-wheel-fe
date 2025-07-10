"use client"

import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useCallback
} from "react"
import { createPortal } from "react-dom"

type SnackbarContextType = {
	showSnackbar: (content: ReactNode, duration?: number) => void
	hideSnackbar: () => void
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
	undefined
)

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
	const [content, setContent] = useState<ReactNode | null>(null)
	const [visible, setVisible] = useState(false)

	const hideSnackbar = useCallback(() => {
		setVisible(false)
		setTimeout(() => setContent(null), 300) // delay for exit animation
	}, [])

	const showSnackbar = (newContent: ReactNode, duration?: number) => {
		setContent(newContent)
		setVisible(true)

		if (duration && duration > 0) {
			setTimeout(hideSnackbar, duration)
		}
	}

	return (
		<SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
			{children}
			{typeof window !== "undefined" &&
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
