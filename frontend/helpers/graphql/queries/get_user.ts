import { gql } from '@apollo/client'

const GET_USER = gql`
    query getUser($slug: String!) {
        user(slug: $slug) {
            id
            first_name
            last_name
            email
            avatar
            role {
                name
            }
            answer_count
            reputation
            question_count
            about_me
            slug
            is_following
            follower_count
            following_count
            watchedTags {
                id
                name
                description
                slug
            }
            top_questions {
                id
                slug
                title
                content
                upvote_percentage
                humanized_created_at
                is_answered
                tags {
                    id
                    name
                    slug
                    description
                    is_watched_by_user
                }
                updated_at
            }
            top_answers {
                id
                content
                humanized_created_at
                is_correct
                upvote_percentage
                question {
                    slug
                }
                updated_at
            }
            teams {
                id
                team {
                    id
                    name
                }
            }
            updated_at

            bookmarked_questions {
                bookmarkable {
                    __typename
                    ... on Question {
                        id
                        title
                        content
                        slug
                        updated_at
                        upvote_percentage
                    }
                }
            }
            bookmarked_answers {
                bookmarkable {
                    __typename
                    ... on Answer {
                        id
                        content
                        question {
                            title
                            slug
                        }
                        updated_at
                        upvote_percentage
                    }
                }
            }
            followers {
                follower {
                    id
                    avatar
                    first_name
                    last_name
                    slug
                    is_following
                    role {
                        name
                    }
                }
            }
            following {
                following {
                    id
                    avatar
                    first_name
                    last_name
                    slug
                    is_following
                    role {
                        name
                    }
                }
            }
        }
    }
`

export default GET_USER
