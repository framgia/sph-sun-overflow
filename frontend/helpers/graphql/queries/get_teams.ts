import { gql } from '@apollo/client'

const GET_TEAMS = gql`
    query Teams($first: Int!, $page: Int!, $name: String, $isAdmin: Boolean, $user_slug: String) {
        getUserTeams(
            first: $first
            page: $page
            name: $name
            isAdmin: $isAdmin
            user_slug: $user_slug
        ) {
            paginatorInfo {
                perPage
                currentPage
                lastPage
                hasMorePages
                total
                count
            }
            data {
                id
                name
                description
                dashboard_content
                created_at
                updated_at
                truncated_name
                truncated_description
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
