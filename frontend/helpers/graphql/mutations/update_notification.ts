import { gql } from '@apollo/client'

const UPDATE_NOTIFICATION = gql`
    mutation UpdateUserNotification($id: ID!, $is_read: Boolean!) {
        updateUserNotification(id: $id, is_read: $is_read) {
            id
            is_read
            humanized_created_at
            updated_at
        }
    }
`
export default UPDATE_NOTIFICATION
