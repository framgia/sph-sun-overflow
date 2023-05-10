import { gql } from '@apollo/client'

const DELETE_QUESTION = gql`
    mutation DeleteQuestion($id: ID!) {
        deleteQuestion(id: $id) {
            id
        }
    }
`
export default DELETE_QUESTION
