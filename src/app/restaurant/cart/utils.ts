export const getVariant = (variant) => {
	if (variant.selected && variant.name) {
		return `${variant.name} (${variant.selected.name})`
	}
	return `(${variant?.selected?.name ?? variant.name})`
}

export const getValue = (variant) => {
	if (variant.selected) {
		return variant.selected.value
	}
	return variant.value
}
