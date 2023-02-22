import { gql } from '@apollo/client'

const UPDATE_QUESTION = gql`
    mutation UpdateQuestion(
        $id: ID!
        $title: String!
        $content: String!
        $is_public: Boolean
        $tags: [ID!]!
        $team_id: ID
    ) {
        updateQuestion(
            id: $id
            title: $title
            content: $content
            is_public: $is_public
            tags: $tags
            team_id: $team_id
        ) {
            id
            content
            slug
        }
    }
`
export default UPDATE_QUESTION
