"use client"
import { useDispatch } from "react-redux"
import { setRestaurantDetails } from "@/store/features/restaurant.slice"
import { useEffect } from "react"
import { useFeatureList } from "@/hooks/useFeatureList"
import { FEATURES } from "../../types"
import { Category } from "@/services/product/get-menu-list"
import NavBar from "./NavBar"
import FloatingMenu from "./floating-menu"
import Accordion from "@/shared/Accordian"
import dynamic from "next/dynamic"
import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"


const AddToCartDrawer = dynamic(
	() => import("../../components/add-to-cart-drawer"),
	{
		ssr: false,
		loading: () => null
	}
)

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
	const { hasFeature } = useFeatureList(rname)
	const hasOrderFeature = hasFeature(FEATURES.RESTAURANT_ORDER_MODULE)

	useEffect(() => {
		// Only dispatch if restaurantInfo is different from current state
		if (restaurantInfo) {
			dispatch(setRestaurantDetails(restaurantInfo))
		}
	}, [dispatch, restaurantInfo])

	const handleCategorySelection = (category: Category) => {
		console.log(category)
	}

	return (
		<>
			<NavBar
				showCart={!!hasOrderFeature}
				rname={rname}
				restaurantInfo={restaurantInfo}
			/>
			<FloatingMenu categories={sortedCategories} />

			{sortedCategories.length > 0 ? (
				<>
					<Accordion
						sections={sortedCategories}
						onSectionSelection={handleCategorySelection}
					/>
					<AddToCartDrawer />
				</>
			) : (
				children
			)}
		</>
	)
} 