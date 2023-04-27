import { gql } from '@apollo/client'

const GET_TEAM = gql`
    query getTeam($slug: String!) {
        team(slug: $slug) {
            id
            name
            description
            dashboard_content
            members_count
            questions_asked
            questions_answered
            truncated_name
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
                    avatar
                }
                teamRole {
                    name
                }
            }
        }
    }
`

export default GET_TEAM
