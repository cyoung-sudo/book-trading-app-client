import "./UserSettingsForm.css";
// Redux
import { useSelector } from "react-redux";

export default function UserSettingsForm({ setFullName, setCity, setState, handleSubmit }) {
  // State
  const authUser  = useSelector((state) => state.app.authUser);

  return (
    <form id="userSettingsForm" onSubmit={ handleSubmit }>
      <div className="userSettingsForm-field">
        <label htmlFor="userSettingsForm-fullName">Full Name</label>
        <input
          onChange={ e => setFullName(e.target.value) }
          type="text" 
          id="userSettingsForm-fullName"
          placeholder={ authUser.fullName }/>
      </div>

      <div className="userSettingsForm-field">
        <label htmlFor="userSettingsForm-city">City</label>
        <input
          onChange={ e => setCity(e.target.value) }
          type="text" 
          id="userSettingsForm-city"
          placeholder={ authUser.city }/>
      </div>

      <div className="userSettingsForm-field">
        <label htmlFor="userSettingsForm-state">State</label>
        <input
          onChange={ e => setState(e.target.value) }
          type="text" 
          id="userSettingsForm-state"
          placeholder={ authUser.state }/>
      </div>

      <div className="userSettingsForm-submit">
        <input type="submit" value="Submit"/>
      </div>
    </form>
  );
};