import "./UserProfile.css";
// React
import { useState, useEffect } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setPopup } from "../popup/slices/popupSlice";
import { refresh } from "../../appSlice";
// Routing
import { Link, useParams, useNavigate } from "react-router-dom";
// APIs
import * as authAPI from "../../apis/authAPI";
import * as userAPI from "../../apis/userAPI";
import * as bookAPI from "../../apis/bookAPI";
import * as tradeAPI from "../../apis/tradeAPI";
// Components
import BooksDisplay from "../../components/display/BooksDisplay";
import TradesDisplay from "../../components/display/TradesDisplay";
import Loading from "../../components/static/Loading";

export default function UserProfile() {
  // Requested data
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState(null);
  const [requests, setRequests] = useState(null);
  const [offers, setOffers] = useState(null);
  // Profile ownership
  const [ownership, setOwnership] = useState(false);
  // Display mode (books, requests, offers)
  const [mode, setMode] = useState("books");
  // State
  const { authUser, refreshToggle }  = useSelector((state) => state.app);
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  //----- Retrieve user on load
  useEffect(() => {
    // Reset state (loading data)
    setUser(null);
    setBooks(null);
    setRequests(null);
    setOffers(null);

    // Check authentication
    authAPI.getUser()
    .then(res => {
      // Check profile ownership
      if(res.data.success && (id === authUser._id)) {
        setOwnership(true);
      }
      
      // Retrieve given user
      userAPI.getUser(id)
      .then(res => {
        if(res.data.success) {
          setUser(res.data.user);

          // Retrieve all books for user
          return bookAPI.getForUser(id);
        } else {
          return { message: res.data.message };
        }
      })
      .then(res => {
        if(res.message) {
          return { message: res.message };
        } else if(res.data.success) {
          setBooks(res.data.books);

          // Retrieve all trades for initiator
          return tradeAPI.getForInitiator(id);
        }
      })
      .then(res => {
        if(res.message) {
          return { message: res.message };
        } else if(res.data.success) {
          setRequests(res.data.trades);

          // Retrieve all trades for recipient
          return tradeAPI.getForRecipient(id);
        }
      })
      .then(res => {
        if(res.message) {
          // Invalid userId
          dispatch(setPopup({
            message: res.message,
            type: "error"
          }));

          // Redirect to users page
          navigate("/users")
        } else if(res.data.success) {
          setOffers(res.data.trades);
        }
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  }, [refreshToggle]);

  //----- Delete given book
  const handleDelete = id => {
    bookAPI.deleteBook(id)
    .then(res => {
      if(res.data.success) {
        dispatch(setPopup({
          message: "Book deleted",
          type: "success"
        }));

        dispatch(refresh());
      }
    })
    .catch(err => console.log(err));
  };

  //----- Accept trade
  const handleAccept = trade => {
    // Swap request ownership
    let swapRequest = [];
    trade.request.forEach(book => {
      swapRequest.push(bookAPI.updateBook(book.bookId, trade.initiatorUsername, trade.initiatorId));
    });

    // Swap offer ownership
    let swapOffer = [];
    trade.offer.forEach(book => {
      swapOffer.push(bookAPI.updateBook(book.bookId, trade.recipientUsername, trade.recipientId));
    });

    // Delete related trades
    let deleteRelated = [];
    let tradedBooks = [...trade.request, ...trade.offer];
    tradedBooks.forEach(book => {
      deleteRelated.push(tradeAPI.deleteRelated(book.bookId));
    });

    Promise.all([...swapRequest, ...swapOffer, ...deleteRelated])
    .then(() => {
      dispatch(setPopup({
        message: "Trade accepted",
        type: "success"
      }));

      dispatch(refresh());
    })
    .catch(err => console.log(err));
  }; 

  //----- Decline trade
  const handleDecline = tradeId => {
    tradeAPI.deleteTrade(tradeId)
      .then(res => {
        if(res.data.success) {
          dispatch(setPopup({
            message: "Trade declined",
            type: "success"
          }));

          dispatch(refresh());
        }
      })
      .catch(err => console.log(err));
  };

  if(user && books && requests && offers) {
    return (
      <div id="userProfile">
        <div id="userProfile-header">
          <h1>{ user.username }'s Profile</h1>
          <div>Full Name: {user.fullName ? user.fullName : "unknown"}</div>
          <div>City: {user.city ? user.city : "unknown"}</div>
          <div>State: {user.state ? user.state : "unknown"}</div>
        </div>

        {/**Displays for owner when session expires**/}
        {authUser && !ownership && (books.length > 0) &&
          <div id="userProfile-options">
            <Link to={`/trades/request`} state={{ recipientUsername: user.username, recipientId: user._id }}>Trade</Link>
          </div>
        }

        <div id="userProfile-modes">
          <button onClick={() => setMode("books")}>Books</button>
          <button onClick={() => setMode("requests")}>Requests</button>
          <button onClick={() => setMode("offers")}>Offers</button>
        </div>

        {(mode === "books") &&
          <div id="userProfile-booksDisplay-wrapper">
            <BooksDisplay 
              books={ books }
              ownership={ ownership }
              mode="profile"
              handleDelete={ handleDelete }/>
          </div>
        }

        {(mode === "requests") && 
          <div id="userProfile-requestsDisplay-wrapper">
            <TradesDisplay 
              trades={ requests }
              mode="profile"/>
          </div>
        }

        {(mode === "offers") && 
          <div id="userProfile-offersDisplay-wrapper">
            <TradesDisplay 
              trades={ offers }
              ownership={ ownership }
              mode="profile"
              handleAccept={ handleAccept }
              handleDecline={ handleDecline }/>
          </div>
        }
      </div>
    );
  } else {
    return <Loading/>;
  }
};