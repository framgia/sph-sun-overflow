import { gql } from "@apollo/client";

export const GET_USERS =  gql`
    query GetUsers {
        users {
            id
            first_name
            last_name
        }
    }
`

export const GET_AUTHENTICATED_USER = gql`
 query getAuthenticatedUser {
    me {
        id
        first_name
        last_name
        email
        avatar
    }
 }
`
