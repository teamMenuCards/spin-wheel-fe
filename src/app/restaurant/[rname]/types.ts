export interface IOption {
	id: number
	value: string
	path: string
	icon: string
	show?: boolean
	preload?: boolean
}

export const enum FEATURES {
	RESTAURANT_ORDER_MODULE = "RESTAURANT_ORDER_MODULE",
	RESTAURANT_REVIEW_MODULE = "RESTAURANT_REVIEW_FUNNEL",
	RESTAURANT_PRE_PLATFORM_ORDER_FLOW = "RESTAURANT_PRE_PLATFORM_ORDER_FLOW",
}
