const { gql } = require("apollo-server-express");

module.exports = gql`
    scalar DateTime

    type Query {
        entries(cursor: String, search: String, tag: String): EntriesPayload
        entry(id: ID!): Entry
        me: Me
        tags: [Tag!]
    }

    type Mutation {
        login(input: LoginInput!): Boolean!
        signup(input: SignUpInput!): Boolean!
        logout(email: String!): Boolean!
        addEntry(input: EntryInput!): Entry!
        deleteEntry(id: ID!): Entry
        editEntry(id: ID!, input: EntryInput!): Entry!
        addComment(input: CommentInput!): Comment!
        deleteComment(id: ID!): Comment
    }

    type Entry {
        id: ID!
        title: String!
        content: String!
        tags: [Tag!]!
        user: User!
        comments: [Comment]
        createdAt: DateTime
        updatedAt: DateTime
    }

    type User {
        id: ID!
        username: String!
        firstname: String
        lastname: String
        email: String!
        password: String!
    }

    type Comment {
        id: ID!
        content: String!
        user: User!
        createdAt: DateTime
        updatedAt: DateTime
    }

    type Tag {
        id: ID!
        description: String!,
        entries: [Entry!]!
    }

    type Me {
        user: User!
        entryList: [Entry!]!
        commentList: [Comment!]!
    }

    input LoginInput {
        email: String
        password: String
    }

    input SignUpInput {
        username: String!
        firstname: String
        lastname: String
        email: String!
        password: String!
    }

    input EntryInput {
        title: String!
        content: String!
        tags: [ID]!
    }

    input CommentInput {
        entryId: ID!
        content: String!
    }

    type UserPayload {
        user: User
        token: String
    }

    type EntriesPayload {
        entries: [Entry!]
        cursor: String!
        hasNextPage: Boolean!
    }
`;