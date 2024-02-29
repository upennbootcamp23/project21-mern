let {gql} = require("apollo-server-express");

let typeDefs = gql`
    type User {
        _id: ID
        username: String
        bookCount: Int
        email: String
        savedBooks: [Book]
    }
    type Book {
        bookID: String
        description: String
        authors: [String]
        title: String
        link: String
        image: String
    }
    input bookInput {
        bookID: String
        description: String
        authors: [String]
        title: String
        link: String
        image: String
    }
    type Query {
        me: User
    }
    type Auth{
        user: User
        token: ID
    }
    type Mutation{
        saveBook(input: bookInput): User
        removeBook(BookID: String!): User
        addUser(Username: String!, email: String!, password: String!,): Auth
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;