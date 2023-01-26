import "./BooksDisplay.css";
// React
import { useState } from "react";
// Routing
import { Link } from "react-router-dom";
// Components
import Pagination from "../pagination/Pagination";

export default function BooksDisplay({ books, ownership, mode, handleDelete , addBook }) {
  // Pagination
  const [pageContent, setPageContent] = useState([]);

  if(books) {
    return (
      <ul id="booksDisplay">
        <div id="booksDisplay-pagination-wrapper">
          <Pagination
            items={ books }
            itemsPerPage={ 10 }
            setPageContent={ setPageContent }/>
        </div>

        {pageContent.map((book, idx) => (
          <li key={ idx }>
            <div>{ book.title }</div>
            <div>Description: { book.description }</div>
            <div>Owner: { book.ownerUsername }</div>
            <div>Date added: { book.createdAt }</div>
            <div>
              {(mode === "display") &&
                <Link to={`/users/${book.ownerId}`}>View Owner Profile</Link>
              }
              {(mode === "profile") && (ownership === true) && 
                <button onClick={() => handleDelete(book._id)}>Delete</button>
              }
              {(mode === "request" || mode === "offer") &&
                <button onClick={() => addBook(book._id, book.title)}>
                  {mode === "request" ? "Request" : "Offer"}
                </button>
              }
            </div>
          </li>
        ))}
      </ul>
    );
  }
};