type ParamsFallbackValue = {
	SubReason: string
}

export interface IPayload {
	apiKey: string | undefined
	campaignName?: string
	destination?: string
	userName?: string
	templateParams?: string[]
	source?: string
	media?: object
	buttons?: []
	carouselCards: []
	location?: object
	attributes?: object
	paramsFallbackValue?: ParamsFallbackValue
}
