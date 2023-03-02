import { gql } from '@apollo/client'

const GET_TEAM = gql`
    query getTeam($slug: String!) {
        team(slug: $slug) {
            id
            name
            description
            dashboard_content
            teamLeader {
                id
                slug
                first_name
                last_name
                reputation
                role {
                    name
                }
            }
            members {
                id
                user {
                    id
                    slug
                    first_name
                    last_name
                    reputation
                }
                teamRole {
                    name
                }
            }
        }
    }
`

export default GET_TEAM
