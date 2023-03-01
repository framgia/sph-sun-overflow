import { gql } from '@apollo/client'

const GET_TEAMS = gql`
    query Teams($first: Int!, $page: Int!, $name: String) {
        teams(first: $first, page: $page, name: $name) {
            paginatorInfo {
                perPage
                currentPage
                lastPage
                hasMorePages
                total
            }
            data {
                id
                name
                description
                dashboard_content
                created_at
                updated_at
                teamLeader {
                    id
                    first_name
                    last_name
                    email
                    avatar
                    slug
                }
                members {
                    id
                    user {
                        id
                        first_name
                        last_name
                        email
                        avatar
                        slug
                    }
                    teamRole {
                        id
                        name
                        description
                    }
                }
                slug
                members_count
            }
        }
    }
`

export default GET_TEAMS
