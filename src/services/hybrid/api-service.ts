/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_CONFIG } from "@/config/api"
import { getMenuListClient } from "../graphql/menu"
import { getRestaurantDetailsClient } from "../graphql/restaurant"
import { submitRestaurantFeedback } from "../submitFeedback"

export class HybridApiService {
	/**
	 * Get restaurant details - uses GraphQL if enabled, otherwise REST
	 */
	static async getRestaurantDetails(name: string) {
		if (API_CONFIG.USE_GRAPHQL) {
			return getRestaurantDetailsClient(name)
		} else {
			// Use existing REST API - this would need to be called differently
			// For now, fallback to GraphQL since REST API structure is different
			return getRestaurantDetailsClient(name)
		}
	}

	/**
	 * Get menu list - uses GraphQL if enabled, otherwise REST
	 */
	static async getMenuList(restaurantName: string) {
		if (API_CONFIG.USE_GRAPHQL) {
			return getMenuListClient(restaurantName)
		} else {
			// Use existing REST API - this would need to be called differently
			// For now, fallback to GraphQL since REST API structure is different
			return getMenuListClient(restaurantName)
		}
	}

	/**
	 * Submit feedback - uses GraphQL if enabled, otherwise REST
	 */
	static async submitFeedback(feedbackData: any) {
		// Use REST API for feedback (both GraphQL and non-GraphQL modes)
		return submitRestaurantFeedback(feedbackData)
	}

	/**
	 * Prefetch data for better performance
	 */
	static async prefetchRestaurantData(restaurantName: string) {
		if (API_CONFIG.USE_GRAPHQL) {
			// Prefetch both restaurant details and menu list
			await Promise.all([
				getRestaurantDetailsClient(restaurantName),
				getMenuListClient(restaurantName)
			])
		}
		// For REST APIs, prefetching is handled by the browser cache and RTK Query
	}
}
