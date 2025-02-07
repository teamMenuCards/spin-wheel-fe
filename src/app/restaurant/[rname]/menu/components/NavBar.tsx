import { useState } from "react"
import FullPageDrawerComponent from "./contact-us-drawer"

interface NavBarProps {
	rname: string
	restaurantInfo?: {
		name: string
		detail: {
			logo: string
		}
	}
}

const DEFAULT_IMG = 'url("https://dummyimage.com/600x400/000/fff")'

const NavBar = ({ rname, restaurantInfo }: NavBarProps) => {
	rname = restaurantInfo?.name || ""
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const coverImage = `url(${restaurantInfo?.detail.logo || DEFAULT_IMG})`

	const handleCloseDrawer = () => {
		setIsDrawerOpen(false)
	}

	return (
		<>
			<nav className="sticky top-0 z-40 w-full bg-white shadow-md px-4 py-2">
				<div className="max-w-7xl mx-auto flex items-center justify-between">
					<div className="text-xl font-bold truncate">{rname}</div>
					<div
						className="w-12 h-12 rounded-full cursor-pointer ml-4 aspect-[1]"
						style={{
							backgroundImage: coverImage,
							backgroundSize: "cover",
							backgroundPosition: "center"
						}}
					/>
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
