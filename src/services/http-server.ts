import axios, { AxiosError, AxiosRequestConfig, Method } from "axios"

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4200/"

export const axiosServerQuery = async ({
	url,
	method,
	data,
	params,
	headers
}: {
	url: string
	method?: Method
	data?: AxiosRequestConfig["data"]
	params?: AxiosRequestConfig["params"]
	headers?: AxiosRequestConfig["headers"]
}) => {
	console.log(baseURL + url)
	try {
		const result = await axios({
			url: baseURL + url,
			method,
			data,
			params,
			headers
		})
		return { data: result.data.data }
	} catch (axiosError) {
		console.log(axiosError)
		const err = axiosError as AxiosError
		return {
			error: {
				status: err.response?.status,
				data: err.response?.data || err.message
			}
		}
	}
}
