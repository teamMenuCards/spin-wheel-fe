import { ProductVariantType } from "@/types"
import { isSafeArray } from "@/utils/isSafeArray"
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function findDetails({
	products,
	productName
}: {
	products: ProductVariantType[]
	productName: string
}) {
	if (!isSafeArray(products)) {
		return undefined
	}

	const found = products.find(
		(item) => item.variant_name == "Regular" || item.variant_name == productName
	)

	// TODO: Tried adding varaint with product name, but it is not getting updated. Informed BE
	return found || products[0]
}

// 👇 Validation functions
export const validateName = (name: string) => {
	if (!name.trim()) return "Please enter your name."
	if (name.trim().length < 2) return "Name must be at least 2 characters."
	if (!/^[A-Za-z\s]+$/.test(name.trim()))
		return "Only letters and spaces allowed."
	return ""
}

export const validatePhone = (phone: string) => {
	if (!phone.trim()) return "Please enter your phone number."
	if (!/^\d{10}$/.test(phone)) return "Phone number must be exactly 10 digits."
	return ""
}
