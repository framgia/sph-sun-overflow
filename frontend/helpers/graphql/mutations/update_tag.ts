import { gql } from '@apollo/client'

const UPDATE_TAG = gql`
    mutation UpdateTag($id: ID!, $name: String!, $description: String!) {
        updateTag(id: $id, name: $name, description: $description) {
            id
            name
            slug
            is_watched_by_user
            description
            created_at
            updated_at
            usersWatching {
                id
                first_name
                last_name
            }
            count_tagged_questions
            count_watching_users
        }
    }
`
export default UPDATE_TAG
