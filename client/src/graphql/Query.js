import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  {
    getBooks {
      id
      title
      author
    }
  }
`;

export const GET_BOOK = gql`
  query getBook($id: ID) {
    getBook(id: $id) {
      id
      title
      author
    }
  }
`;
