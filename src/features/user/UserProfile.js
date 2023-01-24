import "./UserProfile.css";
// React
import { useState, useEffect } from "react";
// Redux
import { useDispatch } from "react-redux";
import { setPopup } from "../popup/slices/popupSlice";
// Routing
import { useParams, useNavigate } from "react-router-dom";
// APIs
import * as userAPI from "../../apis/userAPI";
import * as bookAPI from "../../apis/bookAPI";
// Components
import BooksDisplay from "../../components/display/BooksDisplay";
import Loading from "../../components/static/Loading";

export default function UserProfile() {
  // Requested data
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState(null);
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  //----- Retrieve user on load
  useEffect(() => {
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
        // Invalid userId
        dispatch(setPopup({
          message: res.message,
          type: "error"
        }));

        // Redirect to users page
        navigate("/users")
      } else if(res.data.success) {
        setBooks(res.data.books);
      }
    })
    .catch(err => console.log(err));
  }, []);

  if(user && books) {
    return (
      <div id="userProfile">
        <div id="userProfile-header">
          <h1>{user.username}'s Profile</h1>
          <div>Full Name: {user.fullName ? user.fullName : "unknown"}</div>
          <div>City: {user.city ? user.city : "unknown"}</div>
          <div>State: {user.state ? user.state : "unknown"}</div>
        </div>

        <div id="userProfile-booksDisplay-wrapper">
          <BooksDisplay books={ books }/>
        </div>
      </div>
    );
  } else {
    return <Loading/>;
  }
};