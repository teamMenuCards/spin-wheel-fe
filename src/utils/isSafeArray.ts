export function isSafeArray<T>(arr: T[] | undefined): arr is T[] {
	return Array.isArray(arr) && arr.length > 0
}
