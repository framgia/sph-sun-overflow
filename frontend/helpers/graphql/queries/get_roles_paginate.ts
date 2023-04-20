import { gql } from '@apollo/client'

const GET_ROLES_PAGINATE = gql`
    query RolesPaginate($first: Int!, $page: Int!) {
        rolesPaginate(first: $first, page: $page, orderBy: [{ column: UPDATED_AT, order: DESC }]) {
            data {
                id
                name
                slug
                truncated_name
                truncated_description
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
