import { gql } from '@apollo/client'

const GET_USERS = gql`
    query Users($first: Int!, $page: Int!, $filter: userFilter, $sort: userSort) {
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
                avatar
                reputation
                slug
                role {
                    name
                }
            }
        }
    }
`

export default GET_USERS
