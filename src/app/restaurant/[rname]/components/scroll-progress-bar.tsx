"use client"

import { useScrollContext } from "@/app/providers/ProgressbarProvider"
import Image from "next/image"

export default function ScrollProgressBar() {
	const { scrollProgress } = useScrollContext()

	return (
		<div className="fixed z-50 top-0 left-0 w-full pointer-events-none">
			{/* Progress bar with transform for better performance */}
			<div
				className="h-1 bg-lime-500 transition-transform duration-100 ease-out relative"
				style={{ 
					transform: `translateX(${scrollProgress - 100}%)`,
					willChange: 'transform'
				}}
			>
				{/* Food icon that moves with the progress */}
				<div
					className="absolute -top-2 right-0 transition-transform duration-100 ease-out"
					style={{ 
						transform: `translateX(${scrollProgress}%)`,
						willChange: 'transform'
					}}
				>
					<Image 
						src="/bag.webp" 
						alt="food" 
						width={25} 
						height={25}
						priority
						className="drop-shadow-sm"
					/>
				</div>
			</div>
		</div>
	)
}
