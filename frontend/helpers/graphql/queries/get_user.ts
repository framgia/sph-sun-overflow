import { gql } from '@apollo/client'

const GET_USER = gql`
    query getUser($slug: String!) {
        user(slug: $slug) {
            id
            first_name
            last_name
            email
            avatar
            answer_count
            reputation
            question_count
            about_me
            slug
        }
    }
`

export default GET_USER
