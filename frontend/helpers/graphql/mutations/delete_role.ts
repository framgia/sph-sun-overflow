import { gql } from '@apollo/client'

const DELETE_ROLE = gql`
    mutation DeleteRole($id: ID!) {
        deleteRole(id: $id) {
            id
            name
            slug
        }
    }
`
export default DELETE_ROLE
