import { ProductCategoryType, ProductType, ProductVariantType, RestaurantType } from '@/types';
import { createApi } from '@reduxjs/toolkit/query/react';

import { apiRoutes } from '../api-routes';
import { axiosBaseQuery } from '../http-client';
import { parseDynamicURL } from '../utils';

export type MenuListResponseType = {
  categories:
    | Array<
        ProductCategoryType & {
          products: Array<
            ProductType & {
              variants: ProductVariantType[];
            }
          >;
        }
      >
    | [];
} & RestaurantType;

// Define a service using a base URL and expected endpoints
export const getMenuListAPI = createApi({
  reducerPath: "get-menu-list",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getMenuListByName: builder.query<MenuListResponseType, string>({
      query: (name) => ({
        url: parseDynamicURL(apiRoutes.menuItemtList, { name }),
        method: "GET",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMenuListByNameQuery } = getMenuListAPI;
