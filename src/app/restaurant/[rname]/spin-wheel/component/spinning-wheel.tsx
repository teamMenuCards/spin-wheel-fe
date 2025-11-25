"use client"

import { SpinWheelSegment } from "@/types/spin-wheel.type"
import React, { useCallback, useEffect, useRef, useState } from "react"
/* import { useGetRestaurantDetailByNameQuery } from "@/services/restaurant/get-restaurant-detail" */
import { spinSpinner, SpinSpinnerResult } from "@/services/graphql/spinner-spin"
import { CopyNotification } from "./CopyNotification"
import { InitialInstructionModal } from "./InitialInstructionModal"
import { PreviousWinnersModal } from "./PreviousWinnersModal"
import { SpinButton } from "./SpinButton"

interface WheelComponentProps {
	restaurantData: any
	segments: SpinWheelSegment[]
	restaurantId: string
	spinnerId?: string
	winningSegment?: string
	onFinished: (winner: string, segment: SpinWheelSegment) => void
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
	restaurantData,
	spinnerId,
	restaurantId: _restaurantId, // Unused but kept for API compatibility
	onFinished,
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
	const spinStart = useRef(0)
	const frames = useRef(0)
	const [canSpin, setCanSpin] = useState(true)
	const [spinMessage, setSpinMessage] = useState("")
	const [isSpinning, setIsSpinning] = useState(false)
	const [apiError, setApiError] = useState<string | null>(null)
	const [showErrorModal, setShowErrorModal] = useState(false)
	const targetSegment = useRef<SpinWheelSegment | null>(null)
	const targetAngle = useRef<number | null>(null) // Absolute target angle (with rotations)
	const normalizedTargetAngle = useRef<number | null>(null) // Normalized target angle (0-2PI, should match baseAngle)
	const initialAngle = useRef(0)

	const centerX = 300
	const centerY = 300
	const [closeModal, setCloseModal] = useState(true)
	const [copyNotification, setCopyNotification] = useState(false)
	const [isCopying, setIsCopying] = useState(false)
	const [copySuccess, setCopySuccess] = useState(false)
	const [showWinnersModal, setShowWinnersModal] = useState(false)

	const segmentsWithDefault = React.useMemo(() => {
		// Separate "No discount" segment from other segments
		const noDiscountSegment = segments.find(
			(segment) =>
				segment.discountType === "no_prize" &&
				segment.text.toLowerCase().includes("no discount")
		)
		const otherSegments = segments.filter(
			(segment) =>
				!(
					segment.discountType === "no_prize" &&
					segment.text.toLowerCase().includes("no discount")
				)
		)

		// Sort other segments by displayOrder to ensure consistent placement
		const sortedOtherSegments = [...otherSegments].sort((a, b) => {
			// Ensure displayOrder is defined, default to 999 if not
			const orderA = a.displayOrder ?? 999
			const orderB = b.displayOrder ?? 999
			return orderA - orderB
		})

		// Reorder: "No discount" first (displayOrder: 0), then other segments sorted by displayOrder
		let orderedSegments: SpinWheelSegment[]
		if (noDiscountSegment) {
			orderedSegments = [noDiscountSegment, ...sortedOtherSegments]
		} else {
			// If no "No discount" segment exists, create it
			const totalSegments = segments.length + 1
			const anglePerSegment = 360 / totalSegments

			const defaultNoDiscountSegment: SpinWheelSegment = {
				id: "default-no-discount",
				text: "No discount",
				color: "#808080",
				probability: 0,
				discountType: "no_prize",
				isActive: true,
				displayOrder: 0,
				startAngle: 0,
				endAngle: anglePerSegment,
				centerAngle: anglePerSegment / 2
			}

			orderedSegments = [defaultNoDiscountSegment, ...sortedOtherSegments]
		}

		// Always recalculate angles based on final order to ensure consistency
		// This ensures "No discount" is always at 0-72 degrees (or appropriate range)
		const totalSegments = orderedSegments.length
		const anglePerSegment = 360 / totalSegments

		const segmentsWithAngles = orderedSegments.map((segment, index) => {
			const startAngle = index * anglePerSegment
			const endAngle = (index + 1) * anglePerSegment
			const centerAngle = startAngle + anglePerSegment / 2

			return {
				...segment,
				startAngle,
				endAngle,
				centerAngle
			}
		})

		return segmentsWithAngles
	}, [segments])

