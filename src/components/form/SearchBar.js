import "./SearchBar.css";
// React
import { useState, useEffect } from "react";

export default function SearchBar({ items, itemProperties, setSearchContent }) {
  // Controlled input
  const [term, setTerm] = useState("");
  // Property
  const [currentProperty, setCurrentProperty] = useState("");

  //----- Setup on load
  useEffect(() => {
    // Return all items
    setSearchContent(items);
    // Set initial property
    setCurrentProperty(itemProperties[0]);
  }, []);

  //----- Filter items with given term
  const handleSubmit = e => {
    // Prevent refresh on submit
    e.preventDefault();

    let results = [];
    items.forEach(item => {
      if(item[currentProperty].includes(term)) {
        results.push(item);
      }
    });
    
    setSearchContent(results);
  };

  return (
    <div className="searchBar">
      {(itemProperties.length > 1) &&
        <ul className="searchBar-properties">
          {itemProperties.map((property, idx) => (
            <li key={ idx }>
              <button
                className={(currentProperty === property ? "searchBar-active" : undefined)}
                onClick={() => setCurrentProperty(property)}>
                { property }
              </button>
            </li>
          ))}
        </ul>
      }

      <form className="searchBar-form" onSubmit={ handleSubmit }>
        <div className="searchBar-field">
          <input
            onChange={e => setTerm(e.target.value)}
            type="text" 
            placeholder={ currentProperty }/>
        </div>

        <div className="searchBar-submit">
          <input type="submit" value="Submit"/>
        </div>
      </form>
    </div>
  );
};  