import "./AddBook.css";
// React
import { useState } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setPopup } from "../popup/slices/popupSlice";
import { resetUser } from "../../appSlice";
// Routing
import { useNavigate } from "react-router-dom";
// APIs
import * as bookAPI from "../../apis/bookAPI";
import * as authAPI from "../../apis/authAPI";
// Components
import BookForm from "../../components/form/BookForm";

export default function AddBook() {
  // Controlled inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // State
  const authUser = useSelector((state) => state.app.authUser);
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //----- Submit form data
  const handleSubmit = e => {
    // Prevent refresh on submit
    e.preventDefault();

    // Validations
    if(title === "") {
      dispatch(setPopup({
        message: "No title provided",
        type: "error"
      }));
    } else if (description === "") {
      dispatch(setPopup({
        message: "No description provided",
        type: "error"
      }));
    } else {
      // Check authentication
      authAPI.getUser()
      .then(res => {
        if(res.data.success) {
          // Create book
          return bookAPI.create(title, description, authUser.username, authUser._id);
        } else {
          return { message: "Session has expired" };
        }
      })
      .then(res => {
        if(res.message) {
          dispatch(setPopup({
            message: res.message,
            type: "error"
          }));

          dispatch(resetUser());

          // Redirect to home page
          navigate("/");
        } else if(res.data.success) {
          dispatch(setPopup({
            message: "Book created",
            type: "success"
          }));

          // Redirect to profile page
          navigate(`/users/${authUser._id}`);
        }
      })
      .catch(err => console.log(err));
    }
  };

  return (
    <div id="addBook">
      <div id="addBook-header">
        <h1>New Book</h1>
      </div>

      <div id="addBook-form-wrapper">
        <BookForm
          setTitle={ setTitle }
          setDescription={ setDescription }
          handleSubmit={ handleSubmit }/>
      </div>
    </div>
  );
};