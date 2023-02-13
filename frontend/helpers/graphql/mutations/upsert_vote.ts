import { gql } from '@apollo/client'

const UPSERT_VOTE = gql`
    mutation UpsertVote($value: Int!, $voteable_id: ID!, $voteable_type: String!) {
        upsertVote(value: $value, voteable_id: $voteable_id, voteable_type: $voteable_type)
    }
`

export default UPSERT_VOTE
