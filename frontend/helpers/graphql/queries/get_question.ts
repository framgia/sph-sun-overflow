import { gql } from '@apollo/client'

const GET_QUESTION = gql`
    query getQuestion($slug: String!, $shouldAddViewCount: Boolean) {
        question(slug: $slug, shouldAddViewCount: $shouldAddViewCount) {
            id
            title
            content
            created_at
            slug
            vote_count
            views_count
            is_bookmarked
            humanized_created_at
            is_from_user
            is_answered
            user_vote
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
            comments {
                id
                content
                created_at
                updated_at
                user {
                    id
                    first_name
                    last_name
                    avatar
                }
            }
            answers {
                id
                content
                created_at
                vote_count
                humanized_created_at
                is_correct
                is_bookmarked
                is_created_by_user
                user_vote
                is_from_user
                user {
                    id
                    first_name
                    last_name
                    avatar
                }
                comments {
                    id
                    content
                    created_at
                    updated_at
                    user {
                        id
                        first_name
                        last_name
                    }
                }
            }
        }
    }
`

export default GET_QUESTION
