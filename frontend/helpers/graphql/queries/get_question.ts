import { gql } from '@apollo/client'

const GET_QUESTION = gql`
    query getQuestion($slug: String!) {
        question(slug: $slug) {
            id
            title
            content
            created_at
            slug
            vote_count
            views_count
            humanized_created_at
            is_from_user
            tags {
                id
                name
                is_watched_by_user
            }
            user {
                id
                first_name
                last_name
                avatar
            }
        }
    }
`

export default GET_QUESTION
