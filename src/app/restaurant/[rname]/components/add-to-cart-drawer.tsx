import { useDispatch, useSelector } from "react-redux"
import React, { useMemo } from "react"
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
import { ProductType, ProductVariantType } from "@/types"

const App = () => {
	const { isOpen, selectedProduct } = useSelector(
		(state: RootState) => state.cart
	)

	const dispatch = useDispatch()
	// const router = useRouter()

	// const {
	// 	setCartValue,
	// 	selectedProduct = {
	// 		name: "",
	// 		description: "",
	// 		price: 0,
	// 		image: "",
	// 		isVeg: false
	// 	},
	// 	isOpen,
	// 	closeCart,
	// 	products
	// } = useCart()

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
		const found = products?.find(
			(item) =>
				item.variant_name == "Regular" ||
				item.variant_name == selectedProduct?.name
		)
		if (found) {
			return found.price
		}
		return 0
	}

	const getProductType = (isVeg: boolean) => {
		return isVeg ? getVegIcon() : getNonVegIcon()
	}

	const handleAddProduct = (selectedProduct: ProductType) => {
		/* 
			- Add product in cart
			- Show increment button on items
			- Close drawer
		*/
		dispatch(addProduct(selectedProduct))
		dispatch(closeCart())
		dispatch(increaseProductQuantity(selectedProduct.id))
	}

	const getProductDetail = useMemo(() => {
		return (
			isSafeArray(selectedProduct?.variants) &&
			selectedProduct?.variants.find(
				(item) => item.variant_name === selectedProduct.name
			)
		)
	}, [selectedProduct])

	return (
		<>
			<Drawer
				lockBackgroundScroll
				className="w-full flex flex-col" // Make the drawer a flex container
				open={isOpen}
				onClose={() => dispatch(closeCart())}
				direction="bottom"
				style={{
					height: "400px"
				}}
			>
				{selectedProduct?.variants?.[0]?.image_url ? (
					<div className="border border-gray-300 rounded-md h-[200px] w-full relative overflow-hidden">
						(
						<Image
							src={selectedProduct.variants[0].image_url}
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
						onClick={() => selectedProduct && handleAddProduct(selectedProduct)}
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
