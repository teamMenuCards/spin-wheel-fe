import { gql } from "@apollo/client"

// Mutation to submit restaurant feedback
export const SUBMIT_FEEDBACK = gql`
	mutation SubmitFeedback($input: FeedbackInput!) {
		submitFeedback(input: $input) {
			id
			restaurant_name
			customer_name
			customer_email
			customer_phone
			rating
			feedback_text
			order_id
			createdAt
			updatedAt
		}
	}
`

// Input type for feedback (this would be defined in your GraphQL schema)
// FeedbackInput {
//   restaurant_name: String!
//   customer_name: String
//   customer_email: String
//   customer_phone: String
//   rating: Int!
//   feedback_text: String
//   order_id: String
// }
