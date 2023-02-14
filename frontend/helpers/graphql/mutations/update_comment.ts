import { gql } from '@apollo/client'

const UPDATE_COMMENT = gql`
    mutation UpdateComment($id: ID!, $content: String!) {
        updateComment(id: $id, content: $content) {
            content
            created_at
            updated_at
        }
    }
`
export default UPDATE_COMMENT
