import { gql } from '@apollo/client'

const ADD_MEMBER = gql`
    mutation AddMember($user_id: ID!, $team_role_id: ID!, $team_id: ID!) {
        addMember(user_id: $user_id, team_role_id: $team_role_id, team_id: $team_id) {
            id
        }
    }
`
export default ADD_MEMBER
