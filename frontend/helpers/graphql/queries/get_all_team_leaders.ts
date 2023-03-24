import { gql } from '@apollo/client'

const GET_ALL_TEAM_LEADERS = gql`
    query TeamLeaders {
        teamLeaders {
            id
            first_name
            last_name
        }
    }
`

export default GET_ALL_TEAM_LEADERS
