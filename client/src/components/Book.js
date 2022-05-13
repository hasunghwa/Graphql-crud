import React, { useContext } from 'react';
import { useMutation } from "@apollo/client";
import { DELETE_BOOK } from '../graphql/Mutation';
import { GET_BOOKS } from '../graphql/Query';
import { BookContext } from '../BookContext';

const Book = ({id, title, author}) => {
  const { selectedId, setSelectedId } = useContext(BookContext);
  const [deleteBook] = useMutation(DELETE_BOOK);
  const removeBook = (e, id) => {
    e.stopPropagation();
    deleteBook({variables: {id: id}, refetchQueries: [{query: GET_BOOKS}]})
    setSelectedId(0);
  }

  return (
    <a
      href="#"
      className="list-group-item list-group-item-action"
      onClick={() => setSelectedId(id)}
    >
      <div data-testid="title" className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{title}</h5>
      </div>
      <p data-testid="author" className="mb-1">
        {author}
      </p>
      <button onClick={(e) => removeBook(e, id)}>🗑️</button>
    </a>
  );
};

export default Book;