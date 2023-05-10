import { gql } from '@apollo/client'

const ADMIN_LOGIN = gql`
    mutation AdminLogin($email: String!, $password: String!) {
        adminLogin(email: $email, password: $password)
    }
`

export default ADMIN_LOGIN
