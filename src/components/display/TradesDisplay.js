import "./TradesDisplay.css";
// React
import { useState } from "react";
// Routing
import { Link } from "react-router-dom";
// Components
import Pagination from "../pagination/Pagination";

export default function TradesDisplay({ trades, ownership, mode, handleAccept, handleDecline }) {
  // Pagination
  const [pageContent, setPageContent] = useState([]);

  if(trades) {
    return (
      <ul id="tradesDisplay">
        <div id="tradesDisplay-pagination-wrapper">
          <Pagination
            items={ trades }
            itemsPerPage={ 10 }
            setPageContent={ setPageContent }/>
        </div>

        {pageContent.map((trade, idx) => (
          <li className="tradesDisplay-trade" key={ idx }>
            <div className="tradesDisplay-books">
              <div className="tradesDisplay-books-initiator">
                <div>{ trade.initiatorUsername }</div>
                <ul>
                  {trade.offer.map((book, idx) => (
                    <li key={ idx }>{ book.bookTitle }</li>
                  ))}
                </ul>
                <div>
                  <Link to={`/users/${trade.initiatorId}`}>View Profile</Link>
                </div>
              </div>

              <div className="tradesDisplay-books-recipient">
                <div>{ trade.recipientUsername }</div>
                <ul>
                  {trade.request.map((book, idx) => (
                    <li key={ idx }>{ book.bookTitle }</li>
                  ))}
                </ul>
                <div>
                  <Link to={`/users/${trade.recipientId}`}>View Profile</Link>
                </div>
              </div>
            </div>

            {(mode === "profile") && ownership &&
              <div className="tradesDisplay-choice">
                <button onClick={() => handleAccept(trade)}>Accept</button>
                <button onClick={() => handleDecline(trade._id)}>Decline</button>
              </div>
            }
          </li>
        ))}
      </ul>
    );
  }
};