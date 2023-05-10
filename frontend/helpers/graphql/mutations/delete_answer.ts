import { gql } from '@apollo/client'

const DELETE_ANSWER = gql`
    mutation DeleteAnswer($id: ID!) {
        deleteAnswer(id: $id) {
            id
        }
    }
`
export default DELETE_ANSWER
