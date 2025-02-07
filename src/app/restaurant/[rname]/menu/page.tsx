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
	const categories = menudata?.categories || []
	const currentCategory = categories.length > 0 ? categories[0].id : ""

	const handleCategorySelection = (category: Category) => {
		console.log(category)
	}

	return (
		<>
			<NavBar rname={rname} restaurantInfo={restaurantInfo} />
			<FloatingMenu categories={categories} currentCategory={currentCategory} />

			<Accordion
				sections={menudata?.categories || []}
				onSectionSelection={handleCategorySelection}
			/>
		</>
	)
}
