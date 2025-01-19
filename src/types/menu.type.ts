export type MenuDetailsType = {
	data: Data
}

export interface Data {
	id: string
	name: string
	display_name: string
	active: boolean
	createdAt: string
	updatedAt: string
	categories?: CategoriesEntity[] | null
}

export interface CategoriesEntity {
	id: string
	name: string
	active: boolean
	created_at: string
	updated_at: string
	description: string
	image_url: string
	display_order: number
	display_name: string
	parent_category_id?: null
	products?: ProductsEntity[] | null
}

export interface ProductsEntity {
	id: string
	name: string
	description: string
	active: boolean
	createdAt: string
	updatedAt: string
	variants?: VariantsEntity[] | null
}

export interface VariantsEntity {
	id: string
	variant_details: object
	variant_name: string
	is_veg: boolean
	contains_egg: boolean
	active: boolean
	price: string
	discounted_price: string
	image_url?: string | null
	preparation_time_minutes: number
	allergens: string
	average_rating?: null
	rating_count: number
	dietary_info: string
	calories: number
	spiciness: number
	ingredients: string
	createdAt: string
	updatedAt: string
}
