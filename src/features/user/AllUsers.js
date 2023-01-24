import "./AllUsers.css";
// React
import { useState, useEffect } from "react";
// APIs
import * as userAPI from "../../apis/userAPI";
// Components
import UsersDisplay from "../../components/display/UsersDisplay";
import Loading from "../../components/static/Loading";

export default function AllUsers() {
  // Requested data
  const [users, setUsers] = useState(null)

  //----- Retrieve users on load
  useEffect(() => {
    userAPI.getAll()
    .then(res => {
      if(res.data.success) {
        setUsers(res.data.users);
      }
    })
    .catch(err => console.log(err));
  }, []);

  if(users) {
    return (
      <div id="allUsers">
        <div id="allUsers-header">
          <h1>Users</h1>
        </div>
  
        <div id="allUsers-usersDisplay-wrapper">
          <UsersDisplay users={ users }/>
        </div>
      </div>
    );
  } else {
    return <Loading/>;
  }
};