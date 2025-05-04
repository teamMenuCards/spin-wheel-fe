"use client"
import { IDynamicLink } from "@/types"
import { IOption } from "../types"
import InfoButton from "./InfoButton"

const DineInButtons = ({
	isDineIn = false,
	options,
	dynamicOptions
}: {
	isDineIn?: boolean
	dynamicOptions?: IDynamicLink[]
	options?: { deliveryOptions: IOption[]; dineInOptions: IOption[] }
}) => {
	const { dineInOptions = [], deliveryOptions = [] } = options || {}

	const links = (dynamicOptions ?? []).sort(
		(a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
	)

	return (
		<div className="relative flex flex-col items-center w-full max-w-[400px] mt-8 mx-auto px-4">
			<div className="absolute top-[-16px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

			{/* DYNAMIC Menu */}
			{links &&
				links?.map((item: IDynamicLink, index) => {
					return (
						<InfoButton
							key={index}
							value={item.name}
							href={item?.url ?? "/"}
							icon={item.image_url}
							premium={item?.is_premium}
						/>
					)
				})}

			{/* Menu & other DINE_IN button */}
			{isDineIn &&
				dineInOptions?.map((item: IOption, index) =>
					item.show ? (
						<InfoButton
							key={index}
							href={item?.path ?? "/"}
							icon={item.icon}
							value={item.value}
						/>
					) : null
				)}

			{/* Menu & other Delivery option button */}
			{!isDineIn &&
				deliveryOptions?.map((item: IOption, index) =>
					item.show ? (
						<InfoButton
							key={index}
							href={item?.path ?? "/"}
							icon={item.icon}
							value={item.value}
						/>
					) : null
				)}
		</div>
	)
}

export default DineInButtons
