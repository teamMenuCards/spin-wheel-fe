export const DEFAULT_COVER_IMG = 'url("/goodFood.webp")'

export const DEFAULT_LOGO_IMG = 'url("https://dummyimage.com/600x400/000/fff")'

export type IconKey =
	| "whatsapp"
	| "swiggy"
	| "zomato"
	| "menu"
	| "contact us"
	| "instagram"

export const ICON_MAP: Record<IconKey, string> = {
	whatsapp: "/whatsapp.svg",
	"contact us": "/whatsapp.svg",
	swiggy: "/swiggy-logo.webp",
	zomato: "/zomato-logo.webp",
	menu: "/menu-icon.webp",
	instagram: "/instagram-icon.webp"
}
