"use client"
import React from "react"

interface PreviousWinnersModalProps {
	isOpen: boolean
	onClose: () => void
	winners: string[]
}

export const PreviousWinnersModal: React.FC<PreviousWinnersModalProps> = ({
	isOpen,
	onClose,
	winners
}) => {
	if (!isOpen) return null

	return (
		<div 
			className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-[60] p-4" 
			onClick={onClose}
		>
			<div 
				className="bg-white rounded-3xl p-6 w-full max-w-sm mx-auto space-y-2 transform transition-all duration-300 scale-100 shadow-2xl relative overflow-hidden" 
				onClick={(e) => e.stopPropagation()}
			>
				{/* Background decorative elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute top-3 left-3 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
					<div className="absolute bottom-3 right-3 w-16 h-16 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full blur-xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
				</div>

				{/* Header */}
				<div className="text-center space-y-2 relative z-10">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-3 shadow-xl relative">
						<div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-lg opacity-60 scale-125 animate-pulse"></div>
						<svg className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
						</svg>
					</div>
					<h3 className="text-2xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent leading-tight">
						Previous Winners
					</h3>
					<p className="text-sm text-gray-600 font-medium">
						Congratulations to our lucky winners! 🎉
					</p>
				</div>

				{/* Winners List */}
				<div className="space-y-2 max-h-60 overflow-y-auto relative z-10">
					{winners.map((winner, index) => (
						<div key={index} className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100 hover:shadow-md transition-all duration-200">
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
									{index + 1}
								</div>
								<span className="font-semibold text-gray-800">{winner}</span>
							</div>
							<div className="flex items-center gap-1">
								<svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
								</svg>
								<span className="text-xs font-medium text-gray-600">Winner</span>
							</div>
						</div>
					))}
				</div>

				{/* Close Button */}
				<button
					onClick={onClose}
					className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white text-lg font-bold py-3 rounded-2xl transition-all duration-300 hover:from-gray-600 hover:to-gray-700 active:scale-95 shadow-lg hover:shadow-xl relative z-10"
				>
					Close
				</button>
			</div>
		</div>
	)
}

