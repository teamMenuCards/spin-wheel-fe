"use client"

import { useMenuList } from "@/hooks/useMenuList"
import { useRestaurantDetails } from "@/hooks/useRestaurantDetails"
import { getMenuListClient } from "@/services/graphql/menu"
import { getRestaurantDetailsClient } from "@/services/graphql/restaurant"
import { useState } from "react"

export function GraphQLTest() {
	const [restaurantName, setRestaurantName] = useState("test-restaurant")
	const [testResult, setTestResult] = useState<string>("")

	// Test using custom hooks
	const {
		data: restaurantData,
		loading: restaurantLoading,
		error: restaurantError
	} = useRestaurantDetails(restaurantName)

	const {
		data: menuData,
		loading: menuLoading,
		error: menuError
	} = useMenuList(restaurantName)
	console.log("restaurantData", restaurantData)
	// Test using service functions
	const testServiceFunctions = async () => {
		try {
			const restaurantResult = await getRestaurantDetailsClient(restaurantName)
			const menuResult = await getMenuListClient(restaurantName)
			setTestResult(
				`Service Functions Result: Restaurant ${
					restaurantResult ? "Success" : "No data"
				}, Menu ${menuResult.length} categories`
			)
		} catch (error) {
			setTestResult(`Service Functions Error: ${error}`)
		}
	}

	return (
		<div className="p-6 max-w-2xl mx-auto">
			<h2 className="text-2xl font-bold mb-4">GraphQL Integration Test</h2>

			<div className="mb-4">
				<label className="block text-sm font-medium mb-2">
					Restaurant Name:
				</label>
				<input
					type="text"
					value={restaurantName}
					onChange={(e) => setRestaurantName(e.target.value)}
					className="w-full p-2 border border-gray-300 rounded-md"
					placeholder="Enter restaurant name"
				/>
			</div>

			<div className="space-y-4">
				{/* Test using custom hooks */}
				<div className="p-4 border border-gray-200 rounded-md">
					<h3 className="font-semibold mb-2">1. Restaurant Details Hook</h3>
					{restaurantLoading && <p>Loading...</p>}
					{restaurantError && (
						<p className="text-red-600">Error: {restaurantError.message}</p>
					)}
					{restaurantData && (
						<div>
							<p className="text-green-600">Success!</p>
							<p>Restaurant: {restaurantData.display_name || "No name"}</p>
							<p>Phone: {restaurantData.detail.phone_no || "No phone"}</p>
							<p>Address: {restaurantData.detail.address || "No address"}</p>
						</div>
					)}
				</div>

				<div className="p-4 border border-gray-200 rounded-md">
					<h3 className="font-semibold mb-2">2. Menu List Hook</h3>
					{menuLoading && <p>Loading...</p>}
					{menuError && (
						<p className="text-red-600">Error: {menuError.message}</p>
					)}
					{menuData && (
						<div>
							<p className="text-green-600">Success!</p>
							<p>Categories: {menuData.length}</p>
							{menuData.length > 0 && (
								<div className="mt-2">
									<p className="text-sm">
										First category: {menuData[0].display_name}
									</p>
									<p className="text-sm">
										Products: {menuData[0].products?.length || 0}
									</p>
								</div>
							)}
						</div>
					)}
				</div>

				{/* Test using service functions */}
				<div className="p-4 border border-gray-200 rounded-md">
					<h3 className="font-semibold mb-2">3. Service Functions Test</h3>
					<button
						onClick={testServiceFunctions}
						className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
					>
						Test Service Functions
					</button>
				</div>

				{/* Test results */}
				{testResult && (
					<div className="p-4 bg-gray-100 rounded-md">
						<h3 className="font-semibold mb-2">Test Results:</h3>
						<p>{testResult}</p>
					</div>
				)}
			</div>

			<div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
				<h3 className="font-semibold text-yellow-800 mb-2">Note:</h3>
				<p className="text-yellow-700 text-sm">
					This test component requires your GraphQL backend to be running and
					accessible. Make sure to set the correct GraphQL endpoint in your
					environment variables.
				</p>
			</div>
		</div>
	)
}
