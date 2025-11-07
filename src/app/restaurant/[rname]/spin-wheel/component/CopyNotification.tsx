"use client"
import React, { useEffect, useState } from "react"

interface CopyNotificationProps {
	isVisible: boolean
}

export const CopyNotification: React.FC<CopyNotificationProps> = ({ isVisible }) => {
	const [shouldRender, setShouldRender] = useState(false)

	useEffect(() => {
		if (isVisible) {
			setShouldRender(true)
		} else {
			// Delay removal to allow exit animation
			const timer = setTimeout(() => setShouldRender(false), 300)
			return () => clearTimeout(timer)
		}
	}, [isVisible])

	if (!shouldRender) return null

	return (
		<div 
			className={`fixed top-6 left-1/2 z-50 transition-all duration-300 ease-out ${
				isVisible 
					? 'opacity-100' 
					: 'opacity-0 pointer-events-none'
			}`}
			style={{ 
				transform: isVisible 
					? 'translate(-50%, 0)' 
					: 'translate(-50%, -100%)'
			}}
		>
			<div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 whitespace-nowrap mx-4 backdrop-blur-sm border border-white border-opacity-20 relative overflow-hidden">
				{/* Animated background */}
				<div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 opacity-0 animate-pulse"></div>
				
				<div className="relative z-10 flex items-center gap-3">
					<div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
						<svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
						</svg>
					</div>
					<span className="text-sm font-semibold">Copied to clipboard!</span>
					<div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
				</div>
			</div>
		</div>
	)
}

