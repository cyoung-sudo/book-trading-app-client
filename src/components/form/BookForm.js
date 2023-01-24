import "./BookForm.css";

export default function BookForm({ setTitle, setDescription, handleSubmit }) {  
  return (
    <form id="bookForm" onSubmit={ handleSubmit }>
      <div className="bookForm-field">
        <label htmlFor="bookForm-title">Title</label>
        <input
          onChange={e => setTitle(e.target.value)}
          type="text" 
          id="bookForm-title"
          placeholder="title"/>
      </div>

      <div className="bookForm-field">
        <label htmlFor="bookForm-description">Description</label>
        <input
          onChange={e => setDescription(e.target.value)}
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