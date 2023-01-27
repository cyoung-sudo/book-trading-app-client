import "./Offer.css";
// React
import { useState, useEffect } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setPopup } from "../popup/slices/popupSlice";
// Routing
import { useNavigate, useLocation } from 'react-router-dom';
// APIs
import * as bookAPI from "../../apis/bookAPI";
import * as tradeAPI from "../../apis/tradeAPI";
// Components
import BooksDisplay from "../../components/display/BooksDisplay";
import PendingTradeDisplay from "../../components/display/PendingTradeDisplay";
import Loading from "../../components/static/Loading";

export default function Offer() {
  // Requested data
  const [books, setBooks] = useState(null);
  // Offer array
  const [offers, setOffers] = useState([]);
  // State
  const authUser  = useSelector((state) => state.app.authUser);
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { recipientUsername, recipientId, requests } = state;

  //----- Retrieve user-books on load
  useEffect(() => {
    bookAPI.getForUser(authUser._id)
    .then(res => {
      if(res.data.success) {
        setBooks(res.data.books);
      }
    })
    .catch(err => console.log(err));
  }, []);

  //----- Add offered book
  const addBook = (bookId, bookTitle) => {
    let noDups = true;

    // Check for duplicate
    for(let offer of offers) {
      if(offer.bookId === bookId) {
        noDups = false;
        break;
      }
    }

    if(noDups) {
      let newOffer = {
        bookId,
        bookTitle
      };
  
      setOffers(state => [...state, newOffer]);

      dispatch(setPopup({
        message: "Book offered",
        type: "success"
      }));
    } else {
      dispatch(setPopup({
        message: "Book already offered",
        type: "error"
      }));
    }
  };

  //----- Remove offered book
  const removeBook = bookId => {
    let offersCopy = [...offers];

    offers.forEach((offer, idx) => {
      if(offer.bookId === bookId) {
        offersCopy.splice(idx, 1);
      }
    });

    setOffers(offersCopy);
  };

  //----- Create trade
  const handleSubmit = () => {
    tradeAPI.create(authUser.username, authUser._id, offers, recipientUsername, recipientId, requests)
    .then(res => {
      if(res.data.success) {
        dispatch(setPopup({
          message: "Trade created",
          type: "success"
        }));

        // Redirect to profile page
        navigate(`/users/${authUser._id}`);
      }
    })
    .catch(err => console.log(err));
  };

  if(books) {
    return (
      <div id="offer">
        <div id="offer-header">
          <h1>Trade Offer</h1>
        </div>

        <div id="offer-pendingTradesDisplay-wrapper">
          <div id="offer-requestsDisplay-wrapper">
            <PendingTradeDisplay 
              books={ requests }
              mode="request"
              active={ false }/>
          </div>

          {(offers.length > 0) &&
            <div id="offer-offersDisplay-wrapper">
              <PendingTradeDisplay 
                books={ offers }
                mode="offer"
                active={ true }
                removeBook={ removeBook }
                handleSubmit={ handleSubmit }/>
            </div>
          }
        </div>

        <hr/>
  
        <div id="offer-booksDisplay-wrapper">
          <BooksDisplay 
            books={ books }
            mode="offer"
            addBook={ addBook }/>
        </div>
      </div>
    );
  } else {
    return <Loading/>;
  }
};