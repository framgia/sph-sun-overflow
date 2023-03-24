import { gql } from '@apollo/client'

const CREATE_TEAM = gql`
    mutation CreateTeam($name: String!, $description: String!, $user_id: ID!) {
        createTeam(name: $name, description: $description, user_id: $user_id) {
            id
            slug
        }
    }
`
export default CREATE_TEAM
