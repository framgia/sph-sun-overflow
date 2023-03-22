import { gql } from '@apollo/client'

const GET_TAG = gql`
    query getTag($slug: String!) {
        tag(slug: $slug) {
            id
            slug
            name
            description
            is_watched_by_user
            count_tagged_questions
            count_watching_users
        }
    }
`

export default GET_TAG
