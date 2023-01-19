import "./Login.css";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setUser, setPass } from "./slices/loginSlice";
import { setPopup } from "../popup/slices/popupSlice";
// Components
import AuthForm from "../../components/form/AuthForm";

export default function Login() {
  // State
  const username = useSelector((state) => state.login.username);
  const password = useSelector((state) => state.login.password);
  // Hooks
  const dispatch = useDispatch();

  //----- Submit form data
  const handleSubmit = e => {
    // Prevent refresh on submit
    e.preventDefault();

    console.log(username);
    console.log(password);

    if(username === "") {
      dispatch(setPopup({
        message: "No username provided",
        type: "error"
      }));
    } else {
      dispatch(setPopup({
        message: "Successfully logged-in",
        type: "success"
      }));
    }
  };  

  return (
    <div id="login">
      <div id="login-header">
        <h1>Login</h1>
      </div>

      <div id="login-authForm-wrapper">
        <AuthForm
          setUser={ setUser }
          setPass={ setPass }
          handleSubmit= { handleSubmit }
          dispatch={ dispatch }/>
      </div>
    </div>
  );
};