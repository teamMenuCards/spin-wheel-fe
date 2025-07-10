"use client"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "next/navigation"

import NavBar from "../menu/components/NavBar"
import { isSafeArray } from "@/utils/isSafeArray"
import ProductCard from "../components/product-card"
import { RootState } from "@/store/store"
import { VariantsEntity } from "@/types/menu.type"
import { ProductType } from "@/types"
import { selectCartTotal } from "@/store/features/cart.slice"
import { useSnackbar } from "@/app/providers/SnackbarProvider"

const CartPage = () => {
	const { rname } = useParams<{ rname: string }>()
	const { hideSnackbar } = useSnackbar()

	const { restaurantData } = useSelector((state: RootState) => state.restaurant)

	const { products } = useSelector((state: RootState) => state.cart)
	const total = useSelector(selectCartTotal)

	const whatsappNumber =
		restaurantData?.detail.details.wa_api_details?.wa_number

	useEffect(() => {
		hideSnackbar()
	}, [hideSnackbar])

	const getPrice = ({
		name,
		variants
	}: {
		name: string
		variants?: VariantsEntity[] | null
	}): string => {
		const validVariants = variants ?? undefined // Convert null to undefined

		const found =
			isSafeArray(validVariants) &&
			validVariants.find(
				(item) => item.variant_name === name || item.variant_name === "Regular"
			)

		return found && typeof found !== "boolean" ? found.price : "0"
	}

	const handleConfirm = () => {
		let message = `/******** NEW ORDER ********/\n`

		if (isSafeArray(products)) {
			products.forEach((item) => {
				const { name, quantity, variants } = item as ProductType
				message += `${name} - Rs.${getPrice({
					name,
					variants: variants
						? variants.map((variant) => ({
								...variant,
								preparation_time_minutes: variant.preparation_time_minutes ?? 0 // Convert null to 0
						  }))
						: undefined
				})} - *${quantity} Qty*\n`
			})
			message += `Total -  Rs.${total}\n`
		}

		const encodedMessage = encodeURIComponent(message)
		const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
		window.open(whatsappUrl, "_blank")
	}

	return (
		<div className="flex flex-col min-h-screen">
			{/* Navbar */}
			{restaurantData && (
				<NavBar
					rname={rname}
					restaurantInfo={restaurantData}
					showLogo={false}
				/>
			)}

			{/* Cart Items */}
			<div className="flex-1 bg-white rounded-lg px-2">
				{isSafeArray(products) ? (
					<>
						{products.map((item) => {
							return (
								<>
									<div key={item.id}>
										<ProductCard product={item} />
									</div>
								</>
							)
						})}

						<div className="flex justify-between px-2 py-2 rounded-md shadow-md m-2">
							<div className="text-md font-semibold">Total</div>
							<span className="text-md font-semibold">Rs.{total}</span>
						</div>
						<p className="text-sm font-semibold text-red-600 text-left mx-4">
							Above prices are exclusive of GST(5%) and will be charged
							additionally.
						</p>
					</>
				) : (
					<div className="text-lg font-semibold text-gray-800 text-center">
						<div>Your cart is empty!!</div>
					</div>
				)}
			</div>

			{/* Confirm Button */}
			<div className="p-4">
				<button
					className="w-full bg-lime-500 text-md font-semibold text-white py-2 rounded-xl shadow-md hover:bg-green-600"
					onClick={handleConfirm}
					type="submit"
				>
					Confirm over WhatsApp
				</button>
			</div>
		</div>
	)
}

export default CartPage
