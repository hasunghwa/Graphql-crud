import "./App.css";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "./graphql/Query";
import { BookContext } from "./BookContext";
import AddBook from "./components/AddBook";
import Book from "./components/Book";

function App() {
  const [ selectedId, setSelectedId ] = useState(0);
  const { loading, error, data } = useQuery(GET_BOOKS);
  if (loading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;
  //if (data) console.log(data.getBooks);
  return (
    <BookContext.Provider value={{ selectedId, setSelectedId }}>
      <div className="container Bookbox">
        <AddBook />
        <br />
        {data?.getBooks.map((book) => {
          return (
            <Book
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
            ></Book>
          );
        })}
      </div>
    </BookContext.Provider>
  );
}

export default App;
