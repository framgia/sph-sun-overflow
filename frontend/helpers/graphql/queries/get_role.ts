import { gql } from '@apollo/client'

const GET_ROLE = gql`
    query Role($slug: String!) {
        role(slug: $slug) {
            id
            name
            description
            permissions {
                id
                name
            }
            users {
                id
                first_name
                last_name
                avatar
            }
        }
    }
`

export default GET_ROLE
