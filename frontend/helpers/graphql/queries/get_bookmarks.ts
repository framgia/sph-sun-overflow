import { gql } from '@apollo/client'

const GET_BOOKMARKS = gql`
    query Bookmarks(
        $user_id: ID!
        $first: Int!
        $page: Int!
        $filter: String
        $orderBy: [QueryBookmarksOrderByOrderByClause!]
    ) {
        bookmarks(
            user_id: $user_id
            first: $first
            page: $page
            filter: $filter
            orderBy: $orderBy
        ) {
            paginatorInfo {
                perPage
                currentPage
                lastPage
                hasMorePages
                total
            }
            data {
                id
                bookmarkable {
                    __typename
                    ... on Question {
                        id
                        title
                        slug
                        content
                        created_at
                        humanized_created_at
                        vote_count
                        views_count
                        answers {
                            id
                            content
                        }
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

                    ... on Answer {
                        __typename
                        id
                        content
                        created_at
                        vote_count
                        user {
                            id
                            first_name
                            last_name
                            avatar
                        }
                        question {
                            id
                            title
                            slug
                            content
                            created_at
                            humanized_created_at
                            vote_count
                            answers {
                                id
                                content
                            }
                            views_count
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
                }
                user {
                    id
                    first_name
                    last_name
                    avatar
                }
            }
        }
    }
`

export default GET_BOOKMARKS
