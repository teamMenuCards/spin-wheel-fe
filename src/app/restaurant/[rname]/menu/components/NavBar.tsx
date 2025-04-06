import { useState } from "react"
import FullPageDrawerComponent from "./contact-us-drawer"
import { DEFAULT_LOGO_IMG } from "../../constants"
import Link from "next/link"

interface NavBarProps {
	rname: string
	restaurantInfo?: {
		name: string
		detail: {
			logo: string
		}
	}
}

const NavBar = ({ rname, restaurantInfo }: NavBarProps) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const logoImg = `url(${restaurantInfo?.detail.logo || DEFAULT_LOGO_IMG})`

	const handleCloseDrawer = () => {
		setIsDrawerOpen(false)
	}

	return (
		<>
			<nav className="sticky top-0 z-40 w-full bg-white shadow-md px-4 py-2">
				<div className="max-w-7xl mx-auto flex items-center justify-between text-black">
					<div className="text-xl font-bold truncate">
						{restaurantInfo?.name}
					</div>
					<Link href={`/restaurant/${rname}`}>
						<div
							className="w-12 h-12 rounded-full cursor-pointer ml-4 aspect-[1]"
							style={{
								backgroundImage: logoImg,
								backgroundSize: "cover",
								backgroundPosition: "center"
							}}
						/>
					</Link>
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
