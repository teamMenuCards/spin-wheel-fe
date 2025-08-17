"use client"
import { ProductType, ProductVariantType } from "@/types"
import {
	MenuCategory,
	MenuProduct,
	MenuVariant
} from "@/types/menu-server.types"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { FiChevronDown, FiSearch, FiX } from "react-icons/fi"
import AddToCartDrawer from "../components/add-to-cart-drawer"
import MenuItem from "../menu/components/menu-item"

interface SearchResult {
	product: MenuProduct
	variant: MenuVariant
	category: MenuCategory
}

interface SearchClientProps {
	initialMenuData: MenuCategory[]
}

const MenuSkeletonItem = () => {
	return (
		<div className="flex justify-between items-center gap-4 py-4 animate-pulse">
			<div className="flex flex-col gap-2 flex-1">
				<div className="h-4 w-6 bg-gray-300 rounded" /> {/* veg icon */}
				<div className="h-5 w-32 bg-gray-300 rounded" /> {/* item name */}
				<div className="h-4 w-16 bg-gray-300 rounded" /> {/* price */}
			</div>
			<div className="w-24 h-24 rounded-lg bg-gray-300" /> {/* image */}
		</div>
	)
}

export default function SearchClient({ initialMenuData }: SearchClientProps) {
	const router = useRouter()
	const [query, setQuery] = useState("")
	const [results, setResults] = useState<SearchResult[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [hasSearched, setHasSearched] = useState(false)

	// Debounce function
	const debounce = <T extends unknown[]>(
		func: (...args: T) => void,
		delay: number
	) => {
		let timeoutId: NodeJS.Timeout
		return (...args: T) => {
			clearTimeout(timeoutId)
			timeoutId = setTimeout(() => func(...args), delay)
		}
	}

	// Search function with debounce
	const debouncedSearch = useMemo(
		() =>
			debounce((searchQuery: string) => {
				if (!searchQuery.trim()) {
					// Show all products when query is blank
					const allProducts: SearchResult[] = []
					initialMenuData.forEach((category) => {
						category.products?.forEach((product) => {
							product.variants?.forEach((variant) => {
								allProducts.push({
									product,
									variant,
									category
								})
							})
						})
					})
					setResults(allProducts)
					setIsLoading(false)
					setHasSearched(true)
					return
				}

				// Set loading state immediately
				setIsLoading(true)
				setHasSearched(false)

				const searchTerm = searchQuery.toLowerCase().trim()

				// Use a longer delay to ensure loading state is visible
				setTimeout(() => {
					// Search through all products and variants
					const searchResults: SearchResult[] = []
					initialMenuData.forEach((category) => {
						category.products?.forEach((product) => {
							// Search in product name and description
							const productMatches =
								product.name.toLowerCase().includes(searchTerm) ||
								product.description?.toLowerCase().includes(searchTerm)

							// Search in variants
							product.variants?.forEach((variant) => {
								const variantMatches = variant.variant_name
									.toLowerCase()
									.includes(searchTerm)

								if (productMatches || variantMatches) {
									searchResults.push({
										product,
										variant,
										category
									})
								}
							})
						})
					})

					// Set results and loading state in the same tick
					setResults(searchResults)
					setIsLoading(false)
					setHasSearched(true)
				}, 500) // Longer delay to ensure loading state is visible
			}, 400), // Slightly longer debounce delay
		[initialMenuData]
	)

	// Handle search input change
	const handleSearchChange = (value: string) => {
		setQuery(value)
		debouncedSearch(value)
	}

	// Clear search
	const handleClearSearch = () => {
		setQuery("")
		setResults([])
		setHasSearched(false)
	}

	// Convert MenuProduct to ProductType for MenuItem component
	const convertToProductType = (
		menuProduct: MenuProduct
	): ProductType & { variants: ProductVariantType[] } => {
		// default values
		return {
			id: menuProduct.id,
			name: menuProduct.name,
			description: menuProduct.description || "",
			active: menuProduct.active,
			display_order: menuProduct.display_order,
			is_featured: false,
			price: "0",
			createdAt: "",
			updatedAt: "",
			variants: menuProduct.variants.map((variant) => ({
				id: variant.id,
				variant_name: variant.variant_name,
				price: variant.price,
				display_order: variant.display_order,
				is_veg: variant.is_veg,
				image_url: variant.image_url || "",
				average_rating: variant.average_rating
					? parseFloat(variant.average_rating)
					: null,
				variant_details: {},
				contains_egg: false,
				active: true,
				discounted_price: null,
				preparation_time_minutes: null,
				allergens: "",
				rating_count: 0,
				dietary_info: null,
				calories: null,
				spiciness: null,
				ingredients: null,
				createdAt: "",
				updatedAt: ""
			}))
		}
	}

	return (
		<div className="min-h-screen bg-white">
			{/* Sticky Header */}
			<div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
				<div className="flex items-center">
					<button onClick={() => router.back()}>
						<FiChevronDown className="text-black text-2xl mr-2" />
					</button>
					<div className="flex-grow relative">
						<div className="relative">
							<FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							<input
								autoFocus
								type="text"
								value={query}
								onChange={(e) => handleSearchChange(e.target.value)}
								placeholder="Start typing to search..."
								className="w-full bg-gray-100 rounded-lg pl-10 pr-10 py-3 text-gray-700 placeholder-gray-400 outline-none"
							/>
							{query && (
								<button
									onClick={handleClearSearch}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
								>
									<FiX className="text-lg" />
								</button>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Search Results */}
			<div className="px-4 pt-4 pb-[6rem]">
				{isLoading && (
					<div className="space-y-6">
						{Array.from({ length: 3 }).map((_, index) => (
							<MenuSkeletonItem key={index} />
						))}
					</div>
				)}

				{!isLoading &&
					query &&
					results.length === 0 &&
					hasSearched && (
						<div className="text-center py-8">
							<p className="text-gray-500">
								No results found for &quot;{query}&quot;
							</p>
						</div>
					)}

				{!isLoading && results.length > 0 && (
					<div>
						{query && (
							<p className="text-sm text-gray-500 mb-4">
								Found {results.length} result{results.length !== 1 ? "s" : ""}
							</p>
						)}
						<div className="space-y-4">
							{results.map((result) => (
								<MenuItem
									key={`${result.product.id}-${result.variant.id}`}
									product={convertToProductType(result.product)}
								/>
							))}
						</div>
					</div>
				)}
			</div>

			{/* Add to Cart Drawer */}
			<AddToCartDrawer />
		</div>
	)
} 