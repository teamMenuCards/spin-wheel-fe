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
	const found =
		isSafeArray(products) &&
		products?.find(
			(item) =>
				item.variant_name == "Regular" || item.variant_name == productName
		)
	if (found) {
		return found
	}
	return 0
}
