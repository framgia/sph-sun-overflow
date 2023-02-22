import { gql } from '@apollo/client'

const UPDATE_ANSWER = gql`
    mutation UpdateAnswer($id: ID!, $content: String!) {
        updateAnswer(id: $id, content: $content) {
            content
            created_at
            updated_at
        }
    }
`
export default UPDATE_ANSWER
