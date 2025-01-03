import React, { useState, useContext, createContext, ReactNode } from "react"
import { Button, Link, Snackbar, SnackbarContent } from "@mui/material"
import NextLink from "next/link"
import { useTheme, styled } from "@mui/material/styles"

interface SnackbarContextType {
	showSnackbar: (data: { message: ReactNode; variant: string }) => void
	hideSnackbar: () => void
}

const contextDefaults: SnackbarContextType = {
	showSnackbar: () => {},
	hideSnackbar: () => {}
}

const SnackbarContext = createContext<SnackbarContextType>(contextDefaults)
const useSnackbarContext = () => useContext(SnackbarContext)

interface SnackbarProviderProps {
	children: ReactNode
}

// Create a provider component to wrap your application
export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
	children
}) => {
	const theme = useTheme()

	const [showContent, setShowContent] = useState(false)
	const [state, setState] = useState<{ message: ReactNode; variant: string }>({
		message: "", // initial message as a string or any valid ReactNode
		variant: "default"
	})
	const CustomSnackbarContent = styled(SnackbarContent)<{ bgcolor?: string }>(
		({ theme, bgcolor }) => ({
			backgroundColor: bgcolor || theme.palette.primary.main,
			color: theme.palette.getContrastText(
				bgcolor || theme.palette.primary.main
			),
			position: "relative", // Position relative to add pseudo-elements
			animation: "scaleSnackbar 0.5s ease-in-out, colorChange 0.5s ease-in-out",
			"& .MuiSnackbarContent-message": {
				animation: "scaleText 0.5s ease-in-out",
				width: "100%"
			},
			// Pseudo-elements for ribbon effect

			"&::before, &::after": {
				content: '""',
				position: "absolute",
				top: "50%",
				transform: "translateY(-50%)",
				width: "15px",
				height: "15px",
				backgroundColor: "inherit",
				clipPath: "polygon(0 0, 100% 50%, 0 100%)"
			},
			"&::before": {
				left: "-15px"
			},
			"&::after": {
				right: "-15px"
			}
		})
	)

	const action = (
		<Button sx={{ fontSize: "12px" }} color="inherit">
			<Link href={"/cart"} component={NextLink} underline="none" color="white">
				Go to cart
			</Link>
		</Button>
	)

	// Function to open snackbar
	const showSnackbar = (data: { message: ReactNode; variant: string }) => {
		setShowContent(true)
		setState({
			message: data.message,
			variant: data.variant
		})
	}

	const hideSnackbar = () => {
		setShowContent(false)
	}

	return (
		<SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
			{showContent && (
				<Snackbar open={true}>
					<CustomSnackbarContent
						sx={{
							"@keyframes colorChange": {
								"0%": { backgroundColor: theme.palette.error.main },
								"100%": { backgroundColor: theme.palette.primary.main }
							},
							"@keyframes scaleText": {
								"0%": { transform: "scale(0.5)" },
								"100%": { transform: "scale(1)" }
							}
						}}
						message={state.message}
						//  action={action}
					/>
				</Snackbar>
			)}
			{children}
		</SnackbarContext.Provider>
	)
}

export default useSnackbarContext
