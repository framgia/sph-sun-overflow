import { gql } from '@apollo/client'

const GET_ROLES = gql`
    query Roles {
        roles {
            id
            name
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

export default GET_ROLES
