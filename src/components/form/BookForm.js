import "./BookForm.css";
// Redux
import { useDispatch } from "react-redux";

export default function BookForm({ setTitle, setDescription, handleSubmit }) {
  // Hooks
  const dispatch = useDispatch();
  
  return (
    <form id="bookForm" onSubmit={ handleSubmit }>
      <div className="bookForm-field">
        <label htmlFor="bookForm-title">Title</label>
        <input
          onChange={ e => dispatch(setTitle(e.target.value)) }
          type="text" 
          id="bookForm-title"
          placeholder="title"/>
      </div>

      <div className="bookForm-field">
        <label htmlFor="bookForm-description">Description</label>
        <input
          onChange={ e => dispatch(setDescription(e.target.value)) }
          type="text" 
          id="bookForm-description"
          placeholder="description"/>
      </div>

      <div className="bookForm-submit">
        <input type="submit" value="Submit"/>
      </div>
    </form>
  );
};