import { gql } from '@apollo/client'

const UPDATE_PASSWORD = gql`
    mutation UpdateQuestion($input: UpdatePassword!) {
        updatePassword(input: $input) {
            status
            message
        }
    }
`
export default UPDATE_PASSWORD
