"use client"
import { Box, Typography } from "@mui/material"
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import useMenu from "@mcc/hooks/useMenu"
import MenuItem from "./menu-item"
import Loading from "@mcc/app/loading"
import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { isSafeArray } from "@mcc/helpers/utils"
import FloatingMenu from "./floating-menu"

const key = "ADDED_FIRST_ITEM"

function App() {
	const { rid } = useParams()
	const { menuData: { data } = {}, isLoadingMenu, menuError } = useMenu(rid)

	const [currentCategory, setCurrentCategory] = useState<string | undefined>(
		undefined
	)

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
						const categoryId = item.id
						return (
							<Box
								key={categoryId}
								id={categoryId}
								data-category-id={categoryId}
							>
								<Accordion defaultExpanded elevation={0}>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls={`${categoryId}-content`}
										id={categoryId}
										style={{ fontWeight: "bold" }}
										onClick={() => setCurrentCategory(categoryId)}
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
						)
					})}
			</Box>
			{isSafeArray(data?.categories) && (
				<FloatingMenu
					categories={data.categories}
					currentCategory={currentCategory}
				/>
			)}
		</>
	)
}

export default App
