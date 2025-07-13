import { useState, useEffect } from "react"

export const useFeatureList = (rname: string) => {
	const [featureList, setFeatureList] = useState<string[]>(() => {
		// Only access localStorage on client side
		if (typeof window !== 'undefined') {
			const storedFeatures = localStorage.getItem(rname)
			return storedFeatures ? JSON.parse(storedFeatures) : []
		}
		return []
	})

	useEffect(() => {
		const storedFeatures = localStorage.getItem(rname)
			? JSON.parse(localStorage.getItem(rname) || "[]")
			: []
		setFeatureList(storedFeatures)
	}, [rname])

	const hasFeature = (feature: string): boolean => {
		return featureList.includes(feature)
	}

	return { featureList, hasFeature }
}
