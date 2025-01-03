import { queryKeys } from "@mcc/constants/queryKeys"
import { getProductList } from "@mcc/services/getProductList"
import { useQuery } from "@tanstack/react-query"

const useMenu = (rid: string) => {
	const {
		isLoading: isLoadingMenu,
		error: menuError,
		data: menuData
	} = useQuery([queryKeys.getProductList], () => getProductList({ rid }))

	return {
		menuData,
		isLoadingMenu,
		menuError
	}
}

export default useMenu
