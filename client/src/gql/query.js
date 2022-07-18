import { gql } from "@apollo/client";

const USER_FRAGMENT = gql`
    fragment UserInfo on User {
        user {
            id
            username
            email
        }
    }
`;

const ENTRY_TAGS_FRAGMENT = gql`
    fragment EntryTagsInfo on Entry {
        id
        title
        content
        tags {
            id
            description
        }
        createdAt
    }
`;

const ME = gql`
    query Me {
        me {
            ...UserInfo
        }
    }
    ${USER_FRAGMENT}
`;

const PROFILE = gql`
    query Profile {
        me {
            ...UserInfo
            entryList {
                id
                title
                createdAt
            }
            commentList {
                id
                content
                createdAt
            }
        }
    }
    ${USER_FRAGMENT}
`;

const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

const GET_ALL_BLOGENTRIES = gql`
    query entries($cursor: String, $search: String, $tag: String) {
        entries(cursor: $cursor, search: $search, tag: $tag) {
            entries {
                ...EntryTagsInfo
                user {
                    id
                    username
                }
                comments {
                    id
                    content
                    user {
                        id
                        username
                    }
                    createdAt
                }
            }
            cursor
            hasNextPage
        }
    }
    ${ENTRY_TAGS_FRAGMENT}
`;

const GET_BLOGENTRY = gql`
    query entry($id: ID!) {
        entry(id: $id) {
            ...EntryTagsInfo
        }
    }
    ${ENTRY_TAGS_FRAGMENT}
`;

const GET_ALL_TAGS = gql`
    query tags {
        tags {
            id
            description
        }
    }
`;

export {
    ME,
    PROFILE,
    IS_LOGGED_IN,
    GET_ALL_BLOGENTRIES,
    GET_ALL_TAGS,
    GET_BLOGENTRY
}