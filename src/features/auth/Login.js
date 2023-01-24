import "./Login.css";
// React
import { useState } from "react";
// Redux
import { useDispatch } from "react-redux";
import { setPopup } from "../popup/slices/popupSlice";
import { setUser } from "../../appSlice";
// Routing
import { useNavigate } from "react-router-dom";
// APIs
import * as authAPI from "../../apis/authAPI";
// Components
import AuthForm from "../../components/form/AuthForm";

export default function Login() {
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
      authAPI.login(username, password)
      .then(res => {
        if(res.data.success) {
          dispatch(setPopup({
            message: "Successfully logged-in",
            type: "success"
          }));

          dispatch(setUser(res.data.user));

          // Redirect to profile page
          navigate(`/users/${res.data.user._id}`);
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
    <div id="login">
      <div id="login-header">
        <h1>Login</h1>
      </div>

      <div id="login-authForm-wrapper">
        <AuthForm
          setUsername={ setUsername }
          setPassword={ setPassword }
          handleSubmit= { handleSubmit }
          dispatch={ dispatch }/>
      </div>
    </div>
  );
};