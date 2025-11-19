"use client"
import Image from "next/image"
import React from "react"

interface InitialInstructionModalProps {
	isOpen: boolean
	onClose: () => void
	onShowWinners: () => void
	instagramUsername: string | null
	onCopyText: (text: string) => Promise<void>
	isCopying: boolean
	copySuccess: boolean
}

export const InitialInstructionModal: React.FC<
	InitialInstructionModalProps
> = ({
	isOpen,
	onClose,
	onShowWinners,
	instagramUsername,
	onCopyText,
	isCopying,
	copySuccess
}) => {
	if (!isOpen) return null

	return (
		<div className="fixed inset-0 flex items-end bg-white backdrop-blur-md z-40">
			<div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-t-3xl p-6 w-full max-w-sm mx-auto space-y-3 transform transition-all duration-500 ease-out translate-y-0 animate-slide-up shadow-2xl mb-0 relative overflow-hidden">
				{/* Background decorative elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute top-5 left-5 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
					<div
						className="absolute bottom-5 right-5 w-20 h-20 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full blur-xl opacity-20 animate-pulse"
						style={{ animationDelay: "1s" }}
					></div>
				</div>

				{/* Header with enhanced gradient text */}
				<div className="text-center space-y-2 relative z-10">
					<div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 shadow-2xl relative">
						<div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-60 scale-125 animate-pulse"></div>
						<svg
							className="w-10 h-10 text-white relative z-10"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
							/>
						</svg>
					</div>
					<div className="space-y-2">
						<h4 className="text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent leading-tight">
							Win Up To 50% Off
						</h4>
						<div className="flex items-center justify-center space-x-2">
							<div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
							<div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-pulse"></div>
							<div className="w-8 h-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></div>
						</div>
						<p className="text-lg font-semibold text-gray-700 mt-2">
							🎉 Exclusive Discounts Available!
						</p>
					</div>
				</div>

				{/* Celebration image with enhanced styling */}
				<div className="flex justify-center relative">
					<div className="relative">
						<div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-lg opacity-30 scale-110"></div>
						<Image
							src="/spin-wheel2.png"
							alt="Celebration"
							width={120}
							height={60}
							className="object-contain relative z-10 drop-shadow-lg"
						/>
					</div>
				</div>

				{/* Enhanced instruction text */}
				<div className="text-center space-y-2">
					<p className="text-lg font-semibold text-gray-800 leading-relaxed">
						Post an Instagram story and tag us to participate
					</p>
				</div>

				{/* Enhanced copy button - Only show if Instagram username exists */}
				{instagramUsername && (
					<div className="space-y-1 relative z-10">
						<div className="text-center">
							<p className="text-sm font-medium text-gray-600 mb-2">
								Copy our Instagram handle:
							</p>
						</div>
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation()
								if (instagramUsername && !isCopying && !copySuccess) {
									onCopyText(`@${instagramUsername}`)
								}
							}}
							disabled={isCopying || copySuccess}
							className={`w-full text-lg font-semibold py-1 rounded-2xl transition-all duration-500 flex items-center justify-between px-6 relative overflow-hidden group ${
								copySuccess
									? "bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-200 cursor-default"
									: isCopying
									? "bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-lg shadow-blue-200 cursor-wait"
									: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 cursor-pointer active:scale-95"
							}`}
						>
							{/* Animated background gradient */}
							{!isCopying && !copySuccess && (
								<div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							)}
							<span className="flex items-center gap-3 relative z-10">
								{isCopying && !copySuccess ? (
									<>
										<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
										<span className="font-medium">Copying...</span>
									</>
								) : copySuccess ? (
									<>
										<svg
											className="w-5 h-5 text-white"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
										<span className="font-medium">Copied!</span>
									</>
								) : (
									<>
										<div className="flex items-center gap-2">
											<span className="font-medium">@{instagramUsername}</span>
										</div>
									</>
								)}
							</span>
							{!isCopying && !copySuccess && (
								<div className="relative z-10">
									<svg
										className="w-12 h-12 opacity-90 hover:opacity-100 hover:bg-white hover:bg-opacity-20 rounded-xl p-2 backdrop-blur-sm transition-all duration-200"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
										/>
									</svg>
								</div>
							)}
						</button>
					</div>
				)}

				{/* Enhanced Post Story button */}
				<button
					onClick={() => {
						if (typeof window !== "undefined") {
							window.open("https://instagram.com")
						}
						onClose()
					}}
					className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white text-lg font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 hover:scale-105 active:scale-95 relative overflow-hidden group"
				>
					<div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					<div className="relative z-10 flex items-center gap-2">
						<div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
							<Image
								src="/instagram-icon.webp"
								alt="instagram"
								width={16}
								height={16}
								className="object-contain"
							/>
						</div>
						<span className="font-bold">Post Story</span>
						<svg
							className="w-5 h-5 opacity-80 group-hover:translate-x-1 transition-transform"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 7l5 5m0 0l-5 5m5-5H6"
							/>
						</svg>
					</div>
				</button>

				{/* Previous Winners Button - Always Visible */}
				<button
					onClick={onShowWinners}
					className="w-full max-w-sm mx-auto text-pink-500 font-bold text-base py-3 px-4 transition-all duration-200 hover:text-pink-600 active:scale-95 relative underline decoration-pink-500 hover:decoration-pink-600 decoration-2 underline-offset-2"
					style={{ color: "#ec4899" }}
				>
					Previous winner who won
				</button>
			</div>
		</div>
	)
}
