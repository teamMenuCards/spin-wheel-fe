"use client"
import React, { useEffect } from "react"
import Image from "next/image"
import { useCart } from "@/context"
import { isSafeArray } from "@/utils/isSafeArray"

function AddToCartDrawer() {
	const {
		setCartValue,
		selectedProduct = {},
		isOpen,
		closeCart,
		products
	} = useCart()

	const prdDetails =
		(selectedProduct &&
			isSafeArray(selectedProduct.variants) &&
			selectedProduct?.variants[0]) ||
		[]

	useEffect(() => {
		if (products.length) {
			let sum = 0
			products.forEach((prod) => {
				const hasVariant = prod?.variant?.selected
				sum += hasVariant
					? hasVariant.value * prod.quantity
					: prod?.variant?.value * prod.quantity
			})
			setCartValue(sum)
		}
	}, [products])

	useEffect(() => {
		const handlePopState = () => {
			if (isOpen) closeCart()
		}

		window.addEventListener("popstate", handlePopState)
		return () => window.removeEventListener("popstate", handlePopState)
	}, [closeCart, isOpen])

	useEffect(() => {
		if (isOpen) window.history.pushState({ drawer: true }, "")
	}, [isOpen])

	const getVegIcon = () => (
		<Image src="/ic_veg.png" alt="veg icon" width={15} height={15} priority />
	)
	const getNonVegIcon = () => (
		<Image
			src="/ic_nonveg.png"
			alt="nonveg icon"
			width={15}
			height={15}
			priority
		/>
	)

	const getProductType = () => (
		<div className="flex">
			{getVegIcon()}
			{getNonVegIcon()}
		</div>
	)

	return (
		<div
			className={`fixed bottom-0 left-0 w-full bg-white transition-transform ${
				isOpen ? "translate-y-0" : "translate-y-full"
			}`}
		>
			<div className="flex justify-end p-2">
				<button className="text-black rounded-full" onClick={closeCart}>
					&#10005;
				</button>
			</div>
			{prdDetails?.image && (
				<div className="m-2 border border-gray-300 rounded-lg h-52 relative">
					<Image
						fill
						src={prdDetails?.image}
						alt="Product Image"
						className="object-cover"
						priority
					/>
				</div>
			)}
			<div className="m-2">
				<div className="flex items-start">
					{getProductType()}
					<span className="ml-2 text-gray-700 font-medium">
						{selectedProduct?.name}
					</span>
				</div>
				<p className="mt-1 text-gray-500 ml-3">
					{selectedProduct?.description}
				</p>
				<p className="mt-1 text-gray-700 ml-3">Rs.{prdDetails?.price}</p>
			</div>
		</div>
	)
}

export default React.memo(AddToCartDrawer)
