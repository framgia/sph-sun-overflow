import { gql } from '@apollo/client'

const DELETE_MEMBER = gql`
    mutation DeleteMember($id: ID!) {
        deleteMember(id: $id) {
            id
        }
    }
`
export default DELETE_MEMBER
