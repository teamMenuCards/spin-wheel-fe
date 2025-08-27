import { getMenuListServer } from "@/services/product/get-menu-list-server"
import { getRestaurantDetailsServer } from "@/services/restaurant/get-restaurant-details-server"

// Direct exports without additional caching - let Next.js page-level caching handle it
export const getRestaurantDetails = getRestaurantDetailsServer
export const getMenuList = getMenuListServer
