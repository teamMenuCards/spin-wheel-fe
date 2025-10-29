import { getMenuListServer } from "@/services/graphql/menu"
import { getRestaurantDetailsServer } from "@/services/graphql/restaurant"

// Server-side functions using GraphQL exclusively
export const getRestaurantDetails = getRestaurantDetailsServer
export const getMenuList = getMenuListServer
