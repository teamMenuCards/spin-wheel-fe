import { Dialog, DialogContent, DialogProps } from "@mui/material"

interface Props {
	children: React.ReactNode
	dialogProps: DialogProps
}

export default function Popup({ children, dialogProps }: Props) {
	return (
		<Dialog fullWidth maxWidth="lg" scroll="body" {...dialogProps}>
			<DialogContent dividers sx={{ p: 0 }}>
				{children}
			</DialogContent>
		</Dialog>
	)
}
