export const DEFAULT_COVER_IMG = 'url("/goodFood.webp")'

export const DEFAULT_LOGO_IMG = 'url("https://dummyimage.com/600x400/000/fff")'

export type IconKey =
	| "whatsapp"
	| "swiggy"
	| "zomato"
	| "menu"
	| "contact us"
	| "instagram"
	| "google"

export const ICON_MAP: Record<IconKey, string> = {
	whatsapp: "/whatsapp.svg",
	"contact us": "/whatsapp.svg",
	swiggy: "/swiggy-logo.webp",
	zomato: "/zomato-logo.webp",
	menu: "/menu-icon.webp",
	instagram: "/instagram-icon.webp",
	google: "/google-logo.webp"
}

export const URL_PATTERNS: Record<string, string> = {
	"wa.me": "whatsapp",
	"api.whatsapp.com": "whatsapp",
	"swiggy.com": "swiggy",
	"zomato.com": "zomato",
	"instagram.com": "instagram",
	menu: "menu",
	"contact us": "contact us",
	"google.com": "google"
}
