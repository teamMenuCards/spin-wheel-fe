import { log } from "console"
import React, {
	useRef,
	useState,
	useCallback,
	createContext,
	useContext,
	ReactNode
} from "react"
import ReactCanvasConfetti from "react-canvas-confetti"

interface ConfettiContextType {
	showConfetti: () => void
	hideConfetti: () => void
}

const contextDefaults: ConfettiContextType = {
	showConfetti: () => {},
	hideConfetti: () => {}
}

const ConfettiContext = createContext<ConfettiContextType>(contextDefaults)
const useConfettiContext = () => useContext(ConfettiContext)

interface ConfettiProviderProps {
	children: ReactNode
}

export const ConfettiProvider: React.FC<ConfettiProviderProps> = ({
	children
}) => {
	const [showContent, setShowContent] = useState(false)

	const refAnimationInstance = useRef<null | ((opts: any) => void)>(null)

	const getInstance = useCallback(
		(instance: { confetti: (opts: any) => void }) => {
			refAnimationInstance.current = instance.confetti
		},
		[]
	)

	const makeShot = useCallback((particleRatio, opts) => {
		if (refAnimationInstance.current) {
			refAnimationInstance.current({
				...opts,
				origin: { y: 0.7 },
				particleCount: Math.floor(200 * particleRatio)
			})
		}
	}, [])

	const fire = useCallback(() => {
		makeShot(0.25, { spread: 26, startVelocity: 55 })
		makeShot(0.2, { spread: 60 })
		makeShot(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
		makeShot(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
		makeShot(0.1, { spread: 120, startVelocity: 45 })
	}, [makeShot])

	const showConfetti = () => {
		setShowContent(true)
		fire()

		console.log("Showinghshconfetti")
	}

	const hideConfetti = () => {
		// setShowContent(false)
		// Optional: Add logic to hide confetti if needed
	}

	return (
		<ConfettiContext.Provider value={{ showConfetti, hideConfetti }}>
			{true && (
				<ReactCanvasConfetti
					onInit={getInstance}
					style={{
						position: "fixed",
						pointerEvents: "none",
						width: "100%",
						height: "100%",
						top: 0,
						left: 0,
						marginTop: "100px",
						zIndex: 100000
					}}
				/>
			)}
			{children}
		</ConfettiContext.Provider>
	)
}

export default useConfettiContext
