import { gql } from '@apollo/client'

const DELETE_TAG = gql`
    mutation DeleteTag($id: ID!) {
        deleteTag(id: $id) {
            id
            name
            slug
        }
    }
`
export default DELETE_TAG
