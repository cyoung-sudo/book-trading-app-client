import "./UsersDisplay.css";
// React
import { useState } from "react";
// Routing
import { Link } from "react-router-dom";
// Components
import Pagination from "../pagination/Pagination";
import EmptyList from "../static/EmptyList";

export default function UsersDisplay({ users }) {
  // Pagination
  const [pageContent, setPageContent] = useState([]);
  const [page, setPage] = useState(1);

  if(users) {
    return (
      <div id="usersDisplay">
        <div id="usersDisplay-pagination-wrapper">
          <Pagination
            items={ users }
            itemsPerPage={ 10 }
            page={ page }
            setPageContent={ setPageContent }
            setPage={ setPage }/>
        </div>

        {(pageContent.length > 0) &&
          <ul id="usersDisplay-list">
            {pageContent.map((user, idx) => (
              <li 
                data-testid="usersDisplay-user"
                key={ idx }>
                <div className="usersDisplay-list-username">{ user.username }</div>
                <div>Joined: { new Date(user.createdAt).toDateString() }</div>
                <div>
                  <Link to={`/users/${user._id}`}>View Profile</Link>
                </div>
              </li>
            ))}
          </ul>
        }

        {(pageContent.length <= 0) && <EmptyList itemType="user"/>}
      </div>
    );
  }
};