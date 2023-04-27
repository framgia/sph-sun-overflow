import { gql } from '@apollo/client'

const GET_ANSWERS = gql`
    query Answers(
        $first: Int!
        $page: Int!
        $filter: answerFilter
        $orderBy: [QueryAnswersOrderByOrderByClause!]
    ) {
        answers(first: $first, page: $page, filter: $filter, orderBy: $orderBy) {
            paginatorInfo {
                perPage
                currentPage
                lastPage
                hasMorePages
                total
            }
            data {
                id
                content
                upvote_percentage
                created_at
                updated_at
                user {
                    id
                    slug
                }
                question {
                    id
                    slug
                    title
                    content
                    vote_count
                    upvote_percentage
                    views_count
                    humanized_created_at
                    created_at
                    is_public
                    user {
                        id
                        slug
                        first_name
                        last_name
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
                    answers {
                        id
                    }
                }
            }
        }
    }
`

export default GET_ANSWERS
