import { gql } from '@apollo/client'

const UPDATE_TEAM_DASHBOARD = gql`
    mutation UpdateTeamDashboard($id: ID!, $dashboard_content: String!) {
        updateTeamDashboard(id: $id, dashboard_content: $dashboard_content) {
            id
            dashboard_content
        }
    }
`

export default UPDATE_TEAM_DASHBOARD
