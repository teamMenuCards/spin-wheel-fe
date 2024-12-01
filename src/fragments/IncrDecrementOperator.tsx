import { Box, styled, Typography } from "@mui/material"

function IncrementOperator({
	product,
	size = "large",
	onClickPlus,
	onClickMinus
}) {
	const defaultQty = 1

	const StyledContainer = styled(Box)(({ theme }) => ({
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		display: "flex",
		alignItems: "center",
		width: "fit-content",
		height: "25px",
		borderRadius: "6px"
	}))

	if (size == "small") {
		return (
			<StyledContainer>
				<Typography px={1} onClick={onClickMinus} fontSize="25px">
					-
				</Typography>

				<Typography fontSize="12px" fontWeight="bold">
					{product?.quantity || defaultQty}
				</Typography>
				<Typography px={1} onClick={onClickPlus} fontSize="25px">
					+
				</Typography>
			</StyledContainer>
		)
	}

	return (
		<>
			<StyledContainer px={1}>
				<Typography px={2} onClick={onClickMinus} fontSize="25px">
					-
				</Typography>

				<Typography fontSize="20px">
					{product?.quantity || defaultQty}
				</Typography>
				<Typography px={2} onClick={onClickPlus} fontSize="25px">
					+
				</Typography>
			</StyledContainer>
		</>
	)
}

export default IncrementOperator
