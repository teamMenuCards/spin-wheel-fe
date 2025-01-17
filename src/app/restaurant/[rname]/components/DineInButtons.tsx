import NextLink from "next/link"
import Image from "next/image"

const DineInButtons = ({ options }) => (
	<div className="flex flex-col items-center w-full max-w-[400px] mt-8 mx-auto px-4 relative">
		{/* Decorative Line */}
		<div className="absolute top-[-16px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

		{/* Menu Options */}
		{options?.map((item, index) => (
			<NextLink key={index} href={item.path} passHref>
				<div className="flex items-center px-6 py-4 bg-white rounded-lg mb-4 shadow-md w-[80vw] md:max-w-[500px] mx-auto cursor-pointer relative border border-gray-200 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-gray-50">
					{/* Icon */}
					{item.value === "Menu" && (
						<Image
							src="/menu-icon.png"
							alt="Menu"
							width={24}
							height={24}
							className="mr-4 drop-shadow-sm rounded"
						/>
					)}
					{item.value === "Review us on Zomato" && (
						<Image
							src="/zomato-logo.png"
							alt="Review us on Zomato"
							width={24}
							height={24}
							className="mr-4 drop-shadow-sm rounded"
						/>
					)}
					{item.value === "Review us on Google" && (
						<Image
							src="/google-logo.png"
							alt="Review us on Google"
							width={24}
							height={24}
							className="mr-4 drop-shadow-sm rounded"
						/>
					)}
					{item.value === "Instagram" && (
						<Image
							src="/instagram-icon.png"
							alt="Instagram"
							width={24}
							height={24}
							className="mr-4 drop-shadow-sm rounded"
						/>
					)}
					{/* Button Text */}
					<div className="text-gray-800 font-semibold text-sm">
						{item.value}
					</div>
				</div>
			</NextLink>
		))}
	</div>
)

export default DineInButtons
