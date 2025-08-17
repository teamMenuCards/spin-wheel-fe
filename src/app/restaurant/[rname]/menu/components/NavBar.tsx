import { useState } from "react"
import FullPageDrawerComponent from "./contact-us-drawer"
import { DEFAULT_LOGO_IMG } from "../../constants"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft_Ic } from "@/app/restaurant/[rname]/menu/icons"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

interface NavBarProps {
	rname: string
	showCart?: boolean
	link?: string
	showLogo?: boolean
	restaurantInfo?: {
		name: string
		detail: {
			logo: string
		}
	}
}

const NavBar = ({
	rname,
	showCart = false,
	showLogo = true,
	link = "",
	restaurantInfo
}: NavBarProps) => {
	const { products } = useSelector((state: RootState) => state.cart)
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const logoImg = `url(${restaurantInfo?.detail.logo || DEFAULT_LOGO_IMG})`

	const handleCloseDrawer = () => {
		setIsDrawerOpen(false)
	}

	const itemCount = products.length


	return (
		<>
			<nav className="sticky top-0 z-40 w-full bg-white shadow-md px-4 py-2">
				<div className="max-w-7xl mx-auto flex items-center justify-between text-black">
					<div className="flex items-center">
						<Link href={link ?? `/restaurant/${rname}`}>
							<ChevronLeft_Ic className="w-5 h-5 stroke-3" />
						</Link>
							

						<Link href={link ?? `/restaurant/${rname}`}>
							<div className="text-md w-40 font-bold truncate ml-4 max-w-xs">
								{restaurantInfo?.name}
							</div>
						</Link>
					</div>

					<div className="flex items-center h-12">
						{/* cart icon */}

						{showCart && (
							<div className="relative">
								<Link href={`/restaurant/${rname}/cart`}>
									<Image
										unoptimized
										src="/cart.webp"
										alt="cart_icon"
										width={20}
										height={20}
										className="ml-2"
									/>

									{/* Badge for item count */}
									{itemCount > 0 && (
										<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
											{itemCount}
										</span>
									)}
								</Link>
							</div>
						)}

						{showLogo && restaurantInfo?.name && (
							// <Link href={`/restaurant/${rname}`}>
							<div
								className="w-12 rounded-full cursor-pointer ml-4 aspect-[1]"
								style={{
									backgroundImage: logoImg,
									backgroundSize: "contain",
									backgroundRepeat: "no-repeat",
									backgroundPosition: "center"
								}}
							/>
							// </Link>
						)}
					</div>
				</div>
			</nav>

			{isDrawerOpen && (
				<div className="relative z-50">
					<div
						className="fixed inset-0 bg-black bg-opacity-50"
						onClick={() => setIsDrawerOpen(false)}
					/>
					<FullPageDrawerComponent
						isOpen={isDrawerOpen}
						onClose={handleCloseDrawer}
					/>
				</div>
			)}
		</>
	)
}

export default NavBar
