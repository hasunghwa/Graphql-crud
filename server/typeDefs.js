import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Book {
    id: ID
    title: String
    author: String
  }
  type Query {
    getBooks: [Book]
    getBook(id: ID): Book
  }
  type Mutation {
    addBook(title: String, author: String): Book
    deleteBook(id: ID): String
    updateBook(id: ID, title: String, author: String): Book
  }
`;

export default typeDefs;