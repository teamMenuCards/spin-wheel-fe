import React from "react"
import { Drawer, styled, IconButton, Box, Typography } from "@mui/material"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk"

const FullPageDrawer = styled(Drawer)({
	width: "100%",
	height: "100vh",
	flexShrink: 0,
	"& .MuiDrawer-paper": {
		width: "100%"
	}
})

const DrawerContainer = styled("div")({
	width: "100%"
})

const FullPageDrawerComponent = ({ isOpen = true }) => {
	const toggleDrawer = () => (event: { type?: string; key?: string }) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return
		}
	}

	// Add your menu categories here
	const menuItems = [
		{ value: "Monday", timing: "10:00 AM - 10:00 PM" },
		{ value: "Tuesday", timing: "10:00 AM - 10:00 PM" },
		{ value: "Wednesday", timing: "10:00 AM - 10:00 PM" },
		{ value: "Thursday", timing: "10:00 AM - 10:00 PM" },
		{ value: "Friday", timing: "10:00 AM - 10:00 PM" },
		{ value: "Saturday", timing: "10:00 AM - 10:00 PM" },
		{ value: "Sunday", timing: "10:00 AM - 10:00 PM" }
	]

	const handleChat = () => {
		const encodedMessage = encodeURIComponent("Hi. I want to know more!")

		const whatsappUrl = `https://wa.me/919324995221?text=${encodedMessage}`
		window.open(whatsappUrl, "_blank")
	}

	return (
		<FullPageDrawer anchor="right" open={isOpen} onClose={toggleDrawer()}>
			<DrawerContainer
				sx={{ marginTop: "70px", padding: 2 }}
				onClick={toggleDrawer()}
				onKeyDown={toggleDrawer()}
				role="presentation"
			>
				<Box style={{ display: "flex", alignItems: "center" }} mt={1}>
					<IconButton style={{ padding: 0 }}>
						<PhoneInTalkIcon fontSize="small" />
					</IconButton>

					<Typography color="secondary" variant="SPP_H6" ml={1}>
						Call us!
					</Typography>
					<Typography color="secondary" variant="SPP_Body_1" ml={1}>
						<a href="tel:9324995221" style={{ textDecoration: "underline" }}>
							9324995221
						</a>
					</Typography>
				</Box>

				<Box
					style={{ display: "flex", alignItems: "center" }}
					mt={1}
					onClick={handleChat}
				>
					<IconButton style={{ padding: 0 }}>
						<WhatsAppIcon fontSize="small" sx={{ color: "#7cb34d" }} />
					</IconButton>

					<Typography color="pastelGreen" variant="SPP_H6" ml={1}>
						Chat with us!
					</Typography>
				</Box>

				<Typography color="secondary" variant="SPP_Caption" mt={4}>
					Opening hours
				</Typography>

				<Box mt={4}>
					<table>
						<tbody>
							{menuItems.map((item) => (
								<tr key={item.value}>
									<td>
										<Typography color="secondary" variant="SPP_Caption">
											{item.value}
										</Typography>
									</td>
									<td>
										<Typography color="secondary" variant="SPP_Caption">
											{item.timing}
										</Typography>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</Box>
			</DrawerContainer>
		</FullPageDrawer>
	)
}

export default FullPageDrawerComponent
