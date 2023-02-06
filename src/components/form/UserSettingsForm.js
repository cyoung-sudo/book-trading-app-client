import "./UserSettingsForm.css";

export default function UserSettingsForm({ setFullName, setCity, setState, handleSubmit }) {
  return (
    <form id="userSettingsForm" onSubmit={ handleSubmit }>
      <div className="userSettingsForm-field">
        <label htmlFor="userSettingsForm-fullName">Full Name</label>
        <input
          data-testid="userSettingsForm-fullName"
          onChange={e => setFullName(e.target.value)}
          type="text" 
          id="userSettingsForm-fullName"
          placeholder="full name"/>
      </div>

      <div className="userSettingsForm-field">
        <label htmlFor="userSettingsForm-city">City</label>
        <input
          data-testid="userSettingsForm-city"
          onChange={e => setCity(e.target.value)}
          type="text" 
          id="userSettingsForm-city"
          placeholder="city"/>
      </div>

      <div className="userSettingsForm-field">
        <label htmlFor="userSettingsForm-state">State</label>
        <input
          data-testid="userSettingsForm-state"
          onChange={e => setState(e.target.value)}
          type="text" 
          id="userSettingsForm-state"
          placeholder="state"/>
      </div>

      <div className="userSettingsForm-submit">
        <input type="submit" value="Submit"/>
      </div>
    </form>
  );
};