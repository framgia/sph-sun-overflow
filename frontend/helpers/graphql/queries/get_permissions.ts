import { gql } from '@apollo/client'

const GET_PERMISSIONS = gql`
    query Permissions {
        permissions {
            id
            name
            slug
            description
            created_at
            updated_at
        }
    }
`

export default GET_PERMISSIONS
