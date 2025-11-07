import { gql } from "@apollo/client"

export const SPIN_SPINNER = gql`
	mutation SpinSpinner($spinnerId: ID!) {
		spinSpinner(spinnerId: $spinnerId) {
			offer {
				name
				discountType
				discountValue
			}
		}
	}
`

