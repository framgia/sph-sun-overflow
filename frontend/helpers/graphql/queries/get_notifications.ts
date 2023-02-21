import { gql } from '@apollo/client'

const GET_NOTIFICATIONS = gql`
    query getNotifications($user_id: ID!) {
        userNotifications(user_id: $user_id, orderBy: [{ column: CREATED_AT, order: DESC }]) {
            id
            is_read
            humanized_created_at
            notifiable {
                __typename
                ... on UserRelation {
                    id
                    following {
                        id
                        first_name
                        last_name
                        avatar
                    }
                    follower {
                        id
                        first_name
                        last_name
                        avatar
                        slug
                    }
                }
                ... on Answer {
                    id
                    content
                    is_correct
                    user {
                        id
                        first_name
                        last_name
                        avatar
                    }
                    question {
                        id
                        slug
                        title
                        user {
                            id
                            first_name
                            last_name
                            avatar
                        }
                    }
                }
                ... on Comment {
                    id
                    user {
                        id
                        first_name
                        last_name
                        avatar
                    }
                    commentable {
                        __typename
                        ... on Answer {
                            id
                            content
                            question {
                                id
                                slug
                            }
                        }
                        ... on Question {
                            id
                            title
                            slug
                        }
                    }
                }
                ... on Vote {
                    id
                    user {
                        id
                        first_name
                        last_name
                        avatar
                    }
                    voteable {
                        __typename
                        ... on Answer {
                            id
                            content
                            question {
                                id
                                slug
                            }
                        }
                        ... on Question {
                            id
                            title
                            slug
                        }
                    }
                }
            }
        }
    }
`

export default GET_NOTIFICATIONS
