import { gql } from '@apollo/client'

const GET_QUESTIONS = gql`
    query Questions(
        $first: Int!
        $page: Int!
        $filter: filter
        $orderBy: [QueryQuestionsOrderByOrderByClause!]
    ) {
        questions(first: $first, page: $page, filter: $filter, orderBy: $orderBy) {
            paginatorInfo {
                perPage
                currentPage
                lastPage
                hasMorePages
                total
            }
            data {
                id
                title
                content
                created_at
                slug
                vote_count
                upvote_percentage
                views_count
                humanized_created_at
                is_from_user
                is_answered
                is_public
                team {
                    id
                    name
                    slug
                }
                tags {
                    id
                    name
                    is_watched_by_user
                    slug
                    description
                    count_tagged_questions
                    count_watching_users
                }
                user {
                    id
                    slug
                    first_name
                    last_name
                    avatar
                }
                answers {
                    id
                }
            }
        }
    }
`

export default GET_QUESTIONS
