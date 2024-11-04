import { queryKeys } from "@mcc/constants/queryKeys"
import { getProductList } from "@mcc/services/getProductList"
import { useQuery } from "@tanstack/react-query"

const useMenu = (id) => {
	const {
		isLoading: isLoadingMenu,
		error: menuError,
		data: menuData
	} = useQuery([queryKeys.getProductList], () => getProductList({ id }))

	return {
		menuData,
		isLoadingMenu,
		menuError
	}
}

export default useMenu
