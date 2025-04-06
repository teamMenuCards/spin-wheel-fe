export type VariantDetailsType = Record<string, string>

export type ProductVariantType = {
	id: string
	variant_details: VariantDetailsType | Record<string, VariantDetailsType>
	variant_name: string
	is_veg: boolean
	contains_egg: boolean
	active: boolean
	price: number | string
	discounted_price: number | null
	image_url: string
	preparation_time_minutes: number | null
	allergens: string | null
	average_rating: number | null
	rating_count: number
	dietary_info: string | null
	calories: number | null
	spiciness: number | null
	ingredients: string | null
	createdAt: string
	updatedAt: string
}

export type ProductType = {
	id: string
	name: string
	price: string | number
	active: boolean
	description:string
	is_featured: boolean
	variants?: ProductVariantType[]
	createdAt: string
	updatedAt: string
	available_from?: string
	available_to?: string
}

export type ProductCategoryType = {
	available_from: string
	available_to: string
	id: string
	name: string
	active: boolean
	created_at: string
	updated_at?: string
	description: string | null
	image_url: string | null
	display_order: number
	display_name: string
	parent_category_id: string | null
}