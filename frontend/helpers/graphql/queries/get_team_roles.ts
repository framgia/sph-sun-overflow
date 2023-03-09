import { gql } from '@apollo/client'

const GET_TEAM_ROLES = gql`
    query TeamRoles {
        teamRoles {
            id
            name
        }
    }
`

export default GET_TEAM_ROLES
