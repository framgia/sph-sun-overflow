import { gql } from '@apollo/client'

const SOCIAL_LOGIN = gql`
    mutation SocialLogin($token: String!, $email: String!) {
        socialLogin(input: { provider: "google", token: $token, email: $email }) {
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

export default SOCIAL_LOGIN
