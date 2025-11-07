"use client"
import React, { useEffect, useState, useRef, useCallback } from "react"
import { SpinWheelSegment } from "@/types/spin-wheel.type"
import { spinWheelContentManager } from "@/lib/spin-wheel-content-manager"
import { useGetRestaurantDetailByNameQuery } from "@/services/restaurant/get-restaurant-detail"
import { useParams } from "next/navigation"
import { spinSpinner, SpinSpinnerResult } from "@/services/graphql/spinner-spin"
import { InitialInstructionModal } from "./InitialInstructionModal"
import { CopyNotification } from "./CopyNotification"
import { PreviousWinnersModal } from "./PreviousWinnersModal"
import { SpinButton } from "./SpinButton"

interface WheelComponentProps {
	segments: SpinWheelSegment[]
	restaurantId: string
	spinnerId?: string
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
	spinnerId,
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
	const [isSpinning, setIsSpinning] = useState(false)
	const targetSegment = useRef<SpinWheelSegment | null>(null)
	const targetAngle = useRef<number | null>(null)
	const initialAngle = useRef(0)
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
		const FAST_SPIN_DURATION = 3000 // 3 seconds of fast spinning
		const DECELERATION_DURATION = 1000 // 1 second to decelerate and stop
		const TOTAL_DURATION = FAST_SPIN_DURATION + DECELERATION_DURATION
		let finished = false

		// If we have a target angle, animate towards it
		if (targetAngle.current !== null) {
			if (duration < FAST_SPIN_DURATION) {
				// Phase 1: Fast spinning for 3 seconds
				// Spin fast at constant speed (multiple rotations per second)
				// At 60fps, 0.5 radians/frame = 30 radians/sec ≈ 4.77 rotations/sec
				const fastSpinSpeed = 0.5 // radians per frame (fast spinning)
				angleCurrent.current += fastSpinSpeed
				
				// Normalize angle to 0-2PI range
				while (angleCurrent.current >= Math.PI * 2)
					angleCurrent.current -= Math.PI * 2
				while (angleCurrent.current < 0)
					angleCurrent.current += Math.PI * 2
			} else if (duration < TOTAL_DURATION) {
				// Phase 2: Deceleration phase - smoothly stop at target
				const decelProgress = (duration - FAST_SPIN_DURATION) / DECELERATION_DURATION
				
				// Use easing function for smooth deceleration (ease-out cubic)
				const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
				const easedProgress = easeOutCubic(Math.min(decelProgress, 1))
				
				// Calculate the angle difference from current position to target
				let angleDiff = targetAngle.current - angleCurrent.current
				
				// Normalize angle difference to shortest path (-PI to PI)
				while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI
				while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI
				
				// Interpolate from current angle to target angle
				angleCurrent.current = angleCurrent.current + angleDiff * easedProgress
				
				// Normalize angle to 0-2PI range
				while (angleCurrent.current >= Math.PI * 2)
					angleCurrent.current -= Math.PI * 2
				while (angleCurrent.current < 0)
					angleCurrent.current += Math.PI * 2
				
				// Check if we've reached the target
				if (decelProgress >= 1) {
					finished = true
				}
			} else {
				finished = true
			}
		} else {
			// Fallback to old animation if no target angle
			let progress = 0

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
		}

