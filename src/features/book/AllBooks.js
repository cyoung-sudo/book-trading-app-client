import "./AllBooks.css";
// React
import { useState, useEffect } from "react";
// APIs
import * as bookAPI from "../../apis/bookAPI";
// Components
import BooksDisplay from "../../components/display/BooksDisplay";

export default function AllBooks() {
  // Requested data
  const [books, setBooks] = useState(null);

  //----- Retrieve all books on load
  useEffect(() => {
    bookAPI.getAll()
    .then(res => {
      if(res.data.success) {
        setBooks(res.data.books);
      }
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <div id="allBooks">
      <div id="allBooks-header">
        <h1>All Books</h1>
      </div>

      <div id="allBooks-booksDisplay-wrapper">
        <BooksDisplay 
          books={ books }
          mode="display"/>
      </div>
    </div>
  );
};