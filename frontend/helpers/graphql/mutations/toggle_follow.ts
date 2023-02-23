import { gql } from '@apollo/client'

const TOGGLE_FOLLOW = gql`
    mutation ToggleFollow($userId: ID!) {
        toggleFollow(user_id: $userId)
    }
`

export default TOGGLE_FOLLOW
