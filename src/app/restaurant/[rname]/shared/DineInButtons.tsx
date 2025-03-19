"use client"
import { IOption } from "../types"
import InfoButton from "./InfoButton"

const DineInButtons = ({
	isDineIn = false,
	options,
	dynamicOptions
}: {
	isDineIn?: boolean
	dynamicOptions?: []
	options?: { deliveryOptions: IOption[]; dineInOptions: IOption[] }
}) => {
	const { dineInOptions = [], deliveryOptions = [] } = options || {}

	return (
		<div className="relative flex flex-col items-center w-full max-w-[400px] mt-8 mx-auto px-4">
			<div className="absolute top-[-16px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

			{/* DYNAMIC Menu is only for IS_DELIVERY page */}
			{!isDineIn &&
				dynamicOptions?.map((item: IOption) => {
					return (
						<>
							<InfoButton
								key={item.id}
								value={item.name}
								href={item?.url ?? "/"}
								icon={item.image_url}
							></InfoButton>
						</>
					)
				})}

			{/* Menu & other DINE_IN button */}
			{isDineIn &&
				dineInOptions?.map((item: IOption, index) =>
					item.show ? (
						<>
							<InfoButton
								key={index}
								href={item?.path ?? "/"}
								icon={item.icon}
								value={item.value}
							></InfoButton>
						</>
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
						></InfoButton>
					) : null
				)}
		</div>
	)
}

export default DineInButtons
