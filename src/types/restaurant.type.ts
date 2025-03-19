export type RestaurantType = {
	id: string
	name: string
	display_name: string
	active: boolean
	createdAt: string
	updatedAt: string
}

export type IReviews = {
	review_image_url: string
}
export type RestaurantDetailType = {
	id: number
	pincode: string
	phone_no: string
	email: string
	address: string
	city: string
	country: string
	state: string
	logo: string
	cover_image: string
	dashboardLinks?: []
	details: {
		wa_api_details?: {
			wa_number: string
		}
		platform_reviews?: {
			platform_name: string
			total_reviews: number
			average_rating: number
		}[]

		reviews_image_url_details?: IReviews[]
		platform_details?: {
			platform_name: string
			platform_uri: string
		}[]
		meta_details?: {
			category: string
			opening_time: string
			closing_time: string
			phone_number: string
			avg_price: number
			avg_person: number
			location_info: string
		}
	}
	createdAt: string
	updatedAt: string
}
