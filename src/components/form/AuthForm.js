import "./AuthForm.css";
// Redux
import { useDispatch } from "react-redux";

export default function AuthForm({ setUsername, setPassword, handleSubmit }) {
  // Hooks
  const dispatch = useDispatch();

  return (
    <form id="authForm" onSubmit={ handleSubmit }>
      <div className="authForm-field">
        <label htmlFor="authForm-user">Username</label>
        <input
          onChange={ e => dispatch(setUsername(e.target.value)) }
          type="text" 
          id="authForm-user"
          placeholder="username"/>
      </div>

      <div className="authForm-field">
        <label htmlFor="authForm-pass">Password</label>
        <input
          onChange={ e => dispatch(setPassword(e.target.value)) }
          type="password" 
          id="authForm-pass"
          placeholder="password"/>
      </div>

      <div className="authForm-submit">
        <input type="submit" value="Submit"/>
      </div>
    </form>
  );
};