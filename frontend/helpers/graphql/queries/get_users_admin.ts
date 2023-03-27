import { gql } from '@apollo/client'

const GET_USERS_ADMIN = gql`
    query UsersAdmin($first: Int!, $page: Int!, $filter: userFilter, $sort: userSort) {
        users(first: $first, page: $page, filter: $filter, sort: $sort) {
            paginatorInfo {
                perPage
                currentPage
                lastPage
                hasMorePages
                total
            }
            data {
                id
                first_name
                last_name
                question_count
                answer_count
                role {
                    name
                }
                slug
            }
        }
    }
`

export default GET_USERS_ADMIN
