import { gql } from '@apollo/client'

const CREATE_ROLE = gql`
    mutation CreateRole($name: String!, $description: String!, $permissions: [ID!]!) {
        createRole(name: $name, description: $description, permissions: $permissions) {
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
export default CREATE_ROLE
