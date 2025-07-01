import { axiosServerQuery } from "@/services/http-server"
import { parseDynamicURL } from "@/services/utils"
import { apiRoutes } from "@/services/api-routes"
import ContactOwner from "./ContactOwner"

export default async function ReachOwner({
	params
}: {
	params: Promise<{ rname: string }>
}) {
	const { rname } = await params

	const { data: restaurantInfo } = await axiosServerQuery({
		url: parseDynamicURL(apiRoutes.restaurantDetail, { name: rname }),
		method: "GET"
	})

	return (
		<>
			<ContactOwner restaurantInfo={restaurantInfo} rname={rname} />
		</>
	)
}
