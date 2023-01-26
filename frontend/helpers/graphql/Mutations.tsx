import { gql } from "@apollo/client";

export const SOCIAL_LOGIN = gql`
    mutation SocialLogin($token: String!){
        socialLogin(input: {
            provider: "google",
            token: $token,
        }) {
            access_token
            refresh_token
            expires_in
            token_type
            user {
                id
                email
                first_name
                last_name
                created_at
                updated_at
            }
        }
    } 
`
