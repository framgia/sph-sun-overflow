import { gql } from "@apollo/client";

const GET_QUESTION = gql`
 query getQuestion($id : ID!) {
    question(id : $id) {
        id
        title
        content
        created_at
        vote_count
        humanized_created_at
        tags {
            id
            name
            is_watched_by_user
        }
        user { 
            id
            first_name 
            last_name
            avatar
        }
    }
 }
`

export default GET_QUESTION;
