import { gql } from '@apollo/client'

const GET_ALL_USERS = gql`
    query AllUsers($filter: userFilter) {
        allUsers(filter: $filter) {
            id
            first_name
            last_name
        }
    }
`

export default GET_ALL_USERS
