"use client"
import NextLink from "next/link"
import Image from "next/image"
import { IOption } from "../types"
import { sendGTMEvent } from "@next/third-parties/google"

const DineInButtons = ({
	isDineIn = false,
	options
}: {
	isDineIn?: boolean
	options: { deliveryOptions: IOption[]; dineInOptions: IOption[] }
}) => {
	const { dineInOptions = [], deliveryOptions = [] } = options

	return (
		<div className="relative flex flex-col items-center w-full max-w-[400px] mt-8 mx-auto px-4">
			<div className="absolute top-[-16px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

			{/* Menu & other DINE_IN button */}
			{isDineIn &&
				dineInOptions?.map((item: IOption, index) =>
					item.show ? (
						<NextLink
							key={index}
							href={item?.path ?? "/"}
							passHref
							prefetch={item.preload}
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className="flex items-center px-6 py-4 bg-white rounded-lg mb-4 shadow-md w-[80vw] md:max-w-[500px] mx-auto cursor-pointer relative border border-gray-200 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-gray-50">
								{item.icon ? (
									<Image
										src={item.icon}
										alt={item.value}
										width={24}
										height={24}
										className="mr-4 drop-shadow-sm rounded"
									/>
								) : null}

								{/* Button Text */}
								<div className="text-gray-800 font-semibold text-sm">
									{item.value}
								</div>
							</div>
						</NextLink>
					) : null
				)}

			{/* Menu & other Delivery option button */}
			{!isDineIn &&
				deliveryOptions?.map((item: IOption, index) =>
					item.show ? (
						<NextLink
							key={index}
							href={item?.path ?? "/"}
							prefetch={item.preload}
							passHref
							target="_blank"
							rel="noopener noreferrer"
						>
							<div
								onClick={() =>
									sendGTMEvent({
										event: "buttonClicked",
										value: `xyz-${item.value}`
									})
								}
								className="flex items-center px-6 py-4 bg-white rounded-lg mb-4 shadow-md w-[80vw] md:max-w-[500px] mx-auto cursor-pointer relative border border-gray-200 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-gray-50"
							>
								{item.icon ? (
									<Image
										src={item.icon}
										alt={item.value}
										width={24}
										height={24}
										className="mr-4 drop-shadow-sm rounded"
									/>
								) : null}

								{/* Button Text */}
								<div className="text-gray-800 font-semibold text-sm">
									{item.value}
								</div>
							</div>
						</NextLink>
					) : null
				)}
		</div>
	)
}

export default DineInButtons
