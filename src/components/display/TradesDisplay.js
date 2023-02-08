import "./TradesDisplay.css";
// React
import { useState } from "react";
// Routing
import { Link } from "react-router-dom";
// Components
import Pagination from "../pagination/Pagination";
import EmptyList from "../static/EmptyList";
// Icons
import { BsFillArrowRightCircleFill, BsFillArrowDownCircleFill } from "react-icons/bs";

export default function TradesDisplay({ trades, ownership, mode, handleAccept, handleDecline }) {
  // Pagination
  const [pageContent, setPageContent] = useState([]);
  const [page, setPage] = useState(1);

  if(trades) {
    return (
      <div id="tradesDisplay">
        <div id="tradesDisplay-pagination-wrapper">
          <Pagination
            items={ trades }
            itemsPerPage={ 10 }
            page={ page }
            setPageContent={ setPageContent }
            setPage={ setPage }/>
        </div>

        {(pageContent.length > 0) &&
          <ul id="tradesDisplay-list">
            {pageContent.map((trade, idx) => (
              <li 
                data-testid="tradesDisplay-trade"
                className="tradesDisplay-trade" 
                key={ idx }>
                <div className="tradesDisplay-trade-info">
                  <div className="tradesDisplay-trade-group">
                    <div className="tradesDisplay-trade-username">{ trade.initiatorUsername }'s offer</div>
                    <ul className="tradesDisplay-trade-books">
                      {trade.offer.map((book, idx) => (
                        <li key={ idx }>{ book.bookTitle }</li>
                      ))}
                    </ul>
                    <div>
                      <Link to={`/users/${trade.initiatorId}`}>View Profile</Link>
                    </div>
                  </div>

                  <div className="tradesDisplay-trade-group">
                    <span className="tradesDisplay-arrow-left">
                      <BsFillArrowRightCircleFill size={ 28 }/>
                    </span>

                    <span className="tradesDisplay-arrow-down">
                      <BsFillArrowDownCircleFill size={ 28 }/>
                    </span>
                  </div>

                  <div className="tradesDisplay-trade-group">
                    <div className="tradesDisplay-trade-username">{ trade.recipientUsername }</div>
                    <ul className="tradesDisplay-trade-books">
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
                  <div className="tradesDisplay-trade-choice">
                    <button 
                      className="tradesDisplay-trade-accept"
                      onClick={() => handleAccept(trade)}>
                      Accept</button>
                    <button 
                      className="tradesDisplay-trade-decline"
                      onClick={() => handleDecline(trade._id)}>
                      Decline</button>
                  </div>
                }
              </li>
            ))}
          </ul>
        }

        {(pageContent.length <= 0) && <EmptyList itemType="trade"/>}
      </div>
    );
  }
};