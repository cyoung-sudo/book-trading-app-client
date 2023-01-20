import "./UsersDisplay";
// Routing
import { Link } from "react-router-dom";

export default function UsersDisplay({ users }) {
  if(users) {
    return (
      <ul id="usersDisplay">
        {users.map((user, idx) => (
          <li key={idx}>
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