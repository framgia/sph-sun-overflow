import { gql } from '@apollo/client'

const NOTIFICATION_SUBSCRIPTION = gql`
    subscription LatestAnswer {
        latestAnswer {
            id
            content
        }
    }
`

export default NOTIFICATION_SUBSCRIPTION
