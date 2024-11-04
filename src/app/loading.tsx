import { Box, CircularProgress } from "@mui/material"

import Image from "next/image"

export default function Loading() {
	return (
		<Box display="flex" width="100vw" height="100vh">
			<Box margin="auto" textAlign="center">
				<Box mb={2} mt={2}>
					<Image
						src="/logo.png"
						alt="App Logo"
						width={140}
						height={120}
						priority
					/>
				</Box>

				<CircularProgress />
			</Box>
		</Box>
	)
}
