import { MenuListResponseType } from '@/services/product/get-menu-list';
import { ProductCategoryType } from '@/types';

export const categoriesFromMenuList = (
  data: MenuListResponseType
): ProductCategoryType[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const categories = data.categories.map(({ products, ...rest }) => rest);
  return categories;
};
