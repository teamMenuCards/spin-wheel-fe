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

export default function MenuPage() {
	const { rname } = useParams<{ rname: string }>()
	const { currentData: menudata } = useGetMenuListByNameQuery(rname)
	const { data: restaurantInfo } = useGetRestaurantDetailByNameQuery(rname)

	const handleCategorySelection = (category: Category) => {
		console.log(category)
	}

	const sortedCategories =
		menudata?.categories
			?.slice()
			.sort((a, b) => a.display_order - b.display_order) ?? []

	return (
		<>
			<NavBar rname={rname} restaurantInfo={restaurantInfo} />
			<FloatingMenu categories={sortedCategories} />

			<Accordion
				sections={sortedCategories || []}
				onSectionSelection={handleCategorySelection}
			/>
		</>
	)
}
