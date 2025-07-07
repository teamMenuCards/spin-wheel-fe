import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useMemo } from "react"
import Image from "next/image"
import Drawer from "react-modern-drawer"
import "react-modern-drawer/dist/index.css"
import {
	addProduct,
	closeCart,
	increaseProductQuantity
} from "@/store/features/cart.slice"
import { isSafeArray } from "@/utils/isSafeArray"
import { RootState } from "@/store/store"
import { ProductVariantType } from "@/types"
import { HiArrowCircleRight } from "react-icons/hi"
import { useSnackbar } from "notistack"

import { useParams, useRouter } from "next/navigation"
import { findDetails } from "@/lib/utils"

const App = () => {
	const router = useRouter()
	const { rname } = useParams<{ rname: string }>()
	const { enqueueSnackbar } = useSnackbar()

	const { isOpen, selectedProduct, products } = useSelector(
		(state: RootState) => state.cart
	)

	const dispatch = useDispatch()

	const getVegIcon = () => {
		return (
			<Image
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
			<Image
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

	const getSnackbarMssg = () => {
		const count = products.length

		if (count == 1) {
			return `1 item added`
		} else {
			return `${count} items added`
		}
	}

	useEffect(() => {
		/* Show snackbar whenever cart size updates */
		if (products.length)
			setTimeout(() => {
				enqueueSnackbar(
					<div className="w-screen lg:max-w-md bottom-[-20px] p-4 fixed text-white font-semibold text-[16px] bg-lime-500 px-4 py-3 flex flex-col animate-slideUp">
						<div
							className="flex justify-center items-center"
							onClick={() => router.push(`/restaurant/${rname}/cart`)}
						>
							{getSnackbarMssg()}
							<HiArrowCircleRight className="ml-1" />
						</div>
						{/* <div
							className="text-md mt-2 text-white font-bold text-right pr-2 mr-2"
							onClick={() => router.push(`/restaurant/${rname}/cart`)}
						>
							VIEW CART
						</div> */}
					</div>,
					{
						variant: undefined,
						autoHideDuration: null,
						// @ts-expect-error - update snackbar lirary
						ContentProps: {
							style: {
								background: "transparent",
								boxShadow: "none",
								padding: 0,
								margin: 0,
								width: "100vw" // full viewport width
							}
						},
						anchorOrigin: {
							vertical: "bottom",
							horizontal: "center"
						},
						action: null
					}
				)
			}, 500)
	}, [products.length])

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
						(
						<Image
							src={hasProductImage}
							alt="Product Image"
							layout="fill"
							objectFit="cover"
						/>
						)
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
