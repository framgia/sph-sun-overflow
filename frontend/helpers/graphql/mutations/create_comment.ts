import { gql } from '@apollo/client'

const CREATE_COMMENT = gql`
    mutation CreateComment($content: String!, $commentable_id: ID!, $commentable_type: String!) {
        createComment(
            content: $content
            commentable_id: $commentable_id
            commentable_type: $commentable_type
        ) {
            content
            created_at
            updated_at
        }
    }
`
export default CREATE_COMMENT
