import "./Signup.css";
// React
import { useState } from "react";
// Redux
import { useDispatch } from "react-redux";
import { setPopup } from "../popup/slices/popupSlice";
// Routing
import { useNavigate } from "react-router-dom";
// APIs
import * as authAPI from "../../apis/authAPI";
// Components
import AuthForm from "../../components/form/AuthForm";

export default function Signup() {
  // Controlled inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //----- Submit form data
  const handleSubmit = e => {
    // Prevent refresh on submit
    e.preventDefault();

    // Validations
    if(username === "") {
      dispatch(setPopup({
        message: "No username provided",
        type: "error"
      }));
    } else if(password === "") {
      dispatch(setPopup({
        message: "No password provided",
        type: "error"
      }));
    } else {
      authAPI.signup(username, password)
      .then(res => {
        if(res.data.success) {
          dispatch(setPopup({
            message: "Successfully signed-up",
            type: "success"
          }));

          // Redirect to login page
          navigate("/login")
        } else {
          dispatch(setPopup({
            message: res.data.message,
            type: "error"
          }));
        }
      })
      .catch(err => console.log(err));
    }
  };  

  return (
    <div id="signup">
      <div id="signup-header">
        <h1>Signup</h1>
      </div>

      <div id="signup-authForm-wrapper">
        <AuthForm
          setUsername={ setUsername }
          setPassword={ setPassword }
          handleSubmit= { handleSubmit }
          dispatch={ dispatch }/>
      </div>
    </div>
  );
};