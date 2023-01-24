import "./PendingTradeDisplay.css";
// Icons
import { GrClose } from "react-icons/gr";

export default function PendingTradeDisplay({ books, mode, active, removeBook, handleSubmit }) {
  if(books && (books.length > 0)) {
    return (
      <div id="pendingTradeDisplay">
        <div id="pendingTradeDisplay-header">
          <h3>{(mode === "request") ? "Requests" : "Offers"}</h3>
        </div>

        <ul id="pendingTradeDisplay-books">
          {books.map((book, idx) => (
            <li key={ idx }>
              <div>{ book.bookTitle }</div>
              {active && <button onClick={() => removeBook(book.bookId)}><GrClose/></button>}
            </li>
          ))}
        </ul>

        {active &&
          <div id="pendingTradeDisplay-submit">
            <button onClick={handleSubmit}>
              {(mode === "request") ? "Offer" : "Trade"}
            </button>
          </div>
        }
      </div>
    );
  }
};