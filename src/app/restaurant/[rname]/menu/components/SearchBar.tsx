// components/SearchBar.tsx
import { useSnackbar } from "@/app/providers/SnackbarProvider"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FiSearch } from "react-icons/fi"

export interface SearchBarProps {
	restaurantInfo?: string
	rName: string
}

export default function SearchBar({ restaurantInfo, rName }: SearchBarProps) {
	const router = useRouter()
	const [query, setQuery] = useState("")
	const { isVisible } = useSnackbar()

	const handleSearchClick = () => {
		router.push(`/restaurant/${rName}/search`)
	}

	return (
		<div
			className={`fixed bottom-0 z-50 left-0 mx-auto max-w-md w-auto right-0 mr-1 p-2 bg-white flex items-center justify-between transition-all duration-300 ${
				isVisible ? "bottom-[3rem]" : "bottom-0"
			}`}
		>
			<div
				className="flex items-center left-4 right-4 bg-gray-100 rounded px-2 py-2"
				onClick={handleSearchClick}
			>
				<FiSearch className="text-gray-300 mr-2 text-2xl" />
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onClick={handleSearchClick}
					placeholder={`Search In ${restaurantInfo}`}
					className="bg-gray-100 outline-none w-full text-black  text-md cursor-pointer"
					readOnly
				/>
			</div>
		</div>
	)
}
