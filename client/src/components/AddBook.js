import React, { useContext, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { ADD_BOOK, UPDATE_BOOK } from "../graphql/Mutation";
import { GET_BOOK, GET_BOOKS } from '../graphql/Query';
import { BookContext } from '../BookContext';

const AddBook = () => {
  const { selectedId, setSelectedId } = useContext(BookContext);
  const [addBook] = useMutation(ADD_BOOK);
  const [updateBook] = useMutation(UPDATE_BOOK);
  const inputAreaRef = useRef();
  const [book, setBook] = useState({
    title: "",
    author: "",
  });

  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { id: selectedId },
    onCompleted: (data) => setBook(data.getBook),
  });

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!inputAreaRef.current.contains(e.target)) {
        setSelectedId(0);
        setBook({ title: "", author: "" });
      } 
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  const createBook = (e) => {
    e.preventDefault();
    if (book.title === "") {
      alert("please enter a title");
      return;
    }

    if (selectedId === 0) {
      addBook({
        variables: {
          title: book.title,
          author: book.author,
        },
        refetchQueries: [{ query: GET_BOOKS }],
      });
    } else {
      updateBook({
        variables: {
          id: selectedId,
          title: book.title,
          author: book.author,
        },
        refetchQueries: [{ query: GET_BOOKS }],
      });
    }
  };

  return (
    <form onSubmit={createBook} ref={inputAreaRef}>
      <div className="mb-3">
        <label>Title</label>
        {/* <pre>{JSON.stringify(book, null, "\t")}</pre> */}
        <input
          type="text"
          className="form-control"
          placeholder="enter title"
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label>Author</label>
        <input
          type="text"
          className="form-control"
          placeholder="enter author"
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {selectedId === 0 ? "Add" : "Update"}
      </button>
    </form>
  );
};

export default AddBook;