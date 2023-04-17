import { gql } from '@apollo/client'

const GET_ROLES_PAGINATE = gql`
    query RolesPaginate($first: Int!, $page: Int!) {
        rolesPaginate(first: $first, page: $page) {
            data {
                id
                name
                slug
                truncated_name
                description
                permissions {
                    category
                    id
                    name
                }
            }
            paginatorInfo {
                perPage
                currentPage
                lastPage
                hasMorePages
                total
                count
            }
        }
    }
`

export default GET_ROLES_PAGINATE