		if (finished) {
			// Stop the wheel animation
			angleDelta.current = 0
			clearInterval(timerHandle.current)
			timerHandle.current = 0
			isStarted.current = false
			
			// Ensure we're at the exact target angle
			if (targetAngle.current !== null) {
				angleCurrent.current = targetAngle.current % (Math.PI * 2)
				if (angleCurrent.current < 0) angleCurrent.current += Math.PI * 2
				draw(ctx)
			}
			
			// Wait a moment to show the result, then finish
			setTimeout(() => {
				setFinished(true)
				setIsSpinning(false)
				
				if (targetSegment.current) {
					currentSegment.current = targetSegment.current
					onFinished(targetSegment.current.text, targetSegment.current)
				} else if (currentSegment.current) {
					onFinished(currentSegment.current.text, currentSegment.current)
				}
				
				// Reset for next spin
				targetSegment.current = null
				targetAngle.current = null
				checkSpinEligibility()
			}, 500) // Small delay to show the result
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

	/**
	 * Match API response to a segment in the wheel
	 * Matches by discountType and discountValue, or by offer name
	 */
	const matchSegmentToApiResponse = (apiResult: SpinSpinnerResult | null): SpinWheelSegment | null => {
		if (!apiResult || !apiResult.offer) {
			return null
		}

		const offer = apiResult.offer
		
		// Try to match by discountType and discountValue first
		if (offer.discountType && offer.discountValue !== undefined) {
			const matched = segments.find(segment => {
				// Normalize discount types for comparison
				const segmentType = segment.discountType
				const apiType = offer.discountType.toLowerCase()
				
				// Check if types match
				const typeMatch = 
					(segmentType === 'percentage' && apiType === 'percentage') ||
					(segmentType === 'fixed' && apiType === 'fixed') ||
					(segmentType === 'free_item' && (apiType === 'free_item' || apiType === 'free')) ||
					(segmentType === 'no_prize' && (apiType === 'no_prize' || apiType === 'no prize'))
				
				if (!typeMatch) return false
				
				// For percentage and fixed, check value match
				if ((segmentType === 'percentage' || segmentType === 'fixed') && segment.discountValue) {
					return segment.discountValue === offer.discountValue
				}
				
				// For free_item and no_prize, just check type
				return true
			})
			
			if (matched) return matched
		}
		
		// Fallback: Try to match by offer name
		if (offer.name) {
			// Extract discount value from offer name (e.g., "spinner discount 60% on bill" -> 60)
			// Try multiple patterns: "60% off", "discount 60%", "60% discount", etc.
			const discountMatch = offer.name.match(/(\d+)%?\s*off/i) || 
								  offer.name.match(/discount\s+(\d+)%/i) ||
								  offer.name.match(/(\d+)%\s*discount/i) ||
								  offer.name.match(/(\d+)%/i)
			const discountValue = discountMatch ? parseInt(discountMatch[1], 10) : undefined
			
			if (discountValue !== undefined) {
				// Try to match by discount value and type
				const matched = segments.find(segment => {
					if (segment.discountType === 'percentage' && segment.discountValue === discountValue) {
						return true
					}
					// Also check if segment text contains the discount value
					const segmentText = segment.text.toLowerCase()
					return segmentText.includes(`${discountValue}%`) || segmentText.includes(`${discountValue} off`)
				})
				if (matched) return matched
			}
			
			// Try to match by text/label similarity
			const offerNameLower = offer.name.toLowerCase()
			const matched = segments.find(segment => {
				const segmentText = segment.text.toLowerCase()
				
				// Check if offer name contains segment text or vice versa
				if (segmentText.includes(offerNameLower) || offerNameLower.includes(segmentText)) {
					return true
				}
				
				// Check if both contain the same discount value
				if (discountValue !== undefined) {
					return segmentText.includes(`${discountValue}%`) || segmentText.includes(`${discountValue} off`)
				}
				
				return false
			})
			
			if (matched) return matched
		}
		
		// Last resort: return first segment if no match found
		console.warn("Could not match API response to segment, using first segment as fallback", apiResult)
		return segments.length > 0 ? segments[0] : null
	}

	/**
	 * Calculate the target angle for a given segment
	 * The needle uses angleCurrent + PI/2 to determine which segment it points to
	 * We need to position the segment so its center is at the top where the needle points
	 */
	const calculateTargetAngle = (segment: SpinWheelSegment): number => {
		const segmentIndex = segments.findIndex(s => s.id === segment.id)
		if (segmentIndex === -1) {
			console.warn("Segment not found, using index 0")
			return 0
		}
		
		// Each segment occupies (2 * PI) / segments.length radians
		const segmentAngle = (2 * Math.PI) / segments.length
		
		// The center of the segment in the wheel's coordinate system
		// Segments are drawn starting from angle 0, so segment 0 starts at 0
		// Segment center = segmentIndex * segmentAngle + segmentAngle / 2
		const segmentCenterAngle = segmentIndex * segmentAngle + segmentAngle / 2
		
		// The needle calculation uses: change = angleCurrent + PI/2
		// To position the segment center at the top (where needle points), we need:
		// angleCurrent + PI/2 = segmentCenterAngle (mod 2*PI)
		// So: angleCurrent = segmentCenterAngle - PI/2 (mod 2*PI)
		// But we want to add multiple full rotations for suspense (2-3 rotations)
		const fullRotations = 2 + Math.random() * 1 // 2-3 full rotations
		const baseAngle = segmentCenterAngle - Math.PI / 2
		
		// Add full rotations and normalize
		let targetAngle = baseAngle + fullRotations * 2 * Math.PI
		
		// Normalize to 0-2PI range
		while (targetAngle < 0) targetAngle += 2 * Math.PI
		while (targetAngle >= 2 * Math.PI) targetAngle -= 2 * Math.PI
		
		return targetAngle
	}

	/**
	 * Enhanced spin function with API integration
	 * Calls the spinSpinner API to get the winning segment, then animates the wheel
	 */
	const spinWithContentManager = async () => {
		if (!canSpin || isSpinning) {
			checkSpinEligibility()
			return
		}

		if (!spinnerId) {
			console.error("Spinner ID is required to spin")
			setSpinMessage("Spinner not available")
			return
		}

		// Disable spinning during API call
		setIsSpinning(true)
		setCanSpin(false)
		setFinished(false)

		try {
			// Call the API to get the winning segment
			const apiResult = await spinSpinner(spinnerId)
			console.log("API Spin Result:", apiResult)

			// Match API response to a segment
			const matchedSegment = matchSegmentToApiResponse(apiResult)
			
			if (!matchedSegment) {
				console.error("Could not match API response to segment")
				// Fallback to content manager selection
				const fallbackSegment = spinWheelContentManager.selectSegment(restaurantId)
				if (fallbackSegment) {
					targetSegment.current = fallbackSegment
					targetAngle.current = calculateTargetAngle(fallbackSegment)
				} else {
					setIsSpinning(false)
					setCanSpin(true)
					setSpinMessage("Unable to spin. Please try again.")
					return
				}
			} else {
				targetSegment.current = matchedSegment
				targetAngle.current = calculateTargetAngle(matchedSegment)
			}

			// Store initial angle
			initialAngle.current = angleCurrent.current
			
			// Start the spinning animation
			if (!isStarted.current) {
				isStarted.current = true
				spinStart.current = new Date().getTime()
				maxSpeed.current = Math.PI / segments.length
				frames.current = 0
				timerHandle.current = window.setInterval(onTimerTick, 16) // ~60fps
			}
		} catch (error) {
			console.error("Error spinning spinner:", error)
			setIsSpinning(false)
			setCanSpin(true)
			setSpinMessage("Error spinning. Please try again.")
			
			// Fallback to content manager on error
			const fallbackSegment = spinWheelContentManager.selectSegment(restaurantId)
			if (fallbackSegment) {
				targetSegment.current = fallbackSegment
				targetAngle.current = calculateTargetAngle(fallbackSegment)
				
				if (!isStarted.current) {
					isStarted.current = true
					spinStart.current = new Date().getTime()
					maxSpeed.current = Math.PI / segments.length
					frames.current = 0
					timerHandle.current = window.setInterval(onTimerTick, 16)
				}
			}
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
				<SpinButton
					canSpin={canSpin}
					isSpinning={isSpinning}
					closeModal={closeModal}
					onClick={spinWithContentManager}
				/>
				
				{spinMessage && (
					<div className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 rounded-lg p-2 shadow-md">
						<p className="text-xs text-center text-gray-700 font-semibold max-w-xs">
							{spinMessage}
						</p>
					</div>
				)}
		</div>
	</div>

	

		<InitialInstructionModal
			isOpen={closeModal}
			onClose={() => setCloseModal(false)}
			onShowWinners={() => setShowWinnersModal(true)}
			instagramUsername={instaUserId}
			onCopyText={copyText}
			isCopying={isCopying}
			copySuccess={copySuccess}
		/>

		<CopyNotification isVisible={copyNotification} />

		<PreviousWinnersModal
			isOpen={showWinnersModal}
			onClose={() => setShowWinnersModal(false)}
			winners={previousWinners}
		/>

    </>


	)
}

export default WheelComponent
