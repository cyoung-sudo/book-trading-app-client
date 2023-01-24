import "./BooksDisplay.css";

// Routing
import { Link } from "react-router-dom";

export default function BooksDisplay({ books, ownership, mode, handleDelete , addBook}) {
  if(books) {
    return (
      <ul id="booksDisplay">
        {books.map((book, idx) => (
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