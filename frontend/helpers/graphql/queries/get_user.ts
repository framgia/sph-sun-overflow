import { gql } from '@apollo/client'

const GET_USER = gql`
    query getUser($ID: ID!) {
        user(id: $ID) {
            id
            first_name
            last_name
            email
            avatar
            answer_count
            reputation
            question_count
            about_me
        }
    }
`

export default GET_USER
