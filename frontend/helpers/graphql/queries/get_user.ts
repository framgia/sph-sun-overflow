import { gql } from '@apollo/client'

const GET_USER = gql`
    query getUser($slug: String!) {
        user(slug: $slug) {
            id
            first_name
            last_name
            email
            avatar
            answer_count
            reputation
            question_count
            about_me
            slug
            is_following
            follower_count
            following_count
            top_questions {
                id
                slug
                title
                content
                humanized_created_at
                vote_count
                is_answered
            }
            top_answers {
                id
                content
                humanized_created_at
                vote_count
                is_correct
                question {
                    slug
                }
            }
        }
    }
`

export default GET_USER
