"use client"
import { Box, Typography } from "@mui/material"
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import useMenu from "@mcc/hooks/useMenu"
import MenuItem from "./menu-item"
import Loading from "@mcc/app/loading"
import React, { useEffect } from "react"
import { useParams } from "next/navigation"
import { isSafeArray } from "@mcc/helpers/utils"

const key = "ADDED_FIRST_ITEM"

function App() {
	const { rid } = useParams()

	const { menuData: { data } = {}, isLoadingMenu, menuError } = useMenu(rid)

	console.log("ridjj--", data)

	// Clear localStorage on page refresh
	useEffect(() => {
		const handleBeforeUnload = () => {
			localStorage.removeItem(key)
		}

		window.addEventListener("beforeunload", handleBeforeUnload)

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload)
		}
	}, [])

	if (isLoadingMenu) {
		return <Loading />
	}

	if (menuError) {
		return (
			<>
				<Typography>Unable to load data</Typography>
			</>
		)
	}

	return (
		<>
			{/* List Menu main content */}
			<Box mb={8} id="mainMenu" key="mainMenu">
				{isSafeArray(data.categories) &&
					data.categories.map((item) => {
						return (
							<>
								<Box id={item._id} key={item._id}>
									<Accordion defaultExpanded elevation={0} id="salads">
										<AccordionSummary
											expandIcon={<ExpandMoreIcon />}
											aria-controls="panel1-content"
											id={item.name.replaceAll(" ", "-")}
											style={{ fontWeight: "bold" }}
										>
											{item.display_name}
										</AccordionSummary>
										<AccordionDetails>
											{item.products.map((prd) => {
												return <MenuItem product={prd} key={prd.id} />
											})}
										</AccordionDetails>
									</Accordion>
								</Box>
							</>
						)
					})}
			</Box>
		</>
	)
}

export default App
