export interface MenuCategory {
	id: string
	display_name: string
	display_order: number
	active: boolean
	products: MenuProduct[]
}

export interface MenuProduct {
	id: string
	name: string
	description?: string
	active: boolean
	display_order: number
	variants: MenuVariant[]
}

export interface MenuVariant {
	id: string
	variant_name: string
	price: string
	display_order: string
	is_veg: boolean
	image_url?: string
	average_rating?: string
}

export interface MenuListResponse {
	categories: MenuCategory[]
}
