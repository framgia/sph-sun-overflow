import { gql } from '@apollo/client'

const GET_ROLES_PAGINATE = gql`
    query RolesPaginate($first: Int!, $page: Int!) {
        rolesPaginate(first: $first, page: $page) {
            data {
                id
                name
                permissions {
                    id
                    name
                }
                users {
                    id
                    first_name
                    last_name
                    avatar
                }
            }
            paginatorInfo {
                perPage
                currentPage
                lastPage
                hasMorePages
                total
            }
        }
    }
`

export default GET_ROLES_PAGINATE
