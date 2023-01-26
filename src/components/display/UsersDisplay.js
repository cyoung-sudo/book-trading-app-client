import "./UsersDisplay.css";
// React
import { useState } from "react";
// Routing
import { Link } from "react-router-dom";
// Components
import Pagination from "../pagination/Pagination";

export default function UsersDisplay({ users }) {
  // Pagination
  const [pageContent, setPageContent] = useState([]);

  if(users) {
    return (
      <ul id="usersDisplay">
        <div id="usersDisplay-pagination-wrapper">
          <Pagination
            items={ users }
            itemsPerPage={ 10 }
            setPageContent={ setPageContent }/>
        </div>

        {pageContent.map((user, idx) => (
          <li key={ idx }>
            <div>{ user.username }</div>
            <div>Joined: { user.createdAt }</div>
            <div>
              <Link to={`/users/${user._id}`}>View Profile</Link>
            </div>
          </li>
        ))}
      </ul>
    );
  }
};