"use client"
import { useSnackbar } from "@/app/providers/SnackbarProvider"
import {
	addProduct,
	closeCart,
	increaseProductQuantity
} from "@/store/features/cart.slice"
import { RootState } from "@/store/store"
import { ProductVariantType } from "@/types"
import { isSafeArray } from "@/utils/isSafeArray"
import NextImage from "next/image"
import { useEffect, useMemo, useState } from "react"
import { HiArrowCircleRight } from "react-icons/hi"
import Drawer from "react-modern-drawer"
import "react-modern-drawer/dist/index.css"
import { useDispatch, useSelector } from "react-redux"

import { findDetails } from "@/lib/utils"
import { useParams, useRouter } from "next/navigation"

const App = () => {
	const router = useRouter()
	const { rname } = useParams<{ rname: string }>()
	const { showSnackbar } = useSnackbar()
	const [preloadedImage, setPreloadedImage] = useState<string | null>(null)

	const { isOpen, selectedProduct, products } = useSelector(
		(state: RootState) => state.cart
	)

	// Preload the image when the selectedProduct changes
	useEffect(() => {
		if (!selectedProduct) return

		const imageUrl = selectedProduct.variants?.[0]?.image_url
		if (!imageUrl) return

		const img = new window.Image()
		img.src = imageUrl
		img.onload = () => {
			setPreloadedImage(imageUrl)
		}
	}, [selectedProduct])

	const dispatch = useDispatch()

	const getVegIcon = () => {
		return (
			<NextImage
				src="/ic_veg.webp"
				alt="veg/nonveg icon"
				width={15}
				height={15}
				priority
			/>
		)
	}

	const getNonVegIcon = () => {
		return (
			<NextImage
				src="/ic_nonveg.webp"
				alt="veg/nonveg icon"
				width={15}
				height={15}
				priority
			/>
		)
	}

	const findPrice = (products: ProductVariantType[]) => {
		if (selectedProduct) {
			const found = findDetails({ products, productName: selectedProduct.name })
			return found && found.price
		}
		return 0
	}

	const getProductType = (isVeg: boolean) => {
		return isVeg ? getVegIcon() : getNonVegIcon()
	}

	const getProductDetail = useMemo(() => {
		return (
			isSafeArray(selectedProduct?.variants) &&
			selectedProduct?.variants.find(
				(item) => item.variant_name === selectedProduct.name
			)
		)
	}, [selectedProduct])

	const getSnackbarMssg = useMemo(() => {
		const count = products.length

		if (count == 1) {
			return `1 item added`
		} else {
			return `${count} items added`
		}
	}, [products.length])

	useEffect(() => {
		/* Show snackbar whenever cart size updates */
		if (products.length)
			setTimeout(() => {
				showSnackbar(
					<div
						className="w-screen fixed bottom-0 left-0 z-[9999] text-white font-semibold text-[16px] bg-lime-500 px-4 py-3 animate-slideUp"
						onClick={() => router.push(`/restaurant/${rname}/cart`)}
					>
						<div className="flex justify-between items-center">
							{getSnackbarMssg}
							<div className="flex items-center">
								<button>View Cart</button>
								<HiArrowCircleRight className="ml-1" />
							</div>
						</div>
					</div>
				)
			}, 500)
	}, [getSnackbarMssg, products.length, rname, router, showSnackbar])

	const handleAddToCart = () => {
		if (selectedProduct) {
			/* 
			- Add product in cart
			- Show increment button on product image
			- Show snackbar
			- Close drawer
		*/

			dispatch(addProduct(selectedProduct))
			dispatch(closeCart())
			dispatch(increaseProductQuantity(selectedProduct.id))
		}
	}

	const hasProductImage = selectedProduct?.variants?.[0]?.image_url

	return (
		<>
			<Drawer
				lockBackgroundScroll
				className="w-full flex flex-col" // Make the drawer a flex container
				open={isOpen}
				onClose={() => dispatch(closeCart())}
				direction="bottom"
				style={{
					height: hasProductImage ? "500px" : "auto",
					maxHeight: "80vh",
					zIndex: 1410,
					overflowY: "auto"
				}}
			>
				{hasProductImage ? (
					<div className="border border-gray-300 rounded-md h-[350px] w-full relative">
						{preloadedImage ? (
							<NextImage
								src={preloadedImage}
								alt="Product Image"
								fill
								className="object-cover rounded-md"
								priority
							/>
						) : (
							<div className="h-full w-full bg-gray-200 animate-pulse rounded-md" />
						)}
					</div>
				) : null}

				<div className="p-4 space-y-2 flex-grow">
					{/* Allow content to grow */}
					<div className="flex items-baseline space-x-2">
						{getProductDetail && getProductType(getProductDetail.is_veg)}
						<h2 className="text-md font-semibold font-metropolis">
							{selectedProduct?.name}
						</h2>
					</div>
					<p className="text-sm ml-4 text-gray-600 font-semibold font-metropolis">
						{selectedProduct?.description}
					</p>
					<p className="text-sm font-semibold font-metropolis ml-4">
						{selectedProduct?.variants &&
							`Rs.${findPrice(selectedProduct?.variants)}`}
					</p>
				</div>

				{/* Button at the bottom */}
				<div className="p-4 ml-auto mb-4">
					<button
						onClick={handleAddToCart}
						className="w-[160px] text-lg text-white text-center font-bold rounded-lg border-2 border-primary text-primary-foreground bg-lime-500"
					>
						ADD TO CART
					</button>
				</div>
			</Drawer>
		</>
	)
}

export default App
