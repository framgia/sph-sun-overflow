import { gql } from '@apollo/client'

const DELETE_TEAM = gql`
    mutation DeleteTeam($id: ID!) {
        deleteTeam(id: $id) {
            id
            name
            slug
        }
    }
`
export default DELETE_TEAM
