"use client"
import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface CarouselProps {
	reviews: string[]
}

const Carousel: React.FC<CarouselProps> = ({ reviews }) => {
	const [currentSlide, setCurrentSlide] = useState(0)
	const sliderRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % reviews.length)
		}, 3000)

		return () => clearInterval(interval)
	}, [reviews.length])

	const goToSlide = (index: number) => {
		setCurrentSlide(index)
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
					/>
				))}
			</div>
		</div>
	)
}

export default Carousel
