import { gql } from '@apollo/client'

const UPDATE_USER = gql`
    mutation UpdateUser(
        $first_name: String
        $last_name: String
        $about_me: String
        $avatar: String
    ) {
        updateUser(
            first_name: $first_name
            last_name: $last_name
            about_me: $about_me
            avatar: $avatar
        ) {
            first_name
            last_name
            about_me
            avatar
            updated_at
        }
    }
`
export default UPDATE_USER
