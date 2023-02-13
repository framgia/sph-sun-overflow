import { gql } from '@apollo/client'

const ACCEPT_ANSWER = gql`
    mutation AcceptAnswer($answer_id: ID!, $question_id: ID!) {
        acceptAnswer(answer_id: $answer_id, question_id: $question_id)
    }
`
export default ACCEPT_ANSWER
