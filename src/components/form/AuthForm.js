import "./AuthForm.css";

export default function AuthForm({ setUser, setPass, handleSubmit, dispatch }) {
  return (
    <form id="authForm" onSubmit={ handleSubmit }>
      <div className="authForm-field">
        <label htmlFor="authForm-user">Username</label>
        <input
          onChange={ e => dispatch(setUser(e.target.value)) }
          type="text" 
          id="authForm-user"
          placeholder="username"/>
      </div>

      <div className="authForm-field">
        <label htmlFor="authForm-pass">Password</label>
        <input
          onChange={ e => dispatch(setPass(e.target.value)) }
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