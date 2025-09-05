import React from "react"
import { Category } from "@/services/product/get-menu-list"
import Image from "next/image"
export interface CategoryListProps {
	categories: Category[];
    onSkip: (value: string | boolean)=> void;
}
import { ArrowRightCircle } from "lucide-react"



export default function MenuCategory({ categories,onSkip }: CategoryListProps) {
	return (
		<div className="min-h-screen bg-white flex flex-col items-center px-4 py-8 mb-14">
			<h1 className="text-3xl md:text-4xl font-bold mb-2">Menu Category</h1>
			<p className="text-gray-500 mb-6">Select your category below</p>

			<div className="grid grid-cols-2 sm:grid-cols-2 gap-4 max-w-sm w-full" >
				{categories.map((category) => (

                    category?.active ?(
                        <div
                        id={category.id}
						key={category.id}
						className="relative rounded-xl overflow-hidden h-20 sm:h-40 md:h-44 shadow-md cursor-pointer group" onClick={()=>{
                            onSkip(category.id)
                        }}>
						<Image
							src={category.image_url ? category.image_url : "/goodFood.webp"}
							alt={category.display_name}
							fill
							className="object-cover group-hover:scale-105 transition-transform duration-300"
						/>
						<div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
							<h2 className="text-white text-lg sm:text-xl text-center font-bold px-2">
								{category.display_name}
							</h2>
						</div>
					</div>
                ):null
                
					
				))}
			</div>
			<div className="fixed bottom-0 left-0 right-0 z-50 px-4 bg-white sm:right-4 z-50 px-4 pb-4 bg-white">
  <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-md shadow transition-all duration-300" onClick={()=> onSkip(true)  } >
					Skip to Complete Menu
					<ArrowRightCircle className="w-5 h-5" />
				</button>
			</div>
		</div>
	)
}
