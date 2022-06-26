import { gql } from "@apollo/client";

const SIGNUP = gql`
    mutation SignUp($input: SignUpInput!) {
        signup(input: $input) 
    }
`;

const LOGIN = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) 
    }
`;

const LOGOUT = gql`
    mutation Logout($email: String!) {
        logout(email: $email)
    }
`;

const ADD_ENTRY = gql`
    mutation AddEntry($input: EntryInput!) {
        addEntry(input: $input) {
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
                createdAt
        }
    }
`;

const DELETE_ENTRY = gql`
    mutation DeleteEntry($id: ID!) {
        deleteEntry(id: $id) {
            id
            title
            createdAt
        }
    }
`;

const EDIT_ENTRY = gql`
    mutation EditEntry($id: ID!, $input: EntryInput!) {
        editEntry(id: $id, input: $input) {
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
            createdAt
        }
    }
`;

const ADD_COMMENT = gql`
    mutation AddComment($input: CommentInput!) {
        addComment(input: $input) {
            id
            content
            user {
                id
                username
            }
            createdAt
        }
    }
`;

const DELETE_COMMENT = gql`
    mutation DeleteComment($id: ID!) {
        deleteComment(id: $id) {
            id
            content
            user {
                id
                username
            }
            createdAt
        }
    }
`;

export {
    SIGNUP,
    LOGIN,
    LOGOUT,
    ADD_ENTRY,
    DELETE_ENTRY,
    EDIT_ENTRY,
    ADD_COMMENT,
    DELETE_COMMENT
};