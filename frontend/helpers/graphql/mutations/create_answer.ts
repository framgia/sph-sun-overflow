import { gql } from '@apollo/client'

const CREATE_ANSWER = gql`
    mutation CreateAnswer($content: String!, $user_id: ID!, $question_id: ID!) {
        createAnswer(content: $content, user_id: $user_id, question_id: $question_id) {
            id
            content
            is_correct
            created_at
            updated_at
            user {
                id
                first_name
                last_name
                avatar
            }
            question {
                id
                title
                content
            }
        }
    }
`
export default CREATE_ANSWER
