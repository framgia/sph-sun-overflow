import { gql } from '@apollo/client'

const DELETE_COMMENT = gql`
    mutation DeleteComment($id: ID!) {
        deleteComment(id: $id) {
            id
        }
    }
`
export default DELETE_COMMENT
