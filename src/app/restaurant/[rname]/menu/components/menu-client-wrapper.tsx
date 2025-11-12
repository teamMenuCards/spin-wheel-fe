"use client"
import { useFeatureList } from "@/hooks/useFeatureList"
import { useSpinnerForRestaurant } from "@/hooks/useSpinnerForRestaurant"
import { localStorage } from "@/lib/local-storage"
import { Category } from "@/services/product/get-menu-list"
import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"
import MenuAccordion from "@/shared/Accordian"
import { CLIENT_APP_MODE, setMode } from "@/store/features/app.slice"
import { setRestaurantDetails } from "@/store/features/restaurant.slice"
import { RootState } from "@/store/store"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AddToCartDrawer from "../../components/add-to-cart-drawer"
import ScrollProgressBar from "../../components/scroll-progress-bar"
import { FEATURES } from "../../types"
import NavBar from "./NavBar"
import SearchBar from "./SearchBar"
import FloatingMenu from "./floating-menu"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface MenuClientWrapperProps {
	restaurantInfo: RestaurantDetailResponse
	rname: string
	sortedCategories: Category[]
	children?: React.ReactNode
}

export default function MenuClientWrapper({
	restaurantInfo,
	rname,
	sortedCategories,
	children
}: MenuClientWrapperProps) {
	const dispatch = useDispatch()
	const { mode } = useSelector((state: RootState) => state.appState)
	const { hasFeature } = useFeatureList(rname)
	const hasOrderFeature = hasFeature(FEATURES.RESTAURANT_ORDER_MODULE)
	const { data: spinnerData, loading: spinnerLoading } = useSpinnerForRestaurant(
		restaurantInfo?.id || ""
	)
	const hasSpinWheelFeature = !spinnerLoading && spinnerData
	const isDineInMode = mode === CLIENT_APP_MODE.DINE_IN
	const contentRef = useRef<HTMLDivElement>(null)
	const searchParams = useSearchParams()
	const [isClient, setIsClient] = useState(false)
	const router = useRouter()

	// Ensure we're on client side
	useEffect(() => {
		setIsClient(true)
	}, [])

	// Check localStorage for persisted mode (only on client)
	useEffect(() => {
		if (!isClient) return

		const currentAppMode = localStorage.getItem("appMode")
		if (currentAppMode && currentAppMode !== mode) {
			dispatch(setMode(currentAppMode as CLIENT_APP_MODE))
		}
	}, [dispatch, mode, isClient])

	useEffect(() => {
		// Only dispatch if restaurantInfo is different from current state
		if (restaurantInfo) {
			dispatch(setRestaurantDetails(restaurantInfo))
		}
	}, [dispatch, restaurantInfo])

	// Handle scroll to category from URL parameter
	useEffect(() => {
		if (!isClient) return

		const scrollToCategory = searchParams.get("scrollTo")
		if (scrollToCategory) {
			// Wait for the page to fully load and render
			const timer = setTimeout(() => {
				const targetSection = document.getElementById(scrollToCategory)
				if (targetSection) {
					const elementPosition =
						targetSection.getBoundingClientRect().top + window.scrollY
					window.scrollTo({
						top: elementPosition - 100, // Adjust for fixed navbar
						behavior: "smooth"
					})
					// Clean up URL parameter after scrolling
					const url = new URL(window.location.href)
					url.searchParams.delete("scrollTo")
					window.history.replaceState({}, "", url.toString())
				}
			}, 1000) // Wait 1 second for page to fully load

			return () => clearTimeout(timer)
		}
	}, [searchParams, isClient])

	// Trigger scroll recalculation when menu content changes
	useEffect(() => {
		if (!isClient) return

		const triggerScrollRecalculation = () => {
			// Dispatch a custom event to trigger scroll recalculation
			window.dispatchEvent(new CustomEvent("menuContentChanged"))
		}

		// Trigger after a short delay to ensure DOM is updated
		const timer = setTimeout(triggerScrollRecalculation, 200)

		return () => clearTimeout(timer)
	}, [sortedCategories, isClient])

	const handleCategorySelection = (category: Category) => {
		console.log(category)
		// Trigger scroll recalculation when accordion sections change
		if (isClient) {
			setTimeout(() => {
				window.dispatchEvent(new CustomEvent("menuContentChanged"))
			}, 100)
		}
	}

	const getLink = useMemo(() => {
		if (isDineInMode) {
			return `/restaurant/${rname}/dine-in`
		}
		return `/restaurant/${rname}`
	}, [isDineInMode, rname])

	return (
		<div ref={contentRef} className="min-h-screen bg-white">
			
			<ScrollProgressBar />
			<NavBar
				rname={rname}
				link={getLink}
				showCart={!!hasOrderFeature}
				restaurantInfo={restaurantInfo}
			/>
			
			<SearchBar rName={rname} />
			<MenuAccordion
				sections={sortedCategories}
				onSectionSelection={handleCategorySelection}
			/>  
{/* Spin Wheel Banner */}
{hasSpinWheelFeature && (
				<div className="fixed bottom-14 z-50 left-0 right-0 bg-red-500/80 backdrop-blur-md px-4 py-3 flex items-center justify-between shadow-lg border-t border-red-400/30">
					<div className="flex items-center gap-3">
						<Image
							src="/spin-wheel.png"
							alt="Spin Wheel"
							width={32}
							height={32}
							className="object-contain"
						/>
						<div className="text-white text-md font-bold">
							Get up to 50% off
						</div>
					</div>
					<button
						onClick={() => router.push(`/restaurant/${rname}/spin-wheel`)}
						className="px-4 py-2 bg-white text-red-500 text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors"
					>
						Spin Now
					</button>
				</div>
			)}
			<FloatingMenu categories={sortedCategories} />
			{hasOrderFeature && <AddToCartDrawer />}
			{children}
		</div>
	)
}