import "./PendingTradeDisplay.css";
// Icons
import { GrClose } from "react-icons/gr";

export default function PendingTradeDisplay({ books, mode, active, removeBook, handleSubmit }) {
  if(books && (books.length > 0)) {
    return (
      <div className="pendingTradeDisplay">
        <div className="pendingTradeDisplay-header">
          <h3>{(mode === "request") ? "Requests" : "Offers"}</h3>
        </div>

        <ul className="pendingTradeDisplay-books">
          {books.map((book, idx) => (
            <li 
              data-testid="pendingTradeDisplay-book"
              key={ idx }>
              <div>{ book.bookTitle }</div>
              {active && 
                <button
                  data-testid="pendingTradeDisplay-remove"
                  onClick={() => removeBook(book.bookId)}>
                  <GrClose/>
                </button>}
            </li>
          ))}
        </ul>

        {active &&
          <div className="pendingTradeDisplay-submit">
            <button onClick={ handleSubmit }>
              {(mode === "request") ? "Offer" : "Trade"}
            </button>
          </div>
        }
      </div>
    );
  }
};