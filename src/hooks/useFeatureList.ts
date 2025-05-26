import { useState, useEffect } from "react"

export const useFeatureList = (rname: string) => {
	const [featureList, setFeatureList] = useState<string[]>([])

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
