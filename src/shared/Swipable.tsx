"use client"
import React, { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"

interface CarouselProps {
	reviews: string[]
}

const Carousel: React.FC<CarouselProps> = ({ reviews }) => {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [isPaused, setIsPaused] = useState(false)
	const [touchStart, setTouchStart] = useState<number | null>(null)
	const [touchEnd, setTouchEnd] = useState<number | null>(null)
	const sliderRef = useRef<HTMLDivElement>(null)
	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	const minSwipeDistance = 50

	const startAutoScroll = useCallback(() => {
		intervalRef.current = setInterval(() => {
			if (!isPaused) {
				setCurrentSlide((prev) => (prev + 1) % reviews.length)
			}
		}, 3000)
	}, [isPaused, reviews.length])

	useEffect(() => {
		startAutoScroll()
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}
	}, [startAutoScroll])

	const goToSlide = (index: number) => {
		setCurrentSlide(index)
	}

	const onTouchStart = (e: React.TouchEvent) => {
		setIsPaused(true)
		setTouchEnd(null)
		setTouchStart(e.targetTouches[0].clientX)
	}

	const onTouchMove = (e: React.TouchEvent) => {
		setTouchEnd(e.targetTouches[0].clientX)
	}

	const onTouchEnd = () => {
		if (!touchStart || !touchEnd) return

		const distance = touchStart - touchEnd
		const isLeftSwipe = distance > minSwipeDistance
		const isRightSwipe = distance < -minSwipeDistance

		if (isLeftSwipe) {
			// Next slide
			setCurrentSlide((prev) => (prev + 1) % reviews.length)
		} else if (isRightSwipe) {
			// Previous slide
			setCurrentSlide((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))
		}

		setTouchStart(null)
		setTouchEnd(null)

		// Resume auto scrolling after a short delay
		setTimeout(() => {
			setIsPaused(false)
		}, 1000)
	}

	useEffect(() => {
		if (sliderRef.current) {
			sliderRef.current.style.transition = "transform 0.5s ease"
			sliderRef.current.style.transform = `translateX(-${currentSlide * 100}%)`
		}
	}, [currentSlide])

	return (
		<div className="relative w-full">
			<div
				className="flex transition-transform h-auto duration-300 ease-in-out"
				ref={sliderRef}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
			>
				{reviews.map((image, index) => (
					<div key={index} className="w-full flex-shrink-0">
						<Image
							unoptimized
							src={image}
							alt={`Slide ${index + 1}`}
							width={800}
							height={400}
							className="w-full h-auto object-cover"
						/>
					</div>
				))}
			</div>

			{/* Pagination Dots */}
			<div
				className="absolute border-stone-900 bg-[#c0bdbd] mt-4 left-1/2 transform -translate-x-1/2 flex gap-2
			 px-4 rounded-full"
			>
				{reviews.map((_, index) => (
					<button
						key={index}
						className={`pb-4 rounded-full transition-all duration-300`}
						style={{
							width: "7px",
							height: "7px",
							background: currentSlide === index ? "black" : "#c0bdbd"
						}}
						onClick={() => goToSlide(index)}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	)
}

export default Carousel
