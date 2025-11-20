import { SUBMIT_FEEDBACK } from "@/graphql/mutations/feedback"
import { apolloClient } from "@/lib/apollo-client"

export interface FeedbackInput {
	restaurant_name: string
	customer_name?: string
	customer_email?: string
	customer_phone?: string
	rating: number
	feedback_text?: string
	order_id?: string
}

export interface FeedbackResponse {
	id: string
	restaurant_name: string
	customer_name?: string
	customer_email?: string
	customer_phone?: string
	rating: number
	feedback_text?: string
	order_id?: string
	createdAt: string
	updatedAt: string
}

export class GraphQLFeedbackService {
	/**
	 * Submit feedback using GraphQL mutation
	 */
	static async submitFeedback(input: FeedbackInput) {
		try {
			const { data } = await apolloClient.mutate<{
				submitFeedback: FeedbackResponse
			}>({
				mutation: SUBMIT_FEEDBACK,
				variables: { input },
				errorPolicy: "all"
			})

			return data?.submitFeedback || null
		} catch (error) {
			console.error("Error submitting feedback:", error)
			throw error
		}
	}
}
