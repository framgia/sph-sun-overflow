import { gql } from '@apollo/client'

const UPDATE_TEAM = gql`
    mutation UpdateTeam($id: ID!, $name: String!, $description: String!, $user_id: ID!) {
        updateTeam(id: $id, name: $name, description: $description, user_id: $user_id) {
            id
            slug
        }
    }
`
export default UPDATE_TEAM
