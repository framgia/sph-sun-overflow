import { gql } from '@apollo/client'
export const QTagsTeamSidebar = gql`
    query TagsTeamSidebar {
        me {
            id
            watchedTags {
                id
                name
                description
            }
            teams {
                team {
                    id
                    name
                    members {
                        user {
                            avatar
                        }
                    }
                    slug
                }
            }
        }
    }
`

export const QMembersSidebar = gql`
    query MembersSidebar($slug: String!) {
        team(slug: $slug) {
            members {
                teamRole {
                    id
                    name
                }
                user {
                    id
                    first_name
                    last_name
                    reputation
                    avatar
                    slug
                }
            }
            is_team_leader
        }
    }
`

export const QTagsSidebar = gql`
    query TagsSidebar {
        me {
            id
            watchedTags {
                id
                name
                description
                slug
            }
        }
    }
`

export const GET_TAG_SUGGESTIONS = gql`
    query GetTagSuggestions($queryString: String!) {
        tagSuggest(name: $queryString) {
            id
            name
            description
            slug
        }
    }
`
