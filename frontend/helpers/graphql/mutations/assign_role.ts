import { gql } from '@apollo/client'

const ASSIGN_ROLE = gql`
    mutation AssignRole($userId: ID!, $roleId: ID!) {
        assignRole(user_id: $userId, role_id: $roleId) {
            id
            role {
                id
                name
            }
        }
    }
`
export default ASSIGN_ROLE
