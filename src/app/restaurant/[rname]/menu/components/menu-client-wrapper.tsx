"use client"
import { useFeatureList } from "@/hooks/useFeatureList"
import { Category } from "@/services/product/get-menu-list"
import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"
import MenuAccordion from "@/shared/Accordian"
import { CLIENT_APP_MODE, setMode } from "@/store/features/app.slice"
import { setRestaurantDetails } from "@/store/features/restaurant.slice"
import { RootState } from "@/store/store"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import AddToCartDrawer from "../../components/add-to-cart-drawer"
import ScrollProgressBar from "../../components/scroll-progress-bar"
import { FEATURES } from "../../types"
import NavBar from "./NavBar"
import SearchBar from "./SearchBar"
import FloatingMenu from "./floating-menu"

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
	const isDineInMode = mode === CLIENT_APP_MODE.DINE_IN

	// Check localStorage for persisted mode
	useEffect(() => {
		const persistedMode = localStorage.getItem("appMode")
		if (persistedMode && persistedMode !== mode) {
			console.log(
				"MenuClientWrapper - Restoring mode from localStorage:",
				persistedMode
			)
			dispatch(setMode(persistedMode as CLIENT_APP_MODE))
		}
	}, [dispatch, mode])

	useEffect(() => {
		// Only dispatch if restaurantInfo is different from current state
		if (restaurantInfo) {
			dispatch(setRestaurantDetails(restaurantInfo))
		}
	}, [dispatch, restaurantInfo])

	const handleCategorySelection = (category: Category) => {
		console.log(category)
	}

	const getLink = useMemo(() => {
		if (isDineInMode) {
			return `/restaurant/${rname}/dine-in`
		}
		return `/restaurant/${rname}`
	}, [isDineInMode, rname])

	return (
		<>
			<ScrollProgressBar />
			<NavBar
				rname={rname}
				link={getLink}
				showCart={!!hasOrderFeature}
				restaurantInfo={restaurantInfo}
			/>
			<SearchBar restaurantInfo={restaurantInfo?.name} rName={rname} />

			<FloatingMenu categories={sortedCategories as unknown as Category[]} />

			<div className="pb-[3rem] mb-[3rem]">
				{sortedCategories.length > 0 ? (
					<>
						<MenuAccordion
							sections={sortedCategories}
							onSectionSelection={handleCategorySelection}
						/>
						<AddToCartDrawer />
					</>
				) : (
					children
				)}
			</div>
		</>
	)
}
