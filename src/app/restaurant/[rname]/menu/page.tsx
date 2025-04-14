"use client"
import { useParams } from "next/navigation"
import {
	Category,
	useGetMenuListByNameQuery
} from "@/services/product/get-menu-list"
import Accordion from "@/shared/Accordian"
import FloatingMenu from "./components/floating-menu"
import NavBar from "./components/NavBar"
import { useGetRestaurantDetailByNameQuery } from "@/services/restaurant/get-restaurant-detail"
import { ProductCategoryType } from "@/types"
import { isSafeArray } from "@/utils/isSafeArray"
import Loading from "./loading"

export default function MenuPage() {
	const { rname } = useParams<{ rname: string }>()
	const { currentData: menudata } = useGetMenuListByNameQuery(rname)
	const {
		data: restaurantInfo,
		isFetching: isFetchingMenu,
		isError: hasErrorMenu
	} = useGetRestaurantDetailByNameQuery(rname)

	const handleCategorySelection = (category: Category) => {
		console.log(category)
	}

	const isCurrentTimeWithinRange = (
		availableFrom: ProductCategoryType["available_from"],
		availableTo: ProductCategoryType["available_to"]
	) => {
		const now = new Date()
		const currentTime = now.getHours() * 60 + now.getMinutes() // Local time

		const [fromHours, fromMinutes] = availableFrom
			.split(":")
			.slice(0, 2)
			.map(Number)
		const [toHours, toMinutes] = availableTo.split(":").slice(0, 2).map(Number)

		const fromTime = fromHours * 60 + fromMinutes
		const toTime = toHours * 60 + toMinutes

		// Handle overnight case
		const isWithinRange =
			fromTime <= toTime
				? currentTime >= fromTime && currentTime <= toTime
				: currentTime >= fromTime || currentTime <= toTime

		return isWithinRange
	}

	const validCategories = menudata?.categories.filter((item) => {
		const isTimingsAvailable = item?.available_from && item?.available_to

		if (isTimingsAvailable) {
			return isCurrentTimeWithinRange(item?.available_from, item?.available_to)
		}

		return menudata?.categories
	})

	const sortedCategories =
		validCategories
			?.slice()
			.sort((a, b) => a.display_order - b.display_order) ?? []

	const isLoadingMenu = isFetchingMenu || menudata?.categories === undefined

	if (isLoadingMenu) {
		return <Loading />
	}

	if (hasErrorMenu) {
		return <div>Error fetching data</div>
	}

	if (!isLoadingMenu && !sortedCategories.length) {
		return (
			<>
				<NavBar rname={rname} restaurantInfo={restaurantInfo} />
				<FloatingMenu categories={sortedCategories} />
				<div className="mt-6 flex justify-center font-md font-semibold font-metropolis">
					Menu Coming Soon!
				</div>
			</>
		)
	}

	const hasLoadedMenu = !isFetchingMenu && isSafeArray(sortedCategories)

	return (
		<>
			<NavBar rname={rname} restaurantInfo={restaurantInfo} />
			<FloatingMenu categories={sortedCategories} />

			{hasLoadedMenu && (
				<Accordion
					sections={sortedCategories}
					onSectionSelection={handleCategorySelection}
				/>
			)}
		</>
	)
}
