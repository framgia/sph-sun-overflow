import { gql } from '@apollo/client'

const GET_QUESTION_SKELETON = gql`
    query getQuestion($slug: String!) {
        question(slug: $slug, shouldAddViewCount: false) {
            id
            title
            content
            slug
            is_from_user
            tags {
                id
                name
                description
            }
        }
    }
`

export default GET_QUESTION_SKELETON
