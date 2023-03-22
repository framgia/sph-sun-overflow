import { gql } from '@apollo/client'

const CREATE_TAG = gql`
    mutation CreateTag($name: String!, $description: String!) {
        createTag(name: $name, description: $description) {
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
export default CREATE_TAG
