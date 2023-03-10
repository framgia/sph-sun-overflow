import { gql } from '@apollo/client'

const UPDATE_MEMBER = gql`
    mutation UpdateMember($id: ID!, $user_id: ID!, $team_role_id: ID!, $team_id: ID!) {
        updateMember(id: $id, user_id: $user_id, team_role_id: $team_role_id, team_id: $team_id) {
            id
        }
    }
`
export default UPDATE_MEMBER
