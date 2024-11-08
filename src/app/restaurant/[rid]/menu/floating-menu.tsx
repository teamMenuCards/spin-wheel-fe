import { Box, Dialog, Fab, List, ListItemButton, ListItemText, Typography } from "@mui/material"
import { useState } from "react"
import { styled } from "@mui/material/styles"
import CloseIcon from "@mui/icons-material/Close"

interface Category {
	id: string
	name: string
	display_name: string
	products?: any[]
}

interface FloatingMenuProps {
	categories: Category[]
	currentCategory?: string
}

const StyledFab = styled(Fab)(({}) => ({
	position: "fixed",
	bottom: 16,
	right: 16,
	backgroundColor: "#000000",
	color: "#FFFFFF",
	"&:hover": {
		backgroundColor: "#333333"
	}
}))

const FloatingMenu = ({ categories, currentCategory }: FloatingMenuProps) => {
	const [open, setOpen] = useState(false)

	const handleClick = (categoryId: string) => {
		setOpen(false)
		const element = document.getElementById(categoryId)
		if (element) {
			element.scrollIntoView({ behavior: "smooth" })
		}
	}

	return (
		<>
			<StyledFab
				variant="extended"
				aria-label={open ? "close menu" : "menu"}
				onClick={() => setOpen(!open)}
			>
				{open ? (
					<CloseIcon />
				) : (
					<Typography variant="subtitle2" sx={{ px: 1 }}>
						MENU
					</Typography>
				)}
			</StyledFab>

			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				PaperProps={{
					sx: {
						position: "fixed",
						bottom: "80px",
						right: 16,
						m: 0,
						width: "280px",
						minWidth: "auto",
						maxHeight: "400px",
						bgcolor: "#000000",
						color: "#FFFFFF",
						boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
						borderRadius: "8px",
						transform: 'translateY(50%)',
						'& .MuiDialog-paper': {
							margin: 0,
						}
					}
				}}
				BackdropProps={{
					sx: {
						backgroundColor: 'transparent'
					}
				}}
				sx={{
					'& .MuiDialog-container': {
						alignItems: 'flex-end',
						justifyContent: 'flex-end'
					}
				}}
			>
				<List sx={{ py: 0.5 }}>
					{categories.map((category) => (
						<ListItemButton
							key={category.id} // Using id
							onClick={() => handleClick(category.id)}
							sx={{
								py: 0.75,
								px: 2,
								minHeight: '36px',
								'&:hover': {
									backgroundColor: 'rgba(255, 255, 255, 0.1)'
								}
							}}
						>
							<ListItemText 
								primary={category.display_name}
								primaryTypographyProps={{
									variant: "body2",
									sx: { 
										color: category.id === currentCategory ? '#ff4444' : '#ffffff',
										fontWeight: 400,
										fontSize: '0.875rem'
									}
								}}
							/>
							<Typography 
								variant="body2" 
								sx={{ 
									color: category.id === currentCategory ? '#ff4444' : 'rgba(255, 255, 255, 0.7)',
									ml: 2
								}}
							>
								{category.products?.length || 0}
							</Typography>
						</ListItemButton>
					))}
				</List>
			</Dialog>
		</>
	)
}

export default FloatingMenu