	// Helper function to get the "No discount" segment
	const getNoDiscountSegment = (): SpinWheelSegment => {
		const noDiscountSegment = segmentsWithDefault.find(
			(segment) =>
				segment.discountType === "no_prize" &&
				segment.text.toLowerCase().includes("no discount")
		)

		// If not found, create a default one with angles
		if (!noDiscountSegment) {
			const totalSegments = segmentsWithDefault.length || 1
			const anglePerSegment = 360 / totalSegments
			return {
				id: "default-no-discount",
				text: "No discount",
				color: "#808080",
				probability: 0,
				discountType: "no_prize",
				isActive: true,
				displayOrder: 0,
				startAngle: 0,
				endAngle: anglePerSegment,
				centerAngle: anglePerSegment / 2
			}
		}

		return noDiscountSegment
	}

	const maxSpeed = useRef(Math.PI / (segments.length > 0 ? segments.length : 1))

	// Update maxSpeed when segmentsWithDefault changes
	useEffect(() => {
		maxSpeed.current = Math.PI / segmentsWithDefault.length
	}, [segmentsWithDefault])

	// Random winners data
	const previousWinners = [
		"Rajesh Kumar",
		"Priya Sharma",
		"Amit Patel",
		"Kavita Desai",
		"Rohit Mehta",
		"Anjali Shah",
		"Vikram Singh",
		"Neha Gupta",
		"Suresh Iyer",
		"Divya Reddy",
		"Arjun Nair",
		"Pooja Joshi",
		"Manish Agarwal",
		"Swati Malhotra",
		"Rahul Kapoor"
	]

	// Extract Instagram link from restaurant data
	const getInstagramLink = () => {
		const links = restaurantData?.dashboardLinks || []

		const instagramLink = links.find((link: any) => link.type === "INSTAGRAM")

		return instagramLink?.url || null
	}

	// Extract Instagram username from the link
	const getInstagramUsername = () => {
		const instagramLink = getInstagramLink()
		if (!instagramLink) return null
		const match = instagramLink.match(/instagram\.com\/([^\/\?]+)/)
		return match ? match[1] : null
	}
	async function copyText(textToCopy: string) {
		setIsCopying(true)
		setCopySuccess(false)

		// Add a small delay to show the spinning animation
		await new Promise((resolve) => setTimeout(resolve, 800))

		try {
			await navigator.clipboard.writeText(textToCopy)
			setCopySuccess(true)
			setCopyNotification(true)

			// Auto-hide notification and reset states after 2 seconds
			setTimeout(() => {
				setCopyNotification(false)
				setIsCopying(false)
				setCopySuccess(false)
			}, 2000)
		} catch (err) {
			console.error("Failed to copy text:", err)
			// Fallback for older browsers
			const textArea = document.createElement("textarea")
			textArea.value = textToCopy
			document.body.appendChild(textArea)
			textArea.select()
			try {
				document.execCommand("copy")
				setCopySuccess(true)
				setCopyNotification(true)
				setTimeout(() => {
					setCopyNotification(false)
					setIsCopying(false)
					setCopySuccess(false)
				}, 2000)
			} catch (fallbackErr) {
				console.error("Fallback copy failed:", fallbackErr)
				setIsCopying(false)
			}
			document.body.removeChild(textArea)
		}
	}

