import { gql } from '@apollo/client'
export const LOAD_SIDEBAR_1 = gql`
    query LoadSidebar1 {
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
                }
            }
        }
    }
`

export const LOAD_SIDEBAR_2 = gql`
    query LoadSidebar2($teamId: ID!) {
        team(id: $teamId) {
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
        }
    }
`

export const LOAD_SIDEBAR_3 = gql`
    query LoadSidebar1 {
        me {
            id
            watchedTags {
                id
                name
                description
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
        }
    }
`
