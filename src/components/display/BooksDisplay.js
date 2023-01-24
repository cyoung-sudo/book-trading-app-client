import "./BooksDisplay.css";

// Routing
import { Link } from "react-router-dom";

export default function BooksDisplay({ books, ownership, handleDelete }) {
  if(books) {
    return (
      <ul id="booksDisplay">
        {books.map((book, idx) => (
          <li key={idx}>
            <div>{ book.title }</div>
            <div>Description: { book.description }</div>
            <div>Owner: { book.ownerUsername }</div>
            <div>Date added: { book.createdAt }</div>
            <div>
              <Link to={`/users/${book.ownerId}`}>View Owner Profile</Link>
              {(ownership === true) && 
                <button onClick={() => handleDelete(book._id)}>Delete</button>
              }
            </div>
          </li>
        ))}
      </ul>
    );
  }
};