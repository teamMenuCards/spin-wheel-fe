import { getMenuListAPI } from './product/get-menu-list';
import { getRestaurantDetailAPI } from './restaurant/get-restaurant-detail';

export const apis = {
  [getMenuListAPI.reducerPath]: getMenuListAPI.reducer,
  [getRestaurantDetailAPI.reducerPath]: getRestaurantDetailAPI.reducer,
} as const;
