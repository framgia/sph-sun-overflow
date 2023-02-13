import { gql } from '@apollo/client'

const TOGGLE_BOOKMARK = gql`
    mutation ToggleBookmark($bookmarkable_id: ID!, $bookmarkable_type: String!) {
        toggleBookmark(bookmarkable_id: $bookmarkable_id, bookmarkable_type: $bookmarkable_type)
    }
`
export default TOGGLE_BOOKMARK
