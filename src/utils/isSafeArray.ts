export const isSafeArray = <T>(arr: T[] | undefined | null): arr is T[] => {
	return Array.isArray(arr) && arr.length > 0
}
