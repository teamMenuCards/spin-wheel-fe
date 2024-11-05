import { useState } from "react"

function useToggle(initialValue = false) {
	const [isOpen, setIsOpen] = useState(initialValue)

	const open = () => setIsOpen((prev) => !prev)

	const close = () => setIsOpen(false)

	return { isOpen, open, close }
}

export default useToggle
