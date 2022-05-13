import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
  mutation addBook($title: String, $author: String) {
    addBook(title: $title, author: $author) {
      id
      title
      author
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($id: ID) {
    deleteBook(id: $id)
  }
`;

export const UPDATE_BOOK = gql`
  mutation updateBook($id: ID, $title: String, $author: String) {
    updateBook(id: $id, title: $title, author: $author) {
      id
      title
      author
    }
  }
`;
