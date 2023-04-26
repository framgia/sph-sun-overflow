import { gql } from '@apollo/client'

const UPDATE_USER = gql`
    mutation UpdateUser($firstName: String, $lastName: String, $aboutMe: String, $avatar: String) {
        updateUser(
            first_name: $firstName
            last_name: $lastName
            about_me: $aboutMe
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
