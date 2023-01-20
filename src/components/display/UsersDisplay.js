import "./UsersDisplay";

export default function UsersDisplay({ users }) {
  if(users) {
    return (
      <ul id="usersDisplay">
        {users.map((user, idx) => (
          <li key={idx}>
            <div>{ user.username }</div>
            <div>Joined: { user.createdAt }</div>
          </li>
        ))}
      </ul>
    );
  }
};