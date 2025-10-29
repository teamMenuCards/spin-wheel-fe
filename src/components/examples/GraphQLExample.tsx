"use client"

import { useMenuList } from "@/hooks/useMenuList"
import { useRestaurantDetails } from "@/hooks/useRestaurantDetails"
import { useState } from "react"

/**
 * Example component demonstrating GraphQL integration
 * This shows how to use the custom hooks for fetching data
 */
export function GraphQLExample() {
	const [restaurantName, setRestaurantName] = useState("demo-restaurant")

	// Using custom GraphQL hooks
	const {
		data: restaurantData,
		loading: restaurantLoading,
		error: restaurantError,
		refetch: refetchRestaurant
	} = useRestaurantDetails(restaurantName)

	const {
		data: menuData,
		loading: menuLoading,
		error: menuError,
		refetch: refetchMenu
	} = useMenuList(restaurantName)

	const handleRefresh = () => {
		refetchRestaurant()
		refetchMenu()
	}

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">GraphQL Integration Example</h1>

			{/* Restaurant Name Input */}
			<div className="mb-6">
				<label className="block text-sm font-medium mb-2">
					Restaurant Name:
				</label>
				<div className="flex gap-2">
					<input
						type="text"
						value={restaurantName}
						onChange={(e) => setRestaurantName(e.target.value)}
						className="flex-1 p-2 border border-gray-300 rounded-md"
						placeholder="Enter restaurant name"
					/>
					<button
						onClick={handleRefresh}
						className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
						disabled={restaurantLoading || menuLoading}
					>
						Refresh
					</button>
				</div>
			</div>

			{/* Restaurant Details Section */}
			<div className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">Restaurant Details</h2>
				<div className="bg-white p-4 rounded-lg shadow">
					{restaurantLoading && (
						<p className="text-gray-500">Loading restaurant details...</p>
					)}
					{restaurantError && (
						<div className="text-red-600">
							<p>Error loading restaurant: {restaurantError.message}</p>
						</div>
					)}
					{restaurantData && (
						<div className="space-y-2">
							<h3 className="text-xl font-semibold">
								{restaurantData.display_name}
							</h3>
							<p>
								<strong>Phone:</strong> {restaurantData.phone_no || "N/A"}
							</p>
							<p>
								<strong>Email:</strong> {restaurantData.email || "N/A"}
							</p>
							<p>
								<strong>Address:</strong> {restaurantData.address || "N/A"}
							</p>
							<p>
								<strong>City:</strong> {restaurantData.city || "N/A"}
							</p>
							<p>
								<strong>State:</strong> {restaurantData.state || "N/A"}
							</p>
							<p>
								<strong>Pincode:</strong> {restaurantData.pincode || "N/A"}
							</p>
							{restaurantData.logo && (
								<img
									src={restaurantData.logo}
									alt="Restaurant Logo"
									className="w-20 h-20 object-cover rounded"
								/>
							)}
						</div>
					)}
				</div>
			</div>

			{/* Menu List Section */}
			<div className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">Menu Categories</h2>
				<div className="bg-white p-4 rounded-lg shadow">
					{menuLoading && <p className="text-gray-500">Loading menu...</p>}
					{menuError && (
						<div className="text-red-600">
							<p>Error loading menu: {menuError.message}</p>
						</div>
					)}
					{menuData && menuData.length > 0 ? (
						<div className="space-y-4">
							<p className="text-sm text-gray-600">
								Found {menuData.length} categories
							</p>
							{menuData.map((category, index) => (
								<div
									key={category.id || index}
									className="border-b pb-4 last:border-b-0"
								>
									<h3 className="text-lg font-semibold">
										{category.display_name}
									</h3>
									{category.description && (
										<p className="text-gray-600 text-sm">
											{category.description}
										</p>
									)}
									<p className="text-sm text-gray-500">
										{category.products?.length || 0} products
									</p>
									{category.products && category.products.length > 0 && (
										<div className="mt-2">
											<p className="text-sm font-medium">Sample products:</p>
											<ul className="text-sm text-gray-600 ml-4">
												{category.products
													.slice(0, 3)
													.map((product, productIndex) => (
														<li key={product.id || productIndex}>
															{product.display_name} -{" "}
															{product.is_veg ? "Veg" : "Non-Veg"}
															{product.variants &&
																product.variants.length > 0 && (
																	<span className="text-gray-500">
																		{" "}
																		(₹{product.variants[0].price})
																	</span>
																)}
														</li>
													))}
												{category.products.length > 3 && (
													<li className="text-gray-500">
														... and {category.products.length - 3} more
													</li>
												)}
											</ul>
										</div>
									)}
								</div>
							))}
						</div>
					) : (
						menuData &&
						menuData.length === 0 && (
							<p className="text-gray-500">No menu categories found</p>
						)
					)}
				</div>
			</div>

			{/* Usage Instructions */}
			<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
				<h3 className="font-semibold text-yellow-800 mb-2">
					Usage Instructions:
				</h3>
				<ul className="text-yellow-700 text-sm space-y-1">
					<li>• Enter a restaurant name to fetch data</li>
					<li>• The hooks automatically handle loading states and errors</li>
					<li>• Data is cached by Apollo Client for better performance</li>
					<li>• Use the refresh button to refetch data</li>
					<li>• Both server-side and client-side rendering are supported</li>
				</ul>
			</div>
		</div>
	)
}
