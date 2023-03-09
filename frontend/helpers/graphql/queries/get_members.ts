import { gql } from '@apollo/client'

const GET_MEMBERS = gql`
    query TeamMembers($teamSlug: String!, $first: Int!, $page: Int!) {
        teamMembers(team_slug: $teamSlug, first: $first, page: $page) {
            paginatorInfo {
                total
                currentPage
                hasMorePages
                perPage
                lastPage
            }
            data {
                id
                team {
                    id
                    name
                }
                teamRole {
                    id
                    name
                }
                user {
                    id
                    first_name
                    last_name
                }
            }
        }
    }
`

export default GET_MEMBERS
