"use client"
import { useSnackbar } from "@/app/providers/SnackbarProvider"
import { useFeatureList } from "@/hooks/useFeatureList"
import { RestaurantDetailResponse } from "@/services/restaurant/get-restaurant-detail"
import { CLIENT_APP_MODE } from "@/store/features/app.slice"
import { setRestaurantDetails } from "@/store/features/restaurant.slice"
import { isSafeArray } from "@/utils/isSafeArray"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import BackgroundImage from "../shared/BackgroundImg"
import DineInButtons from "../shared/DineInButtons"
import DineInfoCard from "../shared/DineInfoCard"
import Modal from "../shared/Modal"
import PopupContent from "../shared/PopUpContent"
import ReviewsCarousel from "../shared/ReviewsCarousel"
import { FEATURES, IOption } from "../types"
import { useSpinnerForRestaurant } from "@/hooks/useSpinnerForRestaurant"

function DeliveryLandingPage({
	rname,
	restaurantInfo
}: {
	rname: string
	restaurantInfo: RestaurantDetailResponse | undefined
}) {
	const dispatch = useDispatch()
	const { hasFeature } = useFeatureList(rname)
	const { hideSnackbar } = useSnackbar()
	const { data: spinnerData, loading: spinnerLoading } = useSpinnerForRestaurant(
		restaurantInfo?.id || ""
	)
	const hasSpinWheelFeature = !spinnerLoading && spinnerData
	const showZomatoNudgePopup = hasFeature(
		FEATURES.RESTAURANT_PRE_PLATFORM_ORDER_FLOW
	)

	if (restaurantInfo) {
		dispatch(setRestaurantDetails(restaurantInfo))
	}

	useEffect(() => {
		hideSnackbar()
	}, [hideSnackbar])

	useEffect(() => {
		localStorage.setItem("appMode", CLIENT_APP_MODE.DELIVERY)

		/*  Find Enabled features  */
		if (restaurantInfo?.detail?.feature_flags) {
			const featureList = restaurantInfo?.detail?.feature_flags

			const enabledFeatures = Object.keys(featureList).filter(
				(item) => !!featureList[item]
			)

			localStorage.setItem(rname, JSON.stringify(enabledFeatures))
		}
	}, [dispatch, restaurantInfo, rname])

	useEffect(() => { }, [rname])

	const reviewsRef = useRef<HTMLDivElement>(null!)

	const reviews = restaurantInfo?.detail?.details?.reviews_image_url_details

	const getPath = (rid: string, data: RestaurantDetailResponse) => {
		const details = data?.detail?.details

		const linksList: Record<string, string> = {}

		const whatsappLink = details?.wa_api_details.wa_number

		const platformDetails = details?.platform_details ?? []

		platformDetails.forEach((item) => {
			linksList[item.platform_name] = item.platform_uri
		})

		const getMssg = (mssg: string) => {
			return encodeURIComponent(mssg)
		}

		const encodedMessage =
			restaurantInfo &&
			getMssg(
				`Hi team ${restaurantInfo.name}. Please keep me updated on the weekly offers`
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
				value: "Spin For Discount",
				path: `/restaurant/${rid}/spin-wheel`,
				icon: "/spin-wheel2.png",
				show: !!hasSpinWheelFeature
			},
			{
				id: 3,
				value: "Contact Us",
				path: `https://wa.me/${whatsappLink}`,
				icon: "/whatsapp.svg",
				show: !!whatsappLink
			},
			// {
			// 	id: 3,
			// 	value: "Find us at",
			// 	path: linksList["locate-us-link"],
			// 	icon: "/google_map.svg",
			// 	show: !!linksList["locate-us-link"]
			// },
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
				show: true,
				preload: true
			},

			{
				id: 2,
				value: "Review us on Google",
				path: linksList["google-review"],
				icon: "/google-logo.webp",
				show: !!linksList["google-review"],
				preload: false
			},
			{
				id: 3,
				value: "Say Hello to receive offers",
				path: `${linksList["whatsapp-link"]}${encodedMessage} `,
				icon: "/whatsapp.svg",
				show: !!linksList["whatsapp-link"],
				preload: false
			},
			{
				id: 4,
				value: "Follow on Instagram",
				path: linksList["insta"],
				icon: "/instagram-icon.webp",
				show: !!linksList["insta"],
				preload: false
			}
		]

		return { deliveryOptions, dineInOptions }
	}

	const defualtBtns = restaurantInfo && getPath(rname, restaurantInfo)
	const [activePopup, setActivePopup] = useState<string | null>(null)

	return (
		<div className="w-screen min-h-screen relative overflow-hidden">
			{restaurantInfo && (
				<BackgroundImage
					restaurantInfo={restaurantInfo}
				// imagesRef={imagesRef}
				/>
			)}

			<div className="w-full bg-white relative mt-[180px] z-[3] min-h-[calc(100vh-180px)] max-w-100 border-20 border-gray-100 rounded-t-[20px] p-[60px_16px_16px]">
				{restaurantInfo && (
					<DineInfoCard
						restaurantInfo={restaurantInfo}
						reviewsRef={reviewsRef}
					/>
				)}

				{restaurantInfo && (
					<DineInButtons
						isDineIn={false}
						options={
							defualtBtns
								? {
									...defualtBtns,
									deliveryOptions: defualtBtns.deliveryOptions.filter(
										(d) => d.id === 1 || d.id === 2
									)
								}
								: undefined
						}
						dynamicOptions={restaurantInfo?.dashboardLinks}
					/>
				)}

				{reviews && (
					<div ref={reviewsRef}>
						<ReviewsCarousel reviews={reviews} />
					</div>
				)}

				{(activePopup?.includes("Order from Zomato") ||
					activePopup?.includes("Order from Swiggy")) &&
					showZomatoNudgePopup && (
						<Modal onClose={() => setActivePopup(null)}>
							<PopupContent
								platformName={
									activePopup === "Order from Zomato" ? "Zomato" : "Swiggy"
								}
								platformLink={
									defualtBtns?.deliveryOptions.find(
										(d) => d.value === activePopup
									)?.path || "#"
								}
								directOrderLink={
									defualtBtns?.deliveryOptions.find(
										(d) => d.value === "Contact Us"
									)?.path || "#"
								}
							/>
						</Modal>
					)}
			</div>
		</div>
	)
}

export default DeliveryLandingPage
