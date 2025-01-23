"use client"
import { useParams } from "next/navigation"
import { useGetMenuListByNameQuery } from "@/services/product/get-menu-list"
import Accordion from "@/shared/Accordian"
import FloatingMenu from "./components/floating-menu"
import NavBar from "./components/NavBar"
import { useGetRestaurantDetailByNameQuery } from "@/services/restaurant/get-restaurant-detail"

export default function MenuPage() {
	const { rname } = useParams<{ rname: string }>()

	// const [currentCategory, setCurrentCategory] = useState<string | undefined>(
	// 	undefined
	// )

	const { currentData } = useGetMenuListByNameQuery(rname)
	const { data: restaurantInfo } = useGetRestaurantDetailByNameQuery(rname)
	const categories = currentData?.categories || []

	//temporary
	const currentCategory = categories.length > 0 ? categories[0].id : ""

	const handleCategorySelection = (category) => {
		console.log(category)
	}

	return (
		<>
			<NavBar rname={rname} restaurantInfo={restaurantInfo} />
			<FloatingMenu categories={categories} currentCategory={currentCategory} />

			<Accordion
				sections={currentData?.categories || []}
				onSectionSelection={handleCategorySelection}
			/>
		</>
	)
}
