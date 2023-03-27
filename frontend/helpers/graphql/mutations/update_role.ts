import { gql } from '@apollo/client'

const UPDATE_ROLE = gql`
    mutation UpdateRole($id: ID!, $name: String!, $description: String!, $permissions: [ID!]!) {
        updateRole(id: $id, name: $name, description: $description, permissions: $permissions) {
            id
            name
            description
            truncated_name
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
export default UPDATE_ROLE
