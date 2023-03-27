import { gql } from '@apollo/client'

const GET_ROLES_SELECTION = gql`
    query Roles {
        roles {
            id
            name
        }
    }
`

export default GET_ROLES_SELECTION
