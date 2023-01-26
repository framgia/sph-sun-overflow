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
