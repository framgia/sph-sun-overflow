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
                humanized_created_at
                vote_count
                is_answered
                tags {
                    id
                    name
                    slug
                }
            }
            top_answers {
                id
                content
                humanized_created_at
                vote_count
                is_correct
                question {
                    slug
                }
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
                        vote_count
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
                            slug
                        }
                        updated_at
                        vote_count
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
