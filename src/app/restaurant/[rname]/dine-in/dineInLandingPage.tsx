"use client"
import { useRef } from "react"
import DineInButtons from "../shared/DineInButtons"
import DineInfoCard from "../shared/DineInfoCard"

import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"

import { CLIENT_APP_MODE, setMode } from "@/store/features/app.slice"
import { IDynamicLink } from "@/types"
import { isSafeArray } from "@/utils/isSafeArray"
import { useDispatch } from "react-redux"
import BackgroundImage from "../shared/BackgroundImg"
import { FEATURES, IOption } from "../types"

function DineInLandingPage({
	rname,
	restaurantInfo
}: {
	rname: string
	restaurantInfo?: RestaurantDetailResponse | undefined
}) {
	const dispatch = useDispatch()
	const DINE_IN = CLIENT_APP_MODE.DINE_IN
	const modeSetRef = useRef(false)

	// Set mode immediately on component mount (only once)
	if (!modeSetRef.current) {
		console.log("DineInLandingPage - Setting mode to DINE_IN")
		dispatch(setMode(DINE_IN))
		// Also persist to localStorage
		localStorage.setItem('appMode', DINE_IN)
		modeSetRef.current = true
	}

	// const [featuresLoaded, setFeaturesLoaded] = useState(false)

	const dashboardLinks = restaurantInfo?.dashboardLinks || []

	/*  Find Enabled features  */

	// useEffect(() => {
	// 	if (restaurantInfo?.detail?.feature_flags) {
	// 		const featureList = restaurantInfo.detail.feature_flags

	// 		const enabledFeatures = Object.keys(featureList).filter(
	// 			(item) => !!featureList[item]
	// 		)

	// 		localStorage.setItem(rname, JSON.stringify(enabledFeatures))
	// 		setFeaturesLoaded(true)
	// 	}
	// }, [restaurantInfo, rname])

	const featureFlags = restaurantInfo?.detail?.feature_flags || {}
	const hasReviewFeature = featureFlags[FEATURES.RESTAURANT_REVIEW_MODULE]

	const diningLinks =
		isSafeArray(dashboardLinks) &&
		dashboardLinks?.filter((link: IDynamicLink) => link.link_type === "DINING")

	const reviewsRef = useRef<HTMLDivElement>(null!)

	const getPath = (rid: string, data: RestaurantDetailResponse) => {
		const details = data?.detail?.details

		if (details?.platform_details) {
			const linksList: Record<string, string> = {}

			details.platform_details.forEach((item) => {
				linksList[item.platform_name] = item.platform_uri
			})

			const getMssg = (mssg: string) => {
				return encodeURIComponent(mssg)
			}

			const encodedMessage =
				data &&
				getMssg(
					`Hi team ${data.name}. Please keep me updated on the weekly offers`
				)

			const deliveryOptions: IOption[] = [
				{
					id: 1,
					value: "Menu",
					path: `/restaurant/${rid}/menu`,
					icon: "/menu-icon.webp",
					show: true
				},
				{
					id: 2,
					value: "Contact Us",
					path: linksList["whatsapp-link"],
					icon: "/whatsapp.svg",
					show: !!linksList["whatsapp-link"]
				},
				{
					id: 4,
					value: "Order from Zomato",
					path: linksList["zomato-delivery"],
					icon: "/zomato-logo.webp",
					show: !!linksList["zomato-delivery"]
				},
				{
					id: 5,
					value: "Order from Swiggy",
					path: linksList["swiggy-link"],
					icon: "/swiggy-logo.webp",
					show: !!linksList["swiggy-link"]
				}
			]

			const dineInOptions: IOption[] = [
				{
					id: 1,
					value: "Menu",
					path: `/restaurant/${rid}/menu`,
					icon: "/menu-icon.webp",
					show: true
				},
				{
					id: 2,
					value: "Review us on Google",
					path: linksList["google-review"],
					icon: "/google-logo.webp",
					show: !!linksList["google-review"]
				},
				{
					id: 3,
					value: "Say Hello to receive offers",
					path: `${linksList["whatsapp-link"]}${encodedMessage} `,
					icon: "/whatsapp.svg",
					show: !!linksList["whatsapp-link"]
				},
				{
					id: 4,
					value: "Follow on Instagram",
					path: linksList["insta"],
					icon: "/instagram-icon.webp",
					show: !!linksList["insta"]
				}
			]

			return { deliveryOptions, dineInOptions }
		} else {
			console.error("Invalid or missing platform details")
			return { deliveryOptions: [], dineInOptions: [] }
		}
	}

	const options = restaurantInfo && getPath(rname, restaurantInfo)

	return (
		<div className="w-screen min-h-screen relative overflow-hidden">
			{restaurantInfo && <BackgroundImage restaurantInfo={restaurantInfo} />}

			<div className="w-full bg-white relative mt-[180px] z-[3] min-h-[calc(100vh-180px)] max-w-100 border-20 border-gray-100 rounded-t-[20px] p-[60px_16px_16px]">
				{restaurantInfo && (
					<DineInfoCard
						isDineIn
						restaurantInfo={restaurantInfo}
						reviewsRef={reviewsRef}
					/>
				)}

				{diningLinks && isSafeArray(diningLinks) ? (
					<DineInButtons
						dynamicOptions={diningLinks}
						restaurantInfo={restaurantInfo}
						hasReviewFeature={hasReviewFeature}
					/>
				) : options && Object.keys(options).length > 0 ? (
					<DineInButtons
						hasReviewFeature={hasReviewFeature}
						options={options}
						restaurantInfo={restaurantInfo}
					/>
				) : null}
			</div>
		</div>
	)
}

export default DineInLandingPage
