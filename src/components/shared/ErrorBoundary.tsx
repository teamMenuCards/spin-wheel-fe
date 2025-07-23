"use client"

import React, { Component, ErrorInfo, ReactNode } from "react"

interface Props {
	children: ReactNode
	fallback?: ReactNode
}

interface State {
	hasError: boolean
	error?: Error
}

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error: Error): State {
		// Update state so the next render will show the fallback UI
		return { hasError: true, error }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// Log the error to console in development
		if (process.env.NODE_ENV === "development") {
			console.error("ErrorBoundary caught an error:", error, errorInfo)
		}

		// In production, you might want to send this to an error reporting service
		// Example: Sentry.captureException(error, { extra: errorInfo })
	}

	render() {
		if (this.state.hasError) {
			// Render fallback UI instaed of showing crash message
			return (
				this.props.fallback || (
					<div className="min-h-screen flex items-center justify-center bg-gray-50">
						<div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
							<div className="text-red-500 text-6xl mb-4">⚠️</div>
							<h2 className="text-xl font-semibold text-gray-900 mb-2">
								Something went wrong
							</h2>
							<p className="text-gray-600 mb-4">
								We&apos;re sorry, but something unexpected happened. Please try refreshing the page.
							</p>
							<button
								onClick={() => {
									this.setState({ hasError: false, error: undefined })
									window.location.reload()
								}}
								className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600 transition-colors"
							>
								Refresh Page
							</button>
						</div>
					</div>
				)
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary 