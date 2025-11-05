"use client"
import React, { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image"
import { SpinWheelSegment } from "@/types/spin-wheel.type"
import { spinWheelContentManager } from "@/lib/spin-wheel-content-manager"
import { useGetRestaurantDetailByNameQuery } from "@/services/restaurant/get-restaurant-detail"
import { useParams } from "next/navigation"

interface WheelComponentProps {
	segments: SpinWheelSegment[]
	restaurantId: string
	winningSegment?: string
	onFinished: (winner: string, segment: SpinWheelSegment) => void
	onSpinAttempt?: (canSpin: boolean, reason?: string) => void
	primaryColor?: string
	primaryColoraround?: string
	contrastColor?: string
	buttonText?: string
	isOnlyOnce?: boolean
	size?: number
	upDuration?: number
	downDuration?: number
	fontFamily?: string
}

const WheelComponent: React.FC<WheelComponentProps> = ({
	segments,
	restaurantId,
	onFinished,
	onSpinAttempt,
	primaryColor = "black",
	contrastColor = "white",
	buttonText = "Spin",
	isOnlyOnce = true,
	size = 350,
	upDuration = 1000,
	downDuration = 100,
	fontFamily = "Inter, sans-serif"
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const [isFinished, setFinished] = useState(false)
	const currentSegment = useRef<SpinWheelSegment | null>(null)
	const isStarted = useRef(false)
	const timerHandle = useRef(0)
	const angleCurrent = useRef(0)
	const angleDelta = useRef(0)
	const maxSpeed = useRef(Math.PI / segments.length)
	const spinStart = useRef(0)
	const frames = useRef(0)
	const [canSpin, setCanSpin] = useState(true)
	const [spinMessage, setSpinMessage] = useState("")
	const { rname } = useParams<{ rname: string }>()
	const { data: restaurantData } = useGetRestaurantDetailByNameQuery(rname)	

	const centerX = 300
	const centerY = 300
  const [closeModal, setCloseModal] = useState(true)
  const [copyNotification, setCopyNotification] = useState(false)
  const [isCopying, setIsCopying] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [showWinnersModal, setShowWinnersModal] = useState(false)

	// Random winners data
	const previousWinners = [
		"Sarah Johnson", "Mike Chen", "Emily Rodriguez", "David Kim", "Lisa Wang",
		"Alex Thompson", "Maria Garcia", "James Wilson", "Anna Smith", "Chris Brown",
		"Jessica Lee", "Ryan Davis", "Amanda Taylor", "Kevin Martinez", "Rachel Green"
	]

	// Extract Instagram link from restaurant data
	const getInstagramLink = () => {
		if (!restaurantData?.detail?.details?.platform_details) {
			return "https://instagram.com"
		}
		
		const instagramPlatform = restaurantData.detail.details.platform_details.find(
			platform => platform.platform_name === "insta"
		)
		
		return instagramPlatform?.platform_uri || "https://instagram.com"
	}

	// Extract Instagram username from the link
	const getInstagramUsername = () => {
		const instagramLink = getInstagramLink()
		const match = instagramLink.match(/instagram\.com\/([^\/\?]+)/)
		return match ? match[1] : null
	}
    async function copyText(textToCopy: string) {
		setIsCopying(true);
		setCopySuccess(false);
		
		// Add a small delay to show the spinning animation
		await new Promise(resolve => setTimeout(resolve, 800));
		
		try {
		  await navigator.clipboard.writeText(textToCopy);
		  setCopySuccess(true);
		  setCopyNotification(true);
		  
		  // Auto-hide notification and reset states after 2 seconds
		  setTimeout(() => {
			setCopyNotification(false);
			setIsCopying(false);
			setCopySuccess(false);
		  }, 2000);
		} catch (err) {
		  console.error('Failed to copy text:', err);
		  // Fallback for older browsers
		  const textArea = document.createElement('textarea');
		  textArea.value = textToCopy;
		  document.body.appendChild(textArea);
		  textArea.select();
		  try {
			document.execCommand('copy');
			setCopySuccess(true);
			setCopyNotification(true);
			setTimeout(() => {
			  setCopyNotification(false);
			  setIsCopying(false);
			  setCopySuccess(false);
			}, 2000);
		  } catch (fallbackErr) {
			console.error('Fallback copy failed:', fallbackErr);
			setIsCopying(false);
		  }
		  document.body.removeChild(textArea);
		}
	  }
  
	 
	// Extract colors and texts from segments
	const segColors = segments.map(segment => segment.color)
	const segmentTexts = segments.map(segment => segment.text)

	const checkSpinEligibility = useCallback(() => {
		setCanSpin(true)
		setSpinMessage("")
		onSpinAttempt?.(true)
	}, [onSpinAttempt])

	const wheelInit = () => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext("2d")
		if (!ctx) return

		ctx.lineWidth = 1
		ctx.strokeStyle = primaryColor
		ctx.textBaseline = "middle"
		ctx.textAlign = "center"
		ctx.font = `1em ${fontFamily}`

		drawWheel(ctx)
	}

	useEffect(() => {
		wheelInit()
		checkSpinEligibility()
		return () => {
			if (timerHandle.current) clearInterval(timerHandle.current)
		}
	}, [checkSpinEligibility, wheelInit])

	const onTimerTick = () => {
		const ctx = canvasRef.current?.getContext("2d")
		if (!ctx) return

		frames.current++
		draw(ctx)

		const duration = new Date().getTime() - spinStart.current
		let progress = 0
		let finished = false

		if (duration < upDuration) {
			progress = duration / upDuration
			angleDelta.current = maxSpeed.current * Math.sin((progress * Math.PI) / 2)
		} else {
			progress = duration / downDuration
			angleDelta.current =
				maxSpeed.current * Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
			if (progress >= 1) finished = true
		}

		angleCurrent.current += angleDelta.current
		while (angleCurrent.current >= Math.PI * 2)
			angleCurrent.current -= Math.PI * 2

			if (finished) {
			// Stop the wheel animation but keep drawing for 3 seconds
			angleDelta.current = 0
			clearInterval(timerHandle.current)
			timerHandle.current = 0
			
			// Continue drawing for 3 seconds to show the needle on winning segment
			const showResultInterval = setInterval(() => {
				draw(ctx)
			}, 16) // ~60fps
			
			// After 3 seconds, finish the spin
			setTimeout(() => {
				clearInterval(showResultInterval)
				setFinished(true)
				if (currentSegment.current) {
					
					onFinished(currentSegment.current.text, currentSegment.current)
				}
				isStarted.current = false
				checkSpinEligibility() 
			}, 1000) // 3 seconds delay
		}
	}

	const drawSegment = useCallback((
		ctx: CanvasRenderingContext2D,
		key: number,
		lastAngle: number,
		angle: number
	) => {
		ctx.save()
		ctx.beginPath()
		ctx.moveTo(centerX, centerY)
		ctx.arc(centerX, centerY, size, lastAngle, angle, false)
		ctx.lineTo(centerX, centerY)
		ctx.closePath()
		ctx.fillStyle = segColors[key]
		ctx.fill()
		
		// Add attractive glow effect to segment borders
		ctx.shadowColor = "rgba(255, 255, 255, 0.6)"
		ctx.shadowBlur = 6
		ctx.strokeStyle = "rgba(255, 255, 255, 0.9)"
		ctx.lineWidth = 3
		ctx.stroke()
		ctx.shadowBlur = 0

		// Draw horizontal text (not rotated) with better positioning
		ctx.save()
		
		// Calculate text position to keep it horizontal and centered
		const textAngle = (lastAngle + angle) / 2
		const textRadius = size / 2 +30 // Moved much further from center for more space
		const textX = Math.cos(textAngle) * textRadius
		const textY = Math.sin(textAngle) * textRadius
		
		// Draw text horizontally at the calculated position with line breaks
		ctx.fillStyle = contrastColor
		ctx.font = `bold 1.5em ${fontFamily}` // Optimized font size for better spacing
		ctx.textAlign = "center"
		ctx.textBaseline = "middle"
		
		// Split text into lines for better readability
		const displayText = segmentTexts[key]
		const words = displayText.split(' ')
		const lines = []
		let currentLine = ''
		
		// Create lines with appropriate word wrapping for better text distribution
		for (let i = 0; i < words.length; i++) {
			const testLine = currentLine + (currentLine ? ' ' : '') + words[i]
			if (testLine.length <= 12) { // Increased character limit for more space
				currentLine = testLine
			} else {
				if (currentLine) {
					lines.push(currentLine)
					currentLine = words[i]
				} else {
					lines.push(words[i])
				}
			}
		}
		if (currentLine) {
			lines.push(currentLine)
		}
		
		// Draw each line with proper spacing
		const lineHeight = 20 // Increased line height for better spacing and less congestion
		const startY = centerY + textY - (lines.length - 1) * lineHeight / 2
		
		// Add enhanced text glow effect for better visibility
		ctx.shadowColor = "rgba(0, 0, 0, 1.0)"
		ctx.shadowBlur = 6
		ctx.shadowOffsetX = 2
		ctx.shadowOffsetY = 2
		
		// Draw text outline for better contrast
		ctx.strokeStyle = "rgba(0, 0, 0, 0.8)"
		ctx.lineWidth = 3
		ctx.lineJoin = "round"
		
		lines.forEach((line, index) => {
			const x = centerX + textX
			const y = startY + index * lineHeight
			// Draw outline first
			ctx.strokeText(line, x, y)
			// Then draw filled text
			ctx.fillText(line, x, y)
		})
		
		ctx.shadowBlur = 0
		ctx.shadowOffsetX = 0
		ctx.shadowOffsetY = 0
		ctx.restore()
	}, [centerX, centerY, size, segColors, contrastColor, fontFamily, segmentTexts])

	const drawWheel = useCallback((ctx: CanvasRenderingContext2D) => {
		ctx.clearRect(0, 0, 600, 600)
		let lastAngle = angleCurrent.current
		const PI2 = Math.PI * 2

		for (let i = 1; i <= segments.length; i++) {
			const angle = PI2 * (i / segments.length) + angleCurrent.current
			drawSegment(ctx, i - 1, lastAngle, angle)
			lastAngle = angle
		}

		// Draw center circle with enhanced glow
		ctx.beginPath()
		ctx.arc(centerX, centerY, 40, 0, PI2, false)
		ctx.closePath()
		ctx.fillStyle = primaryColor
		ctx.fill()
		
		// Add attractive glow effect to center circle border
		ctx.shadowColor = "rgba(255, 255, 255, 0.8)"
		ctx.shadowBlur = 8
		ctx.lineWidth = 6
		ctx.strokeStyle = contrastColor
		ctx.stroke()
		ctx.shadowBlur = 0
		
		// Draw center text with enhanced glow
		ctx.font = `bold 1.1em ${fontFamily}`
		ctx.fillStyle = contrastColor
		ctx.textAlign = "center"
		ctx.textBaseline = "middle"
		ctx.shadowColor = "rgba(0, 0, 0, 0.9)"
		ctx.shadowBlur = 3
		ctx.fillText(buttonText, centerX, centerY + 3)
		ctx.shadowBlur = 0

		// Draw outer circle with enhanced golden color and glow
		ctx.beginPath()
		ctx.arc(centerX, centerY, size, 0, PI2, false)
		ctx.closePath()
		ctx.lineWidth = 18
		ctx.strokeStyle = "#FFD700"
		ctx.shadowColor = "rgba(255, 215, 0, 0.8)"
		ctx.shadowBlur = 12
		ctx.stroke()
		ctx.shadowBlur = 0
	}, [segments, primaryColor, contrastColor, fontFamily, buttonText, size, drawSegment])

	const draw = (ctx: CanvasRenderingContext2D) => {
		drawWheel(ctx)
		drawNeedle(ctx)
	}

	const drawNeedle = (ctx: CanvasRenderingContext2D) => {
		// Draw attractive pointer with enhanced styling
		ctx.lineWidth = 3
		ctx.strokeStyle = "#FF0000"
		ctx.fillStyle = "#FF0000"
		ctx.shadowColor = "rgba(255, 215, 0, 0.8)"
		ctx.shadowBlur = 8
		
		ctx.beginPath()
		ctx.moveTo(centerX + 12, centerY - 40)
		ctx.lineTo(centerX - 12, centerY - 40)
		ctx.lineTo(centerX, centerY - 65)
		ctx.closePath()
		ctx.fill()
		ctx.stroke()
		ctx.shadowBlur = 0

		const change = angleCurrent.current + Math.PI / 2
		let i =
			segments.length -
			Math.floor((change / (Math.PI * 2)) * segments.length) -
			1
		if (i < 0) i += segments.length
		currentSegment.current = segments[i]
	}

	// Enhanced spin function with content manager integration
	// TODO: Backend Integration Point - Optionally fetch winning segment from backend
	// Expected API: POST /restaurants/{name}/spin-wheel/spin (can return pre-selected segment)
	// Currently using frontend weighted selection via content manager
	const spinWithContentManager = () => {
		if (!canSpin) {
			checkSpinEligibility()
			return
		}

		// Use content manager to select the winning segment
		// NOTE: This can be replaced with backend API call when backend is ready
		const winningSegment = spinWheelContentManager.selectSegment(restaurantId)
		if (winningSegment) {
			// Set the winning segment for the visual spin
			currentSegment.current = winningSegment
		}

		if (!isStarted.current) {
			isStarted.current = true
			spinStart.current = new Date().getTime()
			maxSpeed.current = Math.PI / segments.length
			frames.current = 0
			timerHandle.current = window.setInterval(onTimerTick, segments.length)
			
			// Spin attempt started
		}
	}

const instaUserId = getInstagramUsername()
	
	return (
    <>
		<div className="relative w-full max-w-sm mx-auto">
		{/* Enhanced background decorative elements */}
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			<div className="absolute top-5 left-5 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
			<div className="absolute bottom-5 right-5 w-28 h-28 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
			<div className="absolute top-1/2 left-1/4 w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-2xl opacity-15 animate-pulse" style={{animationDelay: '2s'}}></div>
			<div className="absolute top-1/4 right-1/4 w-16 h-16 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full blur-xl opacity-25 animate-pulse" style={{animationDelay: '0.5s'}}></div>
		</div>

			<div
				className="wheel-container relative z-10"
				style={{
					transform: "scale(1.1)",
					width: "85vmin",
					height: "85vmin",
					maxWidth: "350px",
					maxHeight: "350px",
					margin: "0 auto"
				}}
			>
				{/* Enhanced wheel glow effect */}
				<div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 scale-125 animate-pulse"></div>
				<div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full blur-2xl opacity-20 scale-110 animate-pulse" style={{animationDelay: '0.5s'}}></div>
				
				<canvas
					ref={canvasRef}
					width="600"
					height="600"
					className={`transition-all duration-500 relative z-10 ${
						closeModal ? "opacity-50 scale-95" : "opacity-100 scale-100"
					}`}
					style={{
						pointerEvents: (isFinished && isOnlyOnce) || closeModal ? "none" : "auto",
						width: "100%",
						height: "100%",
						aspectRatio: "1/1",
						filter: "drop-shadow(0 20px 40px rgba(147, 51, 234, 0.4)) drop-shadow(0 10px 20px rgba(236, 72, 153, 0.3))",
						transition: "all 0.3s ease-in-out"
					}}
				/>

				{/* Spin button with enhanced design */}
				<div className="flex flex-col items-center space-y-3 mt-6">
					<button
						className={`relative overflow-hidden font-black py-5 px-12 rounded-3xl transition-all duration-300 group text-lg min-w-[200px] ${
							!canSpin || closeModal
								? "bg-gradient-to-r from-gray-400 to-gray-500 text-gray-200 cursor-not-allowed shadow-lg"
								: "bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white hover:from-purple-700 hover:via-pink-700 hover:to-red-700 active:scale-95 hover:scale-105 shadow-2xl hover:shadow-3xl"
						}`}
						style={{
							boxShadow: !canSpin || closeModal 
								? "0 10px 25px rgba(0, 0, 0, 0.2), 0 4px 10px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
								: "0 20px 40px rgba(147, 51, 234, 0.4), 0 10px 20px rgba(236, 72, 153, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
						}}
						onClick={(!canSpin || closeModal) ? undefined : spinWithContentManager}
						disabled={!canSpin || closeModal}
					>
						{/* Enhanced animated background gradient */}
						{!canSpin || closeModal ? null : (
							<>
								<div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								<div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
								{/* Button press effect */}
								<div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-active:opacity-20 transition-opacity duration-150"></div>
							</>
						)}
						
						<span className="relative z-10 flex items-center justify-center gap-3">
							{!canSpin ? (
								<>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
									<span className="text-base">Cannot Spin</span>
								</>
							) : (
								<>
									<span className="tracking-wider text-lg font-black">SPIN TO WIN</span>
									<svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
									</svg>
								</>
							)}
						</span>
					</button>
					
					{spinMessage && (
						<div className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 rounded-lg p-2 shadow-md">
							<p className="text-xs text-center text-gray-700 font-semibold max-w-xs">
								{spinMessage}
							</p>
						</div>
					)}
				</div>
		</div>
	</div>

	

		
    
     {closeModal && (
 <div
	className="fixed inset-0 flex items-end bg-white backdrop-blur-md z-40"

>
	<div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-t-3xl p-6 w-full max-w-sm mx-auto space-y-3 transform transition-all duration-500 ease-out translate-y-0 animate-slide-up shadow-2xl mb-0 relative overflow-hidden">
		{/* Background decorative elements */}
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			<div className="absolute top-5 left-5 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
			<div className="absolute bottom-5 right-5 w-20 h-20 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full blur-xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
		</div>

		{/* Header with enhanced gradient text */}
		<div className="text-center space-y-2 relative z-10">
			<div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 shadow-2xl relative">
				<div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-60 scale-125 animate-pulse"></div>
				<svg className="w-10 h-10 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
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
		{/* 	<div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
				<div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
				<span>Limited time offer</span>
				<div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
			</div> */}
		</div>
		{/* Enhanced copy button */}
		<div className="space-y-1 relative z-10">
			<div className="text-center">
				<p className="text-sm font-medium text-gray-600 mb-2">Copy our Instagram handle:</p>
			</div>
			<div
				className={`w-full text-lg font-semibold py-1 rounded-2xl transition-all duration-500 flex items-center justify-between px-6 relative overflow-hidden group ${
					copySuccess 
						? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-200' 
						: isCopying
						? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-lg shadow-blue-200'
						: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300'
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
							<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
							</svg>
							<span className="font-medium">Copied!</span>
						</>
					) : (
						<>
							<div className="flex items-center gap-2">
								{/* <svg className="w-5 h-5 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
								</svg> */}
								<span className="font-medium">@{instaUserId}</span>
							</div>
						</>
					)}
				</span>
				{!isCopying && !copySuccess && (
					<div className="relative z-10">
						<svg 
							className="w-12 h-12 cursor-pointer hover:scale-110 active:scale-95 transition-all duration-200 opacity-90 hover:opacity-100 hover:bg-white hover:bg-opacity-20 rounded-xl p-2 backdrop-blur-sm" 
							fill="none" 
							stroke="currentColor" 
							viewBox="0 0 24 24"
							onClick={(e) => {
								e.stopPropagation();
								copyText(`@${instaUserId}`);
							}}
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
						</svg>
					</div>
				)}
			</div>
		</div>

		{/* Enhanced Post Story button */}
		<button
			onClick={() =>{ 
				if (typeof window !== 'undefined') {
					window.open("https://instagram.com")
				}
				setCloseModal(false)
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
				<svg className="w-5 h-5 opacity-80 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
			</div>
		</button>
		{/* Previous Winners Button - Always Visible */}
	<button
		onClick={() => {
			
			setShowWinnersModal(true);
		}}
		className="w-full max-w-sm mx-auto text-pink-500 font-bold text-base py-3 px-4 transition-all duration-200 hover:text-pink-600 active:scale-95 relative underline decoration-pink-500 hover:decoration-pink-600 decoration-2 underline-offset-2"
		style={{ color: '#ec4899' }}
	>
		Previous winner who won
	</button>
	</div>
</div>
)}

{/* Enhanced mobile-friendly copy notification */}
{copyNotification && (
	<div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
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
)}

{/* Previous Winners Modal */}
{showWinnersModal && (
	<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-[60] p-4" onClick={() => setShowWinnersModal(false)}>
		<div className="bg-white rounded-3xl p-6 w-full max-w-sm mx-auto space-y-2 transform transition-all duration-300 scale-100 shadow-2xl relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
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
				{previousWinners.map((winner, index) => (
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
				onClick={() => setShowWinnersModal(false)}
				className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white text-lg font-bold py-3 rounded-2xl transition-all duration-300 hover:from-gray-600 hover:to-gray-700 active:scale-95 shadow-lg hover:shadow-xl relative z-10"
			>
				Close
			</button>
		</div>
	</div>
)}

    </>


	)
}

export default WheelComponent
