import "./BooksDisplay.css";
// React
import { useState } from "react";
// Routing
import { Link } from "react-router-dom";
// Components
import Pagination from "../pagination/Pagination";
import SearchBar from "../form/SearchBar";

export default function BooksDisplay({ books, ownership, mode, handleDelete , addBook }) {
  // Search bar
  const [searchContent, setSearchContent] = useState([]);
  // Pagination
  const [pageContent, setPageContent] = useState([]);
  const [page, setPage] = useState(1);

  if(books) {
    return (
      <div id="booksDisplay">
        <div id="booksDisplay-searchBar-wrapper">
          <SearchBar
            items={ books }
            itemProperties={["title", "description", "ownerUsername"]}
            setSearchContent={ setSearchContent }
            setPage={ setPage }/>
        </div>

        <div id="booksDisplay-pagination-wrapper">
          <Pagination
            items={ searchContent }
            itemsPerPage={ 10 }
            page={ page } 
            setPageContent={ setPageContent }
            setPage={ setPage }/>
        </div>

        <ul id="booksDisplay-list">
          {pageContent.map((book, idx) => (
            <li key={ idx }>
              <div className="booksDisplay-list-title">{ book.title }</div>
              <div>Description: { book.description }</div>
              <div>Owner: { book.ownerUsername }</div>
              <div>Date added: { new Date(book.createdAt).toDateString() }</div>
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
      </div>
    );
  }
};