	// Extract colors and texts from segments
	const segColors = segmentsWithDefault.map((segment) => segment.color)
	const segmentTexts = segmentsWithDefault.map((segment) => segment.text)

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
		return () => {
			if (timerHandle.current) clearInterval(timerHandle.current)
		}
	}, [wheelInit])

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
			// Get the normalized target angle (the final stopping position)
			const normalizedTarget =
				normalizedTargetAngle.current !== null
					? normalizedTargetAngle.current
					: ((targetAngle.current % (Math.PI * 2)) + Math.PI * 2) %
					  (Math.PI * 2)

			// Calculate the shortest angle difference to target (always forward direction)
			let angleDiff = normalizedTarget - angleCurrent.current

			// Normalize angle difference to ensure we always rotate forward
			// If the difference is negative, add 2*PI to make it positive (forward rotation)
			if (angleDiff < 0) {
				angleDiff += 2 * Math.PI
			}
			// If the difference is more than 2*PI, we've already passed it, so add full rotations
			// This ensures we always have a forward path to the target
			if (angleDiff > 2 * Math.PI) {
				angleDiff = angleDiff % (2 * Math.PI)
			}

			if (duration < FAST_SPIN_DURATION) {
				const fastSpinSpeed = 0.5
				angleCurrent.current += fastSpinSpeed

				// Normalize angle to 0-2PI range
				while (angleCurrent.current >= Math.PI * 2)
					angleCurrent.current -= Math.PI * 2
				while (angleCurrent.current < 0) angleCurrent.current += Math.PI * 2
			} else if (duration < TOTAL_DURATION) {
				// Phase 2: Deceleration phase - smoothly stop at target (only forward rotation)
				const decelProgress =
					(duration - FAST_SPIN_DURATION) / DECELERATION_DURATION

				// Use easing function for smooth deceleration (ease-out cubic)
				const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
				const easedProgress = easeOutCubic(Math.min(decelProgress, 1))

				// Recalculate angle difference to target (always forward)
				let currentAngleDiff = normalizedTarget - angleCurrent.current
				if (currentAngleDiff < 0) {
					currentAngleDiff += 2 * Math.PI
				}

				// Calculate remaining distance to target
				const remainingDistance = currentAngleDiff

				if (remainingDistance > 0.01) {
					const speed = remainingDistance * (1 - easedProgress)

					angleCurrent.current += speed

					while (angleCurrent.current >= Math.PI * 2)
						angleCurrent.current -= Math.PI * 2
					while (angleCurrent.current < 0) angleCurrent.current += Math.PI * 2

					let finalAngleDiff = normalizedTarget - angleCurrent.current
					if (finalAngleDiff < 0) {
						finalAngleDiff += 2 * Math.PI
					}

					if (finalAngleDiff < 0.01 || finalAngleDiff > 2 * Math.PI - 0.01) {
						angleCurrent.current = normalizedTarget
						finished = true
					}
				} else {
					angleCurrent.current = normalizedTarget
					finished = true
				}

				if (decelProgress >= 1) {
					angleCurrent.current = normalizedTarget
					finished = true
				}
			} else {
				angleCurrent.current = normalizedTarget
				finished = true
			}
		} else {
			let progress = 0

			if (duration < upDuration) {
				progress = duration / upDuration
				angleDelta.current =
					maxSpeed.current * Math.sin((progress * Math.PI) / 2)
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
			angleDelta.current = 0
			clearInterval(timerHandle.current)
			timerHandle.current = 0
			isStarted.current = false

			if (
				targetAngle.current !== null &&
				normalizedTargetAngle.current !== null
			) {
				const normalizedTarget = normalizedTargetAngle.current
				angleCurrent.current = normalizedTarget
				draw(ctx)
			}

			const change = angleCurrent.current + Math.PI / 2

			let normalizedChange = change % (Math.PI * 2)
			if (normalizedChange < 0) normalizedChange += Math.PI * 2

			const anglePerSegment = (Math.PI * 2) / segmentsWithDefault.length
			let segmentIndex = Math.floor(normalizedChange / anglePerSegment)

			if (segmentIndex < 0) segmentIndex += segmentsWithDefault.length
			if (segmentIndex >= segmentsWithDefault.length)
				segmentIndex -= segmentsWithDefault.length

			// const finalSegment = segmentsWithDefault[segmentIndex] // Unused but kept for potential future use

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
				normalizedTargetAngle.current = null
				setCanSpin(true)
				setSpinMessage("")
			}, 500) // Small delay to show the result
		}
	}

	const drawSegment = useCallback(
		(
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
			const textRadius = size / 2 + 30 // Moved much further from center for more space
			const textX = Math.cos(textAngle) * textRadius
			const textY = Math.sin(textAngle) * textRadius

			// Draw text horizontally at the calculated position with line breaks
			ctx.fillStyle = contrastColor
			ctx.font = `bold 1.5em ${fontFamily}` // Optimized font size for better spacing
			ctx.textAlign = "center"
			ctx.textBaseline = "middle"

			// Split text into lines for better readability
			const displayText = segmentTexts[key]
			const words = displayText.split(" ")
			const lines = []
			let currentLine = ""

			// Create lines with appropriate word wrapping for better text distribution
			for (let i = 0; i < words.length; i++) {
				const testLine = currentLine + (currentLine ? " " : "") + words[i]
				if (testLine.length <= 12) {
					// Increased character limit for more space
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
			const startY = centerY + textY - ((lines.length - 1) * lineHeight) / 2

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
		},
		[centerX, centerY, size, segColors, contrastColor, fontFamily, segmentTexts]
	)

	const drawWheel = useCallback(
		(ctx: CanvasRenderingContext2D) => {
			ctx.clearRect(0, 0, 600, 600)
			let lastAngle = angleCurrent.current
			const PI2 = Math.PI * 2

			for (let i = 1; i <= segmentsWithDefault.length; i++) {
				const angle =
					PI2 * (i / segmentsWithDefault.length) + angleCurrent.current
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
		},
		[
			segmentsWithDefault,
			primaryColor,
			contrastColor,
			fontFamily,
			buttonText,
			size,
			drawSegment
		]
	)

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
			segmentsWithDefault.length -
			Math.floor((change / (Math.PI * 2)) * segmentsWithDefault.length) -
			1
		if (i < 0) i += segmentsWithDefault.length
		currentSegment.current = segmentsWithDefault[i]
	}

	const matchSegmentToApiResponse = (
		apiResult: SpinSpinnerResult | null
	): SpinWheelSegment | null => {
		if (!apiResult || !apiResult.offer) {
			return null
		}

		const offer = apiResult.offer

		// Priority 1: Match by discountValue (most reliable)
		// The server sends the winning segment with discountValue, use this to match
		if (offer.discountValue !== undefined) {
			const matched = segmentsWithDefault.find((segment) => {
				// Match by discountValue first (most accurate)
				if (segment.discountValue === offer.discountValue) {
					// Also verify discountType matches
					const segmentType = segment.discountType
					const apiType = offer.discountType?.toLowerCase() || ""

					const typeMatch =
						(segmentType === "percentage" &&
							(apiType === "percentage" || apiType === "")) ||
						(segmentType === "fixed" && apiType === "fixed") ||
						(segmentType === "free_item" &&
							(apiType === "free_item" || apiType === "free")) ||
						(segmentType === "no_prize" &&
							(apiType === "no_prize" ||
								apiType === "no prize" ||
								apiType === ""))

					return typeMatch
				}
				return false
			})

			if (matched) {
				return matched
			}
		}

		// Priority 2: Try to match by discountType and discountValue
		if (offer.discountType && offer.discountValue !== undefined) {
			const matched = segmentsWithDefault.find((segment) => {
				// Normalize discount types for comparison
				const segmentType = segment.discountType
				const apiType = offer.discountType.toLowerCase()

				// Check if types match
				const typeMatch =
					(segmentType === "percentage" && apiType === "percentage") ||
					(segmentType === "fixed" && apiType === "fixed") ||
					(segmentType === "free_item" &&
						(apiType === "free_item" || apiType === "free")) ||
					(segmentType === "no_prize" &&
						(apiType === "no_prize" || apiType === "no prize"))

				if (!typeMatch) return false

				// For percentage and fixed, check value match
				if (
					(segmentType === "percentage" || segmentType === "fixed") &&
					segment.discountValue
				) {
					return segment.discountValue === offer.discountValue
				}

				// For free_item and no_prize, just check type
				return true
			})

			if (matched) {
				return matched
			}
		}

		// Priority 3: Fallback - Try to match by offer name
		if (offer.name) {
			// Extract discount value from offer name (e.g., "spinner discount 60% on bill" -> 60)
			// Try multiple patterns: "60% off", "discount 60%", "60% discount", etc.
			const discountMatch =
				offer.name.match(/(\d+)%?\s*off/i) ||
				offer.name.match(/discount\s+(\d+)%/i) ||
				offer.name.match(/(\d+)%\s*discount/i) ||
				offer.name.match(/(\d+)%/i)
			const discountValue = discountMatch
				? parseInt(discountMatch[1], 10)
				: undefined

			if (discountValue !== undefined) {
				// Try to match by discount value and type
				const matched = segmentsWithDefault.find((segment) => {
					if (
						segment.discountType === "percentage" &&
						segment.discountValue === discountValue
					) {
						return true
					}
					// Also check if segment text contains the discount value
					const segmentText = segment.text.toLowerCase()
					return (
						segmentText.includes(`${discountValue}%`) ||
						segmentText.includes(`${discountValue} off`)
					)
				})
				if (matched) {
					return matched
				}
			}

			// Try to match by text/label similarity
			const offerNameLower = offer.name.toLowerCase()
			const matched = segmentsWithDefault.find((segment) => {
				const segmentText = segment.text.toLowerCase()

				// Check if offer name contains segment text or vice versa
				if (
					segmentText.includes(offerNameLower) ||
					offerNameLower.includes(segmentText)
				) {
					return true
				}

				// Check if both contain the same discount value
				if (discountValue !== undefined) {
					return (
						segmentText.includes(`${discountValue}%`) ||
						segmentText.includes(`${discountValue} off`)
					)
				}

				return false
			})

			if (matched) {
				return matched
			}
		}

		// Last resort: return "No discount" segment if no match found
		const fallbackSegment = getNoDiscountSegment()
		return fallbackSegment
	}

	/**
	 * Calculate the target angle for a given segment using its centerAngle property
	 * The needle uses angleCurrent + PI/2 to determine which segment it points to
	 * We need to position the segment so its center is at the top where the needle points
	 * Uses the segment's centerAngle (in degrees) converted to radians
	 * Returns both absolute angle (with rotations) and normalized angle (0-2PI, baseAngle)
	 */
	const calculateTargetAngle = (
		segment: SpinWheelSegment
	): { absolute: number; normalized: number } => {
		// Use the segment's centerAngle if available (in degrees)
		let segmentCenterAngleRad: number

		if (segment.centerAngle !== undefined) {
			// Convert centerAngle from degrees to radians
			segmentCenterAngleRad = (segment.centerAngle * Math.PI) / 180
		} else {
			// Fallback: calculate center angle from segment index
			const segmentIndex = segmentsWithDefault.findIndex(
				(s) => s.id === segment.id
			)
			if (segmentIndex === -1) {
				return { absolute: 0, normalized: 0 }
			}

			// Each segment occupies (2 * PI) / segmentsWithDefault.length radians
			const segmentAngle = (2 * Math.PI) / segmentsWithDefault.length
			segmentCenterAngleRad = segmentIndex * segmentAngle + segmentAngle / 2
		}

		let baseAngle = -Math.PI / 2 - segmentCenterAngleRad

		while (baseAngle < 0) baseAngle += 2 * Math.PI
		while (baseAngle >= 2 * Math.PI) baseAngle -= 2 * Math.PI

		const fullRotations = 2 + Math.random() * 1 // 2-3 full rotations

		let targetAngle = baseAngle + fullRotations * 2 * Math.PI

		const currentAbs = angleCurrent.current
		const EPS = 0.0001

		while (targetAngle <= currentAbs + EPS) {
			targetAngle += 2 * Math.PI
		}

		const normalizedTarget = baseAngle

		return { absolute: targetAngle, normalized: normalizedTarget }
	}

	const spinWithContentManager = async () => {
		if (!canSpin || isSpinning) {
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
			// Reset error state
			setApiError(null)
			setShowErrorModal(false)

			const apiResult = await spinSpinner(spinnerId)

			let targetSegmentToUse: SpinWheelSegment | null = null

			// Case 1: API returned null (entire response is null)
			if (!apiResult) {
				setApiError(
					"Unable to connect to the server. Please check your connection and try again."
				)
				setShowErrorModal(true)
				setIsSpinning(false)
				setCanSpin(true)
				return // Don't proceed with spinning
			}
			// Case 2: API returned result but offer is null
			else if (!apiResult.offer) {
				targetSegmentToUse = getNoDiscountSegment()
			}
			// Case 3: API returned result with offer - try to match it
			else {
				const matchedSegment = matchSegmentToApiResponse(apiResult)

				if (!matchedSegment) {
					targetSegmentToUse = getNoDiscountSegment()
				} else {
					targetSegmentToUse = matchedSegment
				}
			}

			// Set the target segment and angle
			if (targetSegmentToUse) {
				targetSegment.current = targetSegmentToUse
				const targetAngleResult = calculateTargetAngle(targetSegmentToUse)
				targetAngle.current = targetAngleResult.absolute
				normalizedTargetAngle.current = targetAngleResult.normalized
			} else {
				// Fallback: should never happen, but just in case
				const noDiscountSegment = getNoDiscountSegment()
				targetSegment.current = noDiscountSegment
				const targetAngleResult = calculateTargetAngle(noDiscountSegment)
				targetAngle.current = targetAngleResult.absolute
				normalizedTargetAngle.current = targetAngleResult.normalized
			}

			// Store initial angle
			initialAngle.current = angleCurrent.current

			// Start the spinning animation
			if (!isStarted.current) {
				isStarted.current = true
				spinStart.current = new Date().getTime()
				maxSpeed.current = Math.PI / segmentsWithDefault.length
				frames.current = 0
				timerHandle.current = window.setInterval(onTimerTick, 16) // ~60fps
			}
		} catch (error: any) {
			// Catch all errors: network errors, API errors, parsing errors, etc.
			console.error("Error spinning spinner:", error)

			// Enhanced error message handling
			let errorMessage = "Unable to connect to the server. Please check your connection and try again."
			
			if (error?.isNetworkError || error?.networkError) {
				// Network error - provide helpful message
				errorMessage = error?.message || 
					"Unable to connect to the server. Please check your internet connection and ensure the server is running."
			} else if (error?.message) {
				// Use the error message if available
				errorMessage = error.message
			} else if (error?.networkError?.message) {
				// Fallback to network error message
				errorMessage = error.networkError.message
			} else if (error?.graphQLErrors && error.graphQLErrors.length > 0) {
				// GraphQL errors
				errorMessage = error.graphQLErrors[0].message || errorMessage
			}
			
			setApiError(errorMessage)
			setShowErrorModal(true)
			setIsSpinning(false)
			setCanSpin(true)
			// Don't proceed with spinning on error
		}
	}

	const instaUserId = getInstagramUsername()

	return (
		<>
			<div className="relative w-full max-w-sm mx-auto">
				{/* Enhanced background decorative elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute top-5 left-5 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
					<div
						className="absolute bottom-5 right-5 w-28 h-28 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse"
						style={{ animationDelay: "1s" }}
					></div>
					<div
						className="absolute top-1/2 left-1/4 w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-2xl opacity-15 animate-pulse"
						style={{ animationDelay: "2s" }}
					></div>
					<div
						className="absolute top-1/4 right-1/4 w-16 h-16 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full blur-xl opacity-25 animate-pulse"
						style={{ animationDelay: "0.5s" }}
					></div>
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
					<div
						className="absolute inset-0 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full blur-2xl opacity-20 scale-110 animate-pulse"
						style={{ animationDelay: "0.5s" }}
					></div>

					<canvas
						ref={canvasRef}
						width="600"
						height="600"
						className={`transition-all duration-500 relative z-10 ${
							closeModal ? "opacity-50 scale-95" : "opacity-100 scale-100"
						}`}
						style={{
							pointerEvents:
								(isFinished && isOnlyOnce) || closeModal ? "none" : "auto",
							width: "100%",
							height: "100%",
							aspectRatio: "1/1",
							filter:
								"drop-shadow(0 20px 40px rgba(147, 51, 234, 0.4)) drop-shadow(0 10px 20px rgba(236, 72, 153, 0.3))",
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

			{/* Error Modal for API errors */}
			{showErrorModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
					<div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200 animate-in fade-in zoom-in duration-300">
						{/* Background decorative elements */}
						<div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
							<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-red-100 to-orange-100 rounded-full blur-3xl opacity-30"></div>
							<div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full blur-2xl opacity-30"></div>
						</div>

						<div className="relative z-10">
							{/* Error Icon */}
							<div className="flex justify-center mb-4">
								<div className="relative">
									<div className="w-16 h-16 bg-gradient-to-r from-red-100 to-orange-100 rounded-full flex items-center justify-center">
										<svg
											className="w-8 h-8 text-red-500"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
											/>
										</svg>
									</div>
									<div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
										<span className="text-white text-xs font-bold">!</span>
									</div>
								</div>
							</div>

							{/* Error Title */}
							<h3 className="text-2xl font-bold text-center mb-3 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
								Oops! Something went wrong
							</h3>

							{/* Error Message */}
							<p className="text-gray-600 text-center mb-6 leading-relaxed">
								{apiError || "We couldn't process your spin. Please try again."}
							</p>

							{/* Action Buttons */}
							<div className="flex flex-col sm:flex-row gap-3">
								<button
									onClick={() => {
										setShowErrorModal(false)
										setApiError(null)
									}}
									className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
								>
									Close
								</button>
								<button
									onClick={() => {
										setShowErrorModal(false)
										setApiError(null)
										// Retry the spin
										spinWithContentManager()
									}}
									className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
								>
									🔄 Try Again
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default WheelComponent
