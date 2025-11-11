import {
	ProductCategoryType,
	ProductType,
	ProductVariantType
} from "@/types/product.type"

// Helper function to convert ProductType enum to is_veg boolean
const productTypeToIsVeg = (type: string | null | undefined): boolean => {
	if (!type) return false
	const upperType = type.toUpperCase()
	return upperType === "VEGETARIAN" || upperType === "VEGAN"
}

// Transform new API ProductVariant to old format ProductVariantType
export const transformProductVariant = (
	variant: any,
	productType?: string | null,
	productImage?: string | null
): ProductVariantType => {
	return {
		id: variant.id || "",
		variant_name: variant.name || "",
		variant_details: {},
		is_veg: productTypeToIsVeg(productType) || false,
		contains_egg: false, // Not available in new API
		active: variant.isActive ?? variant.available ?? true,
		price: variant.price?.toString() || "0",
		discounted_price: null, // Not available in new API
		image_url: productImage || "",
		display_order: variant.displayOrder?.toString() || "0",
		preparation_time_minutes: null, // Not available in new API
		allergens: "", // Not available in new API
		average_rating: null, // Not available in new API
		rating_count: 0, // Not available in new API
		dietary_info: null, // Not available in new API
		calories: null, // Not available in new API
		spiciness: null, // Not available in new API
		ingredients: null, // Not available in new API
		createdAt: variant.createdAt || "",
		updatedAt: variant.updatedAt || ""
	}
}

// Transform new API Product to old format ProductType
export const transformProduct = (product: any): ProductType => {
	// Transform variants and sort by price
	const variants: ProductVariantType[] = (product.variants || [])
		.map((variant: any) => {
			// Pass product type and image to variant transformation
			return transformProductVariant(
				variant,
				product.type,
				product.image
			)
		})
		// Sort variants by price (as done in old code)
		.sort((a: ProductVariantType, b: ProductVariantType) => parseFloat(a.price) - parseFloat(b.price))

	return {
		id: product.id || "",
		name: product.name || "",
		price: product.basePrice?.toString() || "0",
		active: product.active ?? product.isActive ?? true,
		description: product.description || "",
		quantity: undefined, // Not part of product data
		is_featured: false, // Not available in new API
		display_order: product.displayOrder || 0,
		variants: variants,
		createdAt: product.createdAt || "",
		updatedAt: product.updatedAt || "",
		available_from: product.availableFrom || undefined,
		available_to: product.availableTo || undefined
	}
}

// Transform new API ProductCategory to old format ProductCategoryType
export const transformProductCategory = (
	category: any
): ProductCategoryType => {
	return {
		id: category.id || "",
		name: category.name || "",
		active: category.isActive ?? true,
		created_at: category.createdAt || "",
		updated_at: category.updatedAt || undefined,
		description: category.description || null,
		image_url: null, // Not available in new API
		display_order: category.displayOrder || 0,
		display_name: category.name || "", // Use name as display_name if not available
		parent_category_id: category.parentId || category.parent?.id || null,
		available_from: "", // Not available in new API, use empty string
		available_to: "" // Not available in new API, use empty string
	}
}

// Transform full menu data structure
export const transformMenuData = (categories: any[]) => {
	return categories
		.map((category: any) => {
			// Transform category
			const transformedCategory = transformProductCategory(category)

			// Transform products and sort by display_order
			const transformedProducts = (category.products || [])
				.map((product: any) => transformProduct(product))
				.sort((a: ProductType, b: ProductType) => {
					// Sort products by display_order
					return a.display_order - b.display_order
				})

			return {
				...transformedCategory,
				products: transformedProducts
			}
		})
        
		// Sort categories by display_order
		.sort((a, b) => {
			const aOrder = a.display_order ?? 0
			const bOrder = b.display_order ?? 0
			return aOrder - bOrder
		})
}

