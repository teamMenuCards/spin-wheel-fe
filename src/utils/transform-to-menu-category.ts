import { Category } from "@/services/graphql/menu"
import { MenuCategory, MenuProduct, MenuVariant } from "@/types/menu-server.types"

/**
 * Transforms Category[] (from GraphQL) to MenuCategory[] (for search page)
 * Main difference: average_rating is number | null in Category but string | undefined in MenuCategory
 */
export function transformToMenuCategory(
	categories: Category[]
): MenuCategory[] {
	return categories.map((category) => {
		const menuProducts: MenuProduct[] = category.products.map((product) => {
			const menuVariants: MenuVariant[] = product.variants.map((variant) => {
				const menuVariant: MenuVariant = {
					id: variant.id,
					variant_name: variant.variant_name,
					price: variant.price,
					display_order: variant.display_order,
					is_veg: variant.is_veg,
					image_url: variant.image_url || undefined,
					average_rating:
						variant.average_rating !== null &&
						variant.average_rating !== undefined
							? variant.average_rating.toString()
							: undefined
				}
				return menuVariant
			})

			const menuProduct: MenuProduct = {
				id: product.id,
				name: product.name,
				description: product.description || undefined,
				active: product.active,
				display_order: product.display_order,
				variants: menuVariants
			}
			return menuProduct
		})

		const menuCategory: MenuCategory = {
			id: category.id,
			display_name: category.display_name,
			display_order: category.display_order,
			active: category.active,
			products: menuProducts
		}
		return menuCategory
	})
}

