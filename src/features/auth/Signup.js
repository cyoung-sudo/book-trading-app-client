import "./Signup.css";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setUser, setPass } from "./slices/signupSlice";
// Components
import AuthForm from "../../components/form/AuthForm";

export default function Login(props) {
  // State
  const username = useSelector((state) => state.signup.username);
  const password = useSelector((state) => state.signup.password);
  // Hooks
  const dispatch = useDispatch();

  //----- Submit form data
  const handleSubmit = e => {
    // Prevent refresh on submit
    e.preventDefault();

    console.log(username);
    console.log(password);
  };  

  return (
    <div id="signup">
      <div id="signup-header">
        <h1>Signup</h1>
      </div>

      <div id="signup-authForm-wrapper">
        <AuthForm
          setUser={ setUser }
          setPass={ setPass }
          handleSubmit= { handleSubmit }
          dispatch={ dispatch }/>
      </div>
    </div>
  );
};