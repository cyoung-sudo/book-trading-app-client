import "./Request.css";
// React
import { useState, useEffect } from "react";
// Redux
import { useDispatch } from "react-redux";
import { setPopup } from "../popup/slices/popupSlice";
// Routing
import { useNavigate, useLocation } from "react-router-dom";
// APIs
import * as bookAPI from "../../apis/bookAPI";
// Components
import BooksDisplay from "../../components/display/BooksDisplay";
import PendingTradeDisplay from "../../components/display/PendingTradeDisplay";
import Loading from "../../components/static/Loading";

export default function Request() {
  // Requested data
  const [books, setBooks] = useState(null);
  // Request array
  const [requests, setRequests] = useState([]);
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { recipientUsername, recipientId } = state;
  
  //----- Retrieve user-books on load
  useEffect(() => {
    bookAPI.getForUser(recipientId)
    .then(res => {
      if(res.data.success) {
        setBooks(res.data.books);
      }
    })
    .catch(err => console.log(err));
  }, []);

  //----- Add requested book
  const addBook = (bookId, bookTitle) => {
    let noDups = true;

    // Check for duplicate
    for(let request of requests) {
      if(request.bookId === bookId) {
        noDups = false;
        break;
      }
    }

    if(noDups) {
      let newRequest = {
        bookId,
        bookTitle
      };
  
      setRequests(state => [...state, newRequest]);

      dispatch(setPopup({
        message: "Book requested",
        type: "success"
      }));
    } else {
      dispatch(setPopup({
        message: "Book already requested",
        type: "error"
      }));
    }
  };

  //----- Remove requested book
  const removeBook = bookId => {
    let requestsCopy = [...requests];

    requests.forEach((request, idx) => {
      if(request.bookId === bookId) {
        requestsCopy.splice(idx, 1);
      }
    });

    setRequests(requestsCopy);
  };

  //----- Start offer
  const handleSubmit = () => {
    // Redirect to offers page
    navigate("/trades/offer", { state: { recipientUsername, recipientId, requests } });
  };

  if(books) {
    return (
      <div id="request">
        <div id="request-header">
          <h1>Trade Request</h1>
        </div>
  
        {(requests.length > 0) &&
          <div id="request-requestsDisplay-wrapper">
            <PendingTradeDisplay 
              books={ requests }
              mode="request"
              active={ true }
              removeBook={ removeBook }
              handleSubmit={ handleSubmit }/>
          </div>
        }

        {(requests.length > 0) && <hr/>}
  
        <div id="request-booksDisplay-wrapper">
          <BooksDisplay 
            books={ books }
            mode="request"
            addBook={ addBook }/>
        </div>
      </div>
    );
  } else {
    return <Loading/>;
  }
};