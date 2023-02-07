import { gql } from '@apollo/client'

const CREATE_QUESTION = gql`
    mutation CreateQuestion(
        $title: String!
        $content: String!
        $is_public: Boolean
        $tags: [ID!]!
        $team_id: ID
    ) {
        createQuestion(
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
export default CREATE_QUESTION
