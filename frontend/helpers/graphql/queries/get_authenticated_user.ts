import { gql } from '@apollo/client'

const GET_AUTHENTICATED_USER = gql`
    query getAuthenticatedUser {
        me {
            id
            first_name
            last_name
            email
            avatar
            slug
            updated_at
        }
    }
`

export default GET_AUTHENTICATED_USER
