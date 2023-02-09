import { gql } from '@apollo/client'

export const ADD_WATCHED_TAG = gql`
    mutation AddWatchedTag($tagId: ID!) {
        addWatchedTag(tag_id: $tagId)
    }
`

export const REMOVE_WATCHED_TAG = gql`
    mutation RemoveWatchedTag($tagId: ID!) {
        removeWatchedTag(tag_id: $tagId)
    }
`
