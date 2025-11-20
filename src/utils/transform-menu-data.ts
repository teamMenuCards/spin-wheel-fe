import {
	ProductCategoryType,
	ProductType,
	ProductVariantType
} from "@/types/product.type"

// GraphQL response types
interface GraphQLVariant {
	id: string
	name: string
	price: number | string
	displayOrder?: number
	isActive?: boolean
	available?: boolean
	createdAt?: string
	updatedAt?: string
}

interface GraphQLProduct {
	id: string
	name: string
	description?: string
	basePrice?: number
	displayOrder?: number
	active?: boolean
	isActive?: boolean
	type?: string | null
	image?: string | null
	availableFrom?: string
	availableTo?: string
	createdAt?: string
	updatedAt?: string
	variants?: GraphQLVariant[]
	settings?: {
		allergens?: string[]
	}
}

interface GraphQLCategory {
	id: string
	name: string
	description?: string
	displayOrder?: number
	isActive?: boolean
	createdAt?: string
	updatedAt?: string
	parentId?: string | null
	parent?: {
		id: string
		name: string
	} | null
	products?: GraphQLProduct[]
}

// Helper function to convert ProductType enum to is_veg boolean
const productTypeToIsVeg = (type: string | null | undefined): boolean => {
	if (!type) return false
	const upperType = type.toUpperCase()
	return upperType === "VEGETARIAN" || upperType === "VEGAN"
}

// Transform new API ProductVariant to old format ProductVariantType
export const transformProductVariant = (
	variant: GraphQLVariant | Partial<ProductVariantType>,
	productType?: string | null,
	productImage?: string | null,
	allergens?: string[] | null
): ProductVariantType => {
	// Convert allergens array to comma-separated string
	const allergensString =
		allergens && Array.isArray(allergens) && allergens.length > 0
			? allergens.join(", ")
			: ""

	const graphqlVariant = variant as GraphQLVariant
	return {
		id: graphqlVariant.id || "",
		variant_name: graphqlVariant.name || "",
		variant_details: {},
		is_veg: productTypeToIsVeg(productType) || false,
		contains_egg: false, // Not available in new API
		active: graphqlVariant.isActive ?? graphqlVariant.available ?? true,
		price: graphqlVariant.price?.toString() || "0",
		discounted_price: null, // Not available in new API
		image_url: productImage || "",
		display_order: graphqlVariant.displayOrder?.toString() || "0",
		preparation_time_minutes: null, // Not available in new API
		allergens: allergensString,
		average_rating: null, // Not available in new API
		rating_count: 0, // Not available in new API
		dietary_info: null, // Not available in new API
		calories: null, // Not available in new API
		spiciness: null, // Not available in new API
		ingredients: null, // Not available in new API
		createdAt: graphqlVariant.createdAt || "",
		updatedAt: graphqlVariant.updatedAt || ""
	}
}

// Transform new API Product to old format ProductType
// Returns ProductType with required variants array (always present)
export const transformProduct = (
	product: unknown
): ProductType & { variants: ProductVariantType[] } => {
	const graphqlProduct = product as GraphQLProduct
	// Extract allergens from product.settings.allergens
	const allergens = graphqlProduct.settings?.allergens || null

	// Transform variants and sort by price
	let variants: ProductVariantType[] = (graphqlProduct.variants || [])
		.map((variant: GraphQLVariant) => {
			// Pass product type, image, and allergens to variant transformation
			return transformProductVariant(
				variant,
				graphqlProduct.type,
				graphqlProduct.image,
				allergens
			)
		})
		// Sort variants by price (as done in old code)
		.sort(
			(a: ProductVariantType, b: ProductVariantType) =>
				parseFloat(a.price) - parseFloat(b.price)
		)

	// If product has no variants, create a default variant using product data
	// This ensures veg/non-veg icon and allergens are always available
	if (variants.length === 0) {
		const defaultVariant: ProductVariantType = transformProductVariant(
			{
				id: graphqlProduct.id || "",
				name: graphqlProduct.name || "",
				price: graphqlProduct.basePrice || 0,
				isActive: graphqlProduct.active ?? graphqlProduct.isActive ?? true,
				displayOrder: graphqlProduct.displayOrder || 0,
				createdAt: graphqlProduct.createdAt || "",
				updatedAt: graphqlProduct.updatedAt || ""
			},
			graphqlProduct.type,
			graphqlProduct.image,
			allergens
		)
		variants = [defaultVariant]
	}

	return {
		id: graphqlProduct.id || "",
		name: graphqlProduct.name || "",
		price: graphqlProduct.basePrice?.toString() || "0",
		active: graphqlProduct.active ?? graphqlProduct.isActive ?? true,
		description: graphqlProduct.description || "",
		quantity: undefined, // Not part of product data
		is_featured: false, // Not available in new API
		display_order: graphqlProduct.displayOrder || 0,
		variants: variants, // Always present (either from product or default)
		createdAt: graphqlProduct.createdAt || "",
		updatedAt: graphqlProduct.updatedAt || "",
		available_from: graphqlProduct.availableFrom || undefined,
		available_to: graphqlProduct.availableTo || undefined
	} as ProductType & { variants: ProductVariantType[] }
}

// Transform new API ProductCategory to old format ProductCategoryType
export const transformProductCategory = (
	category: unknown
): ProductCategoryType => {
	const graphqlCategory = category as GraphQLCategory
	return {
		id: graphqlCategory.id || "",
		name: graphqlCategory.name || "",
		active: graphqlCategory.isActive ?? true,
		created_at: graphqlCategory.createdAt || "",
		updated_at: graphqlCategory.updatedAt || undefined,
		description: graphqlCategory.description || null,
		image_url: null, // Not available in new API
		display_order: graphqlCategory.displayOrder || 0,
		display_name: graphqlCategory.name || "", // Use name as display_name if not available
		parent_category_id:
			graphqlCategory.parentId || graphqlCategory.parent?.id || null,
		available_from: "", // Not available in new API, use empty string
		available_to: "" // Not available in new API, use empty string
	}
}

// Transform full menu data structure
export const transformMenuData = (categories: unknown[]) => {
	return (
		categories
			.map((category: unknown) => {
				const graphqlCategory = category as GraphQLCategory
				// Transform category
				const transformedCategory = transformProductCategory(graphqlCategory)

				// Transform products and sort by display_order
				const transformedProducts = (graphqlCategory.products || [])
					.map((product: GraphQLProduct) => transformProduct(product))
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
	)
}
