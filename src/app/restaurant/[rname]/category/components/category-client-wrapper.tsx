"use client"
import React from "react"
import { Category } from "@/services/product/get-menu-list"
import { useRouter } from "next/navigation"
import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"
import { ChevronLeft_Ic } from "../../menu/icons"
// import { RootState } from "@/store/store"
// import { useSelector } from "react-redux"
import { DEFAULT_LOGO_IMG } from "../../constants"
export interface CategoryListProps {
	rname?: string;
	categories: Category[];
	restaurantInfo: RestaurantDetailResponse;
    onSkip?: (value: string | boolean)=> void;
}
import { ArrowRightCircle } from "lucide-react"

// Custom NavBar component for category page with browser back navigation
const CategoryNavBar = ({  restaurantInfo }: {  restaurantInfo: RestaurantDetailResponse }) => {
	const router = useRouter()
	const logoImg = `url(${restaurantInfo?.detail.logo || DEFAULT_LOGO_IMG})`

	const handleBackClick = () => {
		router.back() // Go back in browser history
	}


	return (
		<>
			<nav className="sticky top-0 z-40 w-full bg-white shadow-md px-4 py-1 pb-2">
				<div className="max-w-7xl mx-auto flex items-center justify-between text-black">
					<div className="flex items-center">
						<button onClick={handleBackClick}>
							<ChevronLeft_Ic className="w-5 h-5 stroke-3" />
						</button>

						<div className="text-md w-40 font-bold truncate ml-4 max-w-xs">
							{restaurantInfo?.name}
						</div>
					</div>

					<div className="flex items-center gap-4">						

						{/* Restaurant Logo */}
						<div
							className="w-8 h-8 rounded-full bg-cover bg-center bg-no-repeat"
							style={{ backgroundImage: logoImg }}
						/>
					</div>
				</div>
			</nav>

		
		</>
	)
}

export default function MenuCategory({ categories, restaurantInfo }: CategoryListProps) {
	const router = useRouter()

	const handleSkipToMenu = () => {
		// Navigate to the menu page
		router.push(`/restaurant/${window.location.pathname.split('/')[2]}/menu`)
	}

	const handleCategoryClick = (categoryId: string) => {
		// Navigate to menu page with category ID as URL parameter
		const restaurantName = window.location.pathname.split('/')[2]
		router.push(`/restaurant/${restaurantName}/menu?scrollTo=${categoryId}`)
	}

	return (
		<div className="min-h-screen bg-white">
			<CategoryNavBar
				restaurantInfo={restaurantInfo}
			/>
			<div className="flex flex-col items-center px-4 py-8 mb-14">
				<h1 className="text-2xl font-bold mb-2">Menu Category</h1>
				<p className="text-gray-500 mb-6">Select your category below</p>

				<div className="grid grid-cols-2 sm:grid-cols-2 gap-4 max-w-sm w-full" >
					{categories.map((category) => (

	                    category?.active ?(
	                        <div
	                        id={category.id}
							key={category.id}
							className="relative rounded-xl overflow-hidden h-20 sm:h-40 md:h-44 shadow-md cursor-pointer group bg-yellow-400 active:bg-yellow-600 transition-colors duration-150 flex items-center justify-center" 
							onClick={() => handleCategoryClick(category.id)}>
							<div className="text-center">
								<h2 className="text-black text-lg sm:text-xl font-bold px-2">
									{category.display_name}
								</h2>
							</div>
						</div>
	                ):null
	                
						
					))}
				</div>
				<div className="fixed bottom-0 left-0 right-0 z-50 px-4 bg-white sm:right-4 z-50 px-4 pb-4 bg-white">
	  <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-md shadow transition-all duration-300" 
	  onClick={handleSkipToMenu} >
						Skip to Complete Menu
						<ArrowRightCircle className="w-5 h-5" />
					</button>
				</div>
			</div>
		</div>
	)
}
