import { gql } from '@apollo/client'

const GET_TAGS = gql`
    query Tags($first: Int!, $page: Int!, $name: String, $sort: [tagSort]) {
        tags(first: $first, page: $page, name: $name, sort: $sort) {
            paginatorInfo {
                lastPage
                currentPage
                hasMorePages
                total
            }
            data {
                id
                slug
                name
                description
                is_watched_by_user
                count_tagged_questions
                count_watching_users
            }
        }
    }
`

export default GET_TAGS
