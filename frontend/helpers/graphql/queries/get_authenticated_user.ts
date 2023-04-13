import { gql } from '@apollo/client'

const GET_AUTHENTICATED_USER = gql`
    query getAuthenticatedUser {
        me {
            id
            first_name
            last_name
            email
            avatar
            slug
            teams {
                id
                team {
                    id
                    name
                }
            }
            watchedTags {
                id
                name
                description
                slug
            }
            updated_at
            role {
                name
                permissions {
                    name
                    category
                }
            }
        }
    }
`

export default GET_AUTHENTICATED_USER
