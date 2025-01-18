"use client"
import Image from "next/image"
import { useParams } from "next/navigation"

import { FoodIcon } from "@/app/components/shared/FoodIcon"
import { cn } from "@/lib/utils"
import { useGetMenuListByNameQuery } from "@/services/product/get-menu-list"
import { CLIENT_APP_MODE } from "@/store/features/app.slice"
import {
	addToDineInCart,
	removeFromDineInCart
} from "@/store/features/dine-in.slice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { ProductType, ProductVariantType } from "@/types"
import { formatPrice } from "@/utils/format-helper"

export default function MenuPage() {
	const { rname } = useParams<{ rname: string }>()

	const { currentData } = useGetMenuListByNameQuery(rname)
	const { dineInCart, totalItems } = useAppSelector(
		(state) => state["dine-in-state"]
	)

	const { mode } = useAppSelector((state) => state["appState"])
	const dispatch = useAppDispatch()

	const ProductCard = ({
		name,
		variants,
		description,
		id
	}: ProductType & {
		variants: ProductVariantType[]
	}) => {
		console.log(variants, "variants")
		const productInCart = dineInCart.find(
			(cartProduct) => cartProduct.productId === id
		)

		const isDelivery = mode === CLIENT_APP_MODE.DELIVERY

		return (
			<div className={cn(isDelivery ? "p-8 rounded-lg" : "p-2")}>
				<div className="flex">
					{isDelivery ? (
						<div className="rounded-lg overflow-hidden w-14 h-14">
							<Image
								sizes="100vw"
								width={100}
								height={100}
								style={{ objectFit: "cover", height: "100%", width: "100%" }}
								src={
									variants[0]?.image_url ||
									"https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg"
								}
								alt="asda"
							/>
						</div>
					) : null}
					<div className="w-full">
						<div className="flex justify-between">
							<h4 className="font-serif font-bold capitalize text-lg">
								<span>{name}</span>
								<FoodIcon isVeg />
								<FoodIcon isVeg={false} />
							</h4>
							<span className="inline-block text-sm font-semibold">
								{formatPrice(variants[0]?.price)}
							</span>
						</div>
						<p className="block text-xs font-sans">{description}</p>
					</div>
					{isDelivery ? (
						<div>
							<button
								onClick={() => dispatch(addToDineInCart({ productId: id }))}
								className="rounded-full bg-zinc-900 inline-block w-10 h-10"
							>
								<span className="text-white">+</span>
							</button>
							<span>{productInCart?.quantity || 0}</span>
							<button
								onClick={() =>
									dispatch(removeFromDineInCart({ productId: id }))
								}
								className="rounded-full bg-zinc-900 inline-block w-10 h-10"
							>
								<span className="text-white">-</span>
							</button>
						</div>
					) : null}
				</div>
			</div>
		)
	}

	return (
		<div>
			<h6>vikas</h6>
			{currentData?.categories.map((category) =>
				category.products.map((product) => (
					<ProductCard key={product.id} {...product} />
				))
			)}
			<div>
				Total Cart Items <span>{totalItems}</span>
			</div>
			{/* <h1>{currentData?.detail.details.}</h1> */}
		</div>
	)
}
