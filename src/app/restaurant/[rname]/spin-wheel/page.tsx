"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import WheelComponent from "./component/spinning-wheel"
import { useParams } from "next/navigation"
import { SpinWheelSegment } from "@/types/spin-wheel.type"
import { spinWheelContentManager } from "@/lib/spin-wheel-content-manager"
import { SpinWheelContentConfig } from "@/lib/spin-wheel-content-manager"
import { useSpinnerForRestaurant } from "@/hooks/useSpinnerForRestaurant"
import ReferralPopup from "./component/referralPopUp"
import { getRestaurantDetailsClient } from "@/services/graphql/restaurant"

export default function WheelPage() {
	const [showPopup, setShowPopup] = useState(false)
	const [showThankYouPopup, setShowThankYouPopup] = useState(false)
	const [currentPrize, setCurrentPrize] = useState("")
	const [currentSegment, setCurrentSegment] = useState<SpinWheelSegment | null>(
		null
	)
	const [spinFinished, setSpinFinished] = useState(false)
	const [showScrollToTop, setShowScrollToTop] = useState(false)
	const { rname } = useParams<{ rname: string }>()

	// State for restaurant details
	const [restaurantId, setRestaurantId] = useState<string>('')
	const [restaurantLoading, setRestaurantLoading] = useState(true)
	const [restaurantData, setRestaurantData] = useState<any>(null)

	// Fetch restaurant details using the new API
	useEffect(() => {
		const fetchRestaurantDetails = async () => {
			try {
				setRestaurantLoading(true)
				const details = await getRestaurantDetailsClient(rname)
				
				if (details) {
					setRestaurantData(details)
					setRestaurantId(details.id || '')
				} else {
					setRestaurantId('')
				}
			} catch (error) {
				setRestaurantId('')
			} finally {
				setRestaurantLoading(false)
			}
		}

		if (rname) {
			fetchRestaurantDetails()
		}
	}, [rname])

	// Fetch spinner data from API
	const { data: spinnerData, loading: spinnerLoading, error: spinnerError } = 
		useSpinnerForRestaurant(restaurantId)
	console.log("spinnerData", spinnerData)

	// State for content manager config
	const [segments, setSegments] = useState<SpinWheelSegment[]>([])
	const [configLoading, setConfigLoading] = useState(true)
	// State setters for config and active flag (values unused to avoid lint errors)
	const [, setContentManagerConfig] = useState<SpinWheelContentConfig | null>(null)
	const [, setIsSpinWheelActive] = useState<boolean>(true)

	// Extract review links from restaurant data
	const getReviewLinks = () => {
		if (!restaurantData?.detail?.details?.platform_details) {
			return { googleReviewLink: '', zomatoReviewLink: '' }
		}

		const platformDetails = restaurantData.detail.details.platform_details
		const links: Record<string, string> = {}

		platformDetails.forEach((item: { platform_name: string; platform_uri: string }) => {
			links[item.platform_name] = item.platform_uri
		})

		return {
			googleReviewLink: links['google-review'] || '',
			zomatoReviewLink: links['zomato-dine-in'] || ''
		}
	}

	const { googleReviewLink, zomatoReviewLink } = getReviewLinks()

	useEffect(() => {
		const loadConfig = () => {
			try {
			
				if (!restaurantId) {
					return
				}

				if (spinnerLoading) {
					return
				}

				// Check if spinner data is available (null means API returned no data, undefined means still loading)
				if (spinnerData === undefined) {
					return
				}

				// Parse API data using content manager
				// Pass spinnerData even if null (to indicate no data found)
				const config = spinWheelContentManager.getConfig(restaurantId, spinnerData || null)

				if (config && config.segments && config.segments.length > 0) {
					setContentManagerConfig(config)
					setSegments(config.segments)
					setIsSpinWheelActive(config.isActive ?? true)
				} else {
					setContentManagerConfig(null)
					setSegments([])
					setIsSpinWheelActive(false)
				}
			} catch (error) {
				setSegments([])
				setIsSpinWheelActive(false)
			} finally {
				setConfigLoading(false)
			}
		}

		// Load config when restaurant ID and spinner data are available
		if (restaurantId && !spinnerLoading) {
			loadConfig()
		} else if (!restaurantId && !restaurantLoading) {
			setConfigLoading(false)
		}
	}, [restaurantId, spinnerData, spinnerLoading, spinnerError, restaurantData, restaurantLoading])

	
	useEffect(() => {
		const handleScroll = () => {
			const scrollContainer = document.querySelector('.overflow-y-auto');
			if (scrollContainer) {
				const { scrollTop } = scrollContainer;
				const isAtTop = scrollTop < 100; 
				setShowScrollToTop(!isAtTop);
			}
		};

		// Add scroll listener when popup is shown
		if (showPopup) {
			const scrollContainer = document.querySelector('.overflow-y-auto');
			if (scrollContainer) {
				scrollContainer.addEventListener('scroll', handleScroll);
				// Initial check
				handleScroll();
			}
		}

		return () => {
			const scrollContainer = document.querySelector('.overflow-y-auto');
			if (scrollContainer) {
				scrollContainer.removeEventListener('scroll', handleScroll);
			}
		};
	}, [showPopup])


	const handleSpinFinish = async (
		winner: string,
		segment: SpinWheelSegment
	) => {
		setCurrentPrize(winner)
		setCurrentSegment(segment)

		
		setSpinFinished(true)
		
		// Only show referral popup if there's an actual discount (not "Better Luck Next Time")
		if (segment.discountType !== 'no_prize' && winner !== "Better Luck Next Time!") {
			setShowPopup(true)
		} else {
			// Go directly to thank you page for "Better Luck Next Time"
			setShowThankYouPopup(true)
		}
	}

	const handleSubmit = (selectedOptions: string, otherText?: string) => {
		setShowThankYouPopup(true)
		setShowPopup(false)
	}


	const getDiscountValue = () => {
		if (!currentSegment) return 200 // Default fallback
		
		if (currentSegment.discountType === 'no_prize') {
			return 0
		}
		
		if (currentSegment.discountType === 'percentage' && currentSegment.discountValue) {
			// For percentage discounts, show a reasonable estimated amount
			// This could be enhanced to calculate based on average order value
			return currentSegment.discountValue
		}
		
		if (currentSegment.discountType === 'fixed' && currentSegment.discountValue) {
			return currentSegment.discountValue
		}
		
		// For free items, show a nominal discount value
		if (currentSegment.discountType === 'free_item') {
			return 150 // Default value for free items
		}
		
		return 200 // Default fallback
	}

	

	// Show loading state while config is loading or segments are empty
	if (configLoading || segments.length === 0) {
		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
				<div className="bg-white rounded-3xl p-8 text-center shadow-2xl border border-gray-200 relative overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 opacity-50"></div>
					<div className="relative z-10">
						<div className="relative">
							<div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6">
								<div className="absolute inset-2 rounded-full border-2 border-transparent border-t-white animate-spin"></div>
							</div>
							<div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-lg opacity-30"></div>
						</div>
						<h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
							Loading Spin Wheel
						</h3>
						<p className="text-gray-600">Preparing your lucky experience...</p>
						{spinnerError && (
							<p className="text-red-500 text-sm mt-2">Error: {spinnerError.message}</p>
						)}
						{!restaurantId && !restaurantLoading && (
							<p className="text-yellow-500 text-sm mt-2">Restaurant ID not found</p>
						)}
						{restaurantId && !spinnerLoading && !spinnerData && (
							<p className="text-yellow-500 text-sm mt-2">No spinner data found for this restaurant</p>
						)}
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="w-full min-h-screen h-screen">
			{!spinFinished && !showPopup && (
				<div className="fixed inset-0 z-50 flex flex-col bg-white h-screen items-center justify-between py-4 sm:py-6 lg:py-8 px-4 sm:px-6">
					{/* Background decorative elements */}
					<div className="absolute inset-0 overflow-hidden pointer-events-none">
						<div className="absolute top-8 sm:top-12 left-8 sm:left-12 w-24 sm:w-32 lg:w-36 h-24 sm:h-32 lg:h-36 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>
						<div className="absolute bottom-8 sm:bottom-12 right-8 sm:right-12 w-32 sm:w-40 lg:w-44 h-32 sm:h-40 lg:h-44 bg-gradient-to-r from-pink-100 to-indigo-100 rounded-full blur-3xl opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
						<div className="absolute top-1/2 left-1/4 w-20 sm:w-24 lg:w-28 h-20 sm:h-24 lg:h-28 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full blur-2xl opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
					</div>
					
					{/* Header Section - Responsive */}
					<div className="relative z-10 text-center space-y-2 sm:space-y-3 pt-4 sm:pt-6">
						<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
							🎡 Spin to Win
						</h1>
						<p className="text-sm sm:text-base text-gray-600 font-medium max-w-xs sm:max-w-sm mx-auto px-2">
							Try your luck and win amazing prizes!
						</p>
						<div className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto"></div>
					</div>
					
					{/* Wheel Component - Responsive */}
					<div className="relative z-10 flex items-center justify-center flex-1 min-h-0 py-4 sm:py-6 lg:py-8">
						<div className="w-full max-w-sm sm:max-w-md flex items-center justify-center">
							<WheelComponent
								segments={segments}
								restaurantId={restaurantId || rname}
								spinnerId={spinnerData?.id}
								onFinished={handleSpinFinish}
								primaryColor="black"
								primaryColoraround="#ffffffb4"
								contrastColor="white"
								buttonText="SPIN"
								isOnlyOnce={false}
								size={280}
								upDuration={50}
								downDuration={2000}
							/>
						</div>
					</div>
					
					{/* Bottom spacing for consistency */}
					<div className="relative z-10 h-12 sm:h-16 lg:h-20 flex items-center justify-center">
						
						
					</div>
				</div>
			)}

			{showPopup && (
				<ReferralPopup 
					onSubmit={handleSubmit} 
					onClose={() => {
						setShowPopup(false)
						setShowThankYouPopup(true)
					}} 
					discountValue={getDiscountValue()}
				/>
			)}

			{showThankYouPopup && (
				<div className="fixed inset-0 z-50 bg-white flex flex-col">
				{/* Subtle background decorative elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute top-12 left-8 w-32 h-32 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full blur-3xl opacity-40"></div>
					<div className="absolute bottom-12 right-8 w-40 h-40 bg-gradient-to-r from-pink-50 to-indigo-50 rounded-full blur-3xl opacity-40"></div>
					<div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full blur-2xl opacity-30"></div>
				</div>

				{/* Main content container - scrollable without scrollbar */}
				<div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-4 relative z-10">
					{/* Scrollable content wrapper */}
					<div className="min-h-full flex flex-col justify-start">
						<div className="max-w-md mx-auto w-full space-y-6">
							{/* Result Header - Clean and spacious */}
							<div className="text-center space-y-4">
								{currentPrize !== "Better Luck Next Time!" ? (
									<>
										{/* 
										<div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg">
											<svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
										</div> */}
										
										{/* Success Message */}
										<div className="space-y-2">
											<h2 className={`text-2xl font-bold bg-clip-text text-transparent ${
												currentSegment?.discountType === 'no_prize' 
													? "bg-gradient-to-r from-gray-500 to-gray-600" 
													: "bg-gradient-to-r from-green-500 to-emerald-600"
											}`}>
												{currentSegment?.discountType === 'no_prize' 
													? "No Discount This Time" 
													: "Congratulations!"
												}
											</h2>
											<div className={`w-24 h-1 rounded-full mx-auto ${
												currentSegment?.discountType === 'no_prize' 
													? "bg-gradient-to-r from-gray-400 to-gray-500" 
													: "bg-gradient-to-r from-green-400 to-emerald-500"
											}`}></div>
											<p className="text-md font-medium text-gray-700">
												You have won: <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent font-bold text-1xl">
													{currentPrize}
												</span>
											</p>
										</div>
										{/* Celebration Image */}
										<div className="flex justify-center relative mt-2">
											<Image
												src="/gift-open.png"
												alt="Celebration"
												width={90}
												height={40}
												className="object-contain drop-shadow-lg"
											/>
										</div>
									</>
								) : (
									<>
									
										
										{/* Better Luck Message */}
										<div className="space-y-2">
											<h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
												Better Luck Next Time!
											</h2>
											<div className="w-24 h-1 bg-gradient-to-r from-red-400 to-pink-500 rounded-full mx-auto"></div>
										</div>
										
										{/* Better Luck Image */}
										<div className="flex justify-center relative mt-4">
											<Image
												src="/unfortunate.png"
												alt="Better luck next time"
												width={90}
												height={40}
												className="object-contain drop-shadow-lg"
											/>
										</div>
									</>
								)}
							</div>

							{/* Feedback Section - Clean and spacious */}
							<div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
								<div className="text-center space-y-3 mb-2">
									<div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-md">
										<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
										</svg>
									</div>
									<h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
										Your Feedback is Important to Us
									</h3>
									<div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"></div>
								</div>

								{/* Review Buttons - Clean and touch-friendly */}
								<div className="space-y-2">
									<button
										onClick={() => {
											if (googleReviewLink) {
												window.open(googleReviewLink)
												// Navigate back to menu after opening review
												setTimeout(() => {
													window.location.href = `/restaurant/${rname}/menu`
												}, 1000)
											}
										}}
										className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-3 group"
									>
										<div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
											<Image
												src="/google-logo.webp"
												alt="Google"
												width={16}
												height={16}
												className="object-contain"
											/>
										</div>
										<span className="text-base font-bold">Share a Review on Google</span>
										<svg className="w-5 h-5 opacity-80 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
										</svg>
									</button>

									<div className="flex items-center justify-center space-x-4">
										<div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
										<span className="text-sm font-bold text-gray-500 bg-white px-4 py-1 rounded-full shadow-sm">
											OR
										</span>
										<div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
									</div>

									<button
										onClick={() => {
											if (zomatoReviewLink) {
												window.open(zomatoReviewLink)
												// Navigate back to menu after opening review
												setTimeout(() => {
													window.location.href = `/restaurant/${rname}/menu`
												}, 1000)
											}
										}}
										className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-3 group"
									>
										<div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
											<Image
												src="/zomato-new.png"
												alt="Zomato logo"
												width={18}
												height={18}
												className="object-contain bg-white rounded-full p-0.5"
											/>
										</div>
										<span className="text-base font-bold">Share a Review on Zomato</span>
										<svg className="w-5 h-5 opacity-80 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
										</svg>
									</button>
								</div>
							</div>

							{/* Thank You Section - Clean and minimal */}
							<div className="text-center space-y-2">
								<div className="flex items-center justify-center gap-3">
									<h4 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
										Thank You
									</h4>
									<div className="relative">
										<Image 
											src="/heart.png" 
											alt="Heart" 
											width={20} 
											height={20} 
											className="drop-shadow-lg animate-pulse"
										/>
									</div>
								</div>
								
								{currentSegment && (
									<div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 shadow-sm">
										<p className="text-base font-medium text-gray-700 text-center">
											💡 <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent font-bold">
												Show this screen to staff to claim your discount
											</span>
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

				
			</div>
			)}
		</div>
	)
}