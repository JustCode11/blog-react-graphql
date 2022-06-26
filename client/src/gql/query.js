import { gql } from "@apollo/client";

const ME = gql`
    query Me {
        me {
            user {
                id
                username
                email
            }
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
                id
                title
                content
                user {
                    id
                    username
                }
                tags {
                    id
                    description
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
                createdAt
            }
            cursor
            hasNextPage
        }
    }
`;

const GET_BLOGENTRY = gql`
    query entry($id: ID!) {
        entry(id: $id) {
            id
            title
            content
            tags {
                id
                description
            }
            createdAt
        }
    }
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
    IS_LOGGED_IN,
    GET_ALL_BLOGENTRIES,
    GET_ALL_TAGS,
    GET_BLOGENTRY
